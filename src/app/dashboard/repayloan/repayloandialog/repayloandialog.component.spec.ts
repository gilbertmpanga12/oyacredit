import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepayloandialogComponent } from './repayloandialog.component';

describe('RepayloandialogComponent', () => {
  let component: RepayloandialogComponent;
  let fixture: ComponentFixture<RepayloandialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepayloandialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepayloandialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
