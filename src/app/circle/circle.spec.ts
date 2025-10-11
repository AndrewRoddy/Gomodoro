import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Circle } from './circle';

describe('Circle', () => {
  let component: Circle;
  let fixture: ComponentFixture<Circle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Circle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Circle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
