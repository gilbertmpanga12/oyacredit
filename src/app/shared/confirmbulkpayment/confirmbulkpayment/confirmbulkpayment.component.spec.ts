import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmbulkpaymentComponent } from './confirmbulkpayment.component';

describe('ConfirmbulkpaymentComponent', () => {
  let component: ConfirmbulkpaymentComponent;
  let fixture: ComponentFixture<ConfirmbulkpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmbulkpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmbulkpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
