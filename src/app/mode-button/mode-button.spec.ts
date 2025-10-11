import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeButton } from './mode-button';

describe('ModeButton', () => {
  let component: ModeButton;
  let fixture: ComponentFixture<ModeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
