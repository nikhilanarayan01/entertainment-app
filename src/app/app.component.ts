

import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      const bodyElement = document.getElementsByTagName('body')[0];
      bodyElement.classList.toggle('dark-theme', isDark);
    });
  }
}
