import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManualrepaymentComponent } from './manualrepayment.component';

describe('ManualrepaymentComponent', () => {
  let component: ManualrepaymentComponent;
  let fixture: ComponentFixture<ManualrepaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualrepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualrepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
