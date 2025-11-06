import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'midnight';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'gomodoro-theme';
  
  // Signal to track current theme
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Effect to apply theme changes to the document
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme);
      this.saveTheme(currentTheme);
    });
  }

  private getInitialTheme(): Theme {
    // Try to get saved theme from localStorage
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    if (savedTheme && this.isValidTheme(savedTheme)) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  private isValidTheme(theme: string): theme is Theme {
    return ['light', 'dark', 'midnight'].includes(theme);
  }

  private applyTheme(theme: Theme): void {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-midnight');
    // Add the current theme class
    document.documentElement.classList.add(`theme-${theme}`);
  }

  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
