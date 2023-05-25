import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFillButtonComponent } from './auto-fill-button.component';

describe('AutoFillButtonComponent', () => {
  let component: AutoFillButtonComponent;
  let fixture: ComponentFixture<AutoFillButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFillButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoFillButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
