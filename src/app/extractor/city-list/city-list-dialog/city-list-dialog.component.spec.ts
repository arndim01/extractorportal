import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListDialogComponent } from './city-list-dialog.component';

describe('CityListDialogComponent', () => {
  let component: CityListDialogComponent;
  let fixture: ComponentFixture<CityListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
