import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiledataComponent } from './mobiledata.component';

describe('MobiledataComponent', () => {
  let component: MobiledataComponent;
  let fixture: ComponentFixture<MobiledataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobiledataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobiledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
