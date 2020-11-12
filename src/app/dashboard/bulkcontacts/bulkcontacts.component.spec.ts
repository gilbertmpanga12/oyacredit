import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulkcontactsComponent } from './bulkcontacts.component';

describe('BulkcontactsComponent', () => {
  let component: BulkcontactsComponent;
  let fixture: ComponentFixture<BulkcontactsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkcontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
