import { effect, Injectable, signal } from '@angular/core';
import { TTheme } from '../../models/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<TTheme>('system');
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.initTheme();

    this.mediaQuery.addEventListener('change', () => {
      if (this.theme() === 'system') {
        this.applySystemTheme();
      }
    });

    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('theme', currentTheme);
      this.applyTheme(currentTheme);
    });
  }

  initTheme() {
    const savedTheme = (localStorage.getItem('theme') as TTheme) || 'system';
    this.theme.set(savedTheme);
  }

  private applySystemTheme() {
    const isDark = this.mediaQuery.matches;
    document.body.classList.toggle('dark-theme', isDark);
  }

  private applyTheme(theme: TTheme) {
    if (theme === 'system') {
      this.applySystemTheme();
      return;
    }
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }

  setTheme(theme: TTheme) {
    this.theme.set(theme);
  }
}
