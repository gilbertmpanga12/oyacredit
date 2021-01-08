import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingdialogComponent } from './loadingdialog.component';

describe('LoadingdialogComponent', () => {
  let component: LoadingdialogComponent;
  let fixture: ComponentFixture<LoadingdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
