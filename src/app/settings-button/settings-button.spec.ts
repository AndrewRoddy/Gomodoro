import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsButton } from './settings-button';

describe('SettingsButton', () => {
  let component: SettingsButton;
  let fixture: ComponentFixture<SettingsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
