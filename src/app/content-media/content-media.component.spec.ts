import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMediaComponent } from './content-media.component';

describe('ContentMediaComponent', () => {
  let component: ContentMediaComponent;
  let fixture: ComponentFixture<ContentMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
