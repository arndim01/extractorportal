import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartToolComponent } from './start-tool.component';

describe('StartToolComponent', () => {
  let component: StartToolComponent;
  let fixture: ComponentFixture<StartToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
