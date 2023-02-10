import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesSpecialDialogComponent } from './rates-special-dialog.component';

describe('RatesSpecialDialogComponent', () => {
  let component: RatesSpecialDialogComponent;
  let fixture: ComponentFixture<RatesSpecialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesSpecialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesSpecialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
