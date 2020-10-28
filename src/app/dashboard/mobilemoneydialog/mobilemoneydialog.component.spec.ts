import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilemoneydialogComponent } from './mobilemoneydialog.component';

describe('MobilemoneydialogComponent', () => {
  let component: MobilemoneydialogComponent;
  let fixture: ComponentFixture<MobilemoneydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilemoneydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilemoneydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
