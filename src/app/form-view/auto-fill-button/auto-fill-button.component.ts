import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-auto-fill-button',
  templateUrl: './auto-fill-button.component.html',
  styleUrls: ['./auto-fill-button.component.scss']
})
export class AutoFillButtonComponent {
  public isAutoFilled = false;
  @Input()
  public form!: FormGroup;

  public autoFillForm(): void {
    this.form.patchValue({
      companyName: 'Bconnect Live Chat',
      telephoneNumber: '0612345678',
      employees: '21-50',
      cocNumber: '55468659',
      vatNumber: 'NL851726653B01',
      ibanNumber: 'NL75INGB0652770355',
      budget: '500',
      description: 'A good description'
    });

    this.isAutoFilled = true;
  }

  public clearForm(): void {
    this.form.reset();
    this.isAutoFilled = false;
  }

  public toggleAutoFill(): void {
    if (this.isAutoFilled) {
      this.clearForm();
    } else {
      this.autoFillForm();
    }
  }
}
