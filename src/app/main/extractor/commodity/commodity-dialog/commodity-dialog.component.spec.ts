import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityDialogComponent } from './commodity-dialog.component';

describe('CommodityDialogComponent', () => {
  let component: CommodityDialogComponent;
  let fixture: ComponentFixture<CommodityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
