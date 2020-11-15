import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoneyDialogComponent } from './load-money-dialog.component';

describe('LoadMoneyDialogComponent', () => {
  let component: LoadMoneyDialogComponent;
  let fixture: ComponentFixture<LoadMoneyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadMoneyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoneyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
