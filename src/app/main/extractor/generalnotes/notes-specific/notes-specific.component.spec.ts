import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSpecificComponent } from './notes-specific.component';

describe('NotesSpecificComponent', () => {
  let component: NotesSpecificComponent;
  let fixture: ComponentFixture<NotesSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
