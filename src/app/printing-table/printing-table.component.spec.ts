import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingTableComponent } from './printing-table.component';

describe('PrintingTableComponent', () => {
  let component: PrintingTableComponent;
  let fixture: ComponentFixture<PrintingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
