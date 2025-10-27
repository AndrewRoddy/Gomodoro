import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaviconManager } from './favicon-manager';

describe('FaviconManager', () => {
  let component: FaviconManager;
  let fixture: ComponentFixture<FaviconManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaviconManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaviconManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
