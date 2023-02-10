import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesDialogComponent } from './rates-dialog.component';

describe('RatesDialogComponent', () => {
  let component: RatesDialogComponent;
  let fixture: ComponentFixture<RatesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
