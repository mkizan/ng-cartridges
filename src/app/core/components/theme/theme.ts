import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme/theme-service';
import { TTheme } from '../../models/theme';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.html',
  styleUrl: './theme.css',
})
export class Theme {
  themeService = inject(ThemeService);

  changeTheme(theme: TTheme) {
    this.themeService.setTheme(theme);
  }
}
