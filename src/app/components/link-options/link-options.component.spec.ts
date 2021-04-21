import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkOptionsComponent } from './link-options.component';

describe('LinkOptionsComponent', () => {
  let component: LinkOptionsComponent;
  let fixture: ComponentFixture<LinkOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkOptionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
