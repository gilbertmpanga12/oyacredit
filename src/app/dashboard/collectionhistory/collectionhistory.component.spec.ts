import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionhistoryComponent } from './collectionhistory.component';

describe('CollectionhistoryComponent', () => {
  let component: CollectionhistoryComponent;
  let fixture: ComponentFixture<CollectionhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
