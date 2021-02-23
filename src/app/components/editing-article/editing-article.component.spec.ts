import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingArticleComponent } from './editing-article.component';

describe('EditingArticleComponent', () => {
  let component: EditingArticleComponent;
  let fixture: ComponentFixture<EditingArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditingArticleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
