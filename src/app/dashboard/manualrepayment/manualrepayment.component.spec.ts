import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualrepaymentComponent } from './manualrepayment.component';

describe('ManualrepaymentComponent', () => {
  let component: ManualrepaymentComponent;
  let fixture: ComponentFixture<ManualrepaymentComponent>;

  beforeEach(async(() => {
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
