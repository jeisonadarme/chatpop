import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigupFormComponent } from './sigup-form.component';

describe('SigupFormComponent', () => {
  let component: SigupFormComponent;
  let fixture: ComponentFixture<SigupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
