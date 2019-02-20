import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVewQuestionComponent } from './main-vew-question.component';

describe('MainVewQuestionComponent', () => {
  let component: MainVewQuestionComponent;
  let fixture: ComponentFixture<MainVewQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainVewQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainVewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
