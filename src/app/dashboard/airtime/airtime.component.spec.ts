import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AirtimeComponent } from './airtime.component';

describe('AirtimeComponent', () => {
  let component: AirtimeComponent;
  let fixture: ComponentFixture<AirtimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AirtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
