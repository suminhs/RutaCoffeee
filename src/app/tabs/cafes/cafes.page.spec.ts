import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CafesPage } from './cafes.page';

describe('CafesPage', () => {
  let component: CafesPage;
  let fixture: ComponentFixture<CafesPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(CafesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
