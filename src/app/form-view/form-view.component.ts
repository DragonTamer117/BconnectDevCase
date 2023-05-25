import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AutoFillButtonComponent } from "./auto-fill-button/auto-fill-button.component";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {
  public form!: FormGroup;
  public isCocNumberValid = false;
  public isVatNumberValid = false;
  @ViewChild(AutoFillButtonComponent)
  autoFillButtonComponent!: AutoFillButtonComponent;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {  }

  ngOnInit(): void {
    this.form = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      telephoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      employees: new FormControl('', [Validators.required]),
      cocNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
      vatNumber: new FormControl('', [Validators.required]),
      ibanNumber: new FormControl('', [Validators.pattern('[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}')]),
      budget: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    });
  }

  public submitForm(): void {
    this.validateCocNumber(this.form.controls['cocNumber'].value);
    this.validateVatNumber(this.form.controls['vatNumber'].value);

    if (this.form.valid && (this.isVatNumberValid && this.isCocNumberValid)) {
      this.toastr.success('Form is applied and saved!', 'Succes');
      this.autoFillButtonComponent.isAutoFilled = false;
      this.form.reset();

      this.isCocNumberValid = false;
      this.isVatNumberValid = false;
    } else {
      this.toastr.error(
        'Something went wrong, are you sure everything is as it supposed to be?',
        'Form is incorrect'
      )
    }
  }

  public validateCocNumber(cocNumber: string): void {
    const apiUrl = `${ environment.kvkUrl }${ cocNumber }`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'ovio-api-key': environment.OPENKVK_OVERHEID_API_KEY
    });

    this.http.get(apiUrl, { headers }).subscribe(
      (response: any) => {

        const found = response.some((item: any) => {
          if (cocNumber == item['kvknummer']) {
            this.isCocNumberValid = cocNumber == item['kvknummer'];
            // console.log(this.isCocNumberValid);

            this.toastr.info("Coc number is found!", 'Validity of Coc number');
            return this.isCocNumberValid;
          }
          return;
        });

        if (!found) {
          this.toastr.error("Coc number is not found!", 'Validity of Coc number');
          this.isCocNumberValid = false;
        }
    });
  }

  public validateVatNumber(vatNumber: string): void {
    const apiUrl = `${ environment.btwUrl }${ vatNumber }.json`

    this.http.get(apiUrl).subscribe((response: any) => {
      this.isVatNumberValid = response.valid;

      this.isVatNumberValid ? this.toastr.info('Valid VAT number', 'Validity of VAT') :
        this.toastr.error('Invalid VAT number', 'Validity of VAT');
    });
  }
}
