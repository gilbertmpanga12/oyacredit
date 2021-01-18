import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkcontactsfailedComponent } from './bulkcontactsfailed.component';

describe('BulkcontactsfailedComponent', () => {
  let component: BulkcontactsfailedComponent;
  let fixture: ComponentFixture<BulkcontactsfailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkcontactsfailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkcontactsfailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
