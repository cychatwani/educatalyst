import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubtQnaComponent } from './doubt-qna.component';

describe('DoubtQnaComponent', () => {
  let component: DoubtQnaComponent;
  let fixture: ComponentFixture<DoubtQnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubtQnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubtQnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
