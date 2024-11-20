import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaqrPage } from './paginaqr.page';

describe('PaginaqrPage', () => {
  let component: PaginaqrPage;
  let fixture: ComponentFixture<PaginaqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
