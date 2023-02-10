import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbsComponent } from './arbs.component';

describe('ArbsComponent', () => {
  let component: ArbsComponent;
  let fixture: ComponentFixture<ArbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
