import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggleDark() {
    this.darkMode.next(!this.darkMode.value);
    document.body.classList.toggle('dark');
  }

  isDark() {
    return this.darkMode.asObservable();
  }
}
