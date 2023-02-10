import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbsDialogComponent } from './arbs-dialog.component';

describe('ArbsDialogComponent', () => {
  let component: ArbsDialogComponent;
  let fixture: ComponentFixture<ArbsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
