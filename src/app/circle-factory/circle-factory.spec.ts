import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleFactory } from './circle-factory';

describe('CircleFactory', () => {
  let component: CircleFactory;
  let fixture: ComponentFixture<CircleFactory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleFactory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleFactory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
