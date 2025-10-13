import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseButton } from './pause-button';

describe('PauseButton', () => {
  let component: PauseButton;
  let fixture: ComponentFixture<PauseButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PauseButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
