import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  toggleDark() {
    throw new Error('Method not implemented.');
  }
  private currentTheme: string = '';

  constructor() {}

  setTheme(theme: string) {
    // Remove the previous theme class if it exists
    if (this.currentTheme) {
      document.body.classList.remove(this.currentTheme);
    }

    // Add the new theme class
    if (theme) {
      document.body.classList.add(theme);
    }

    this.currentTheme = theme;
  }
}
