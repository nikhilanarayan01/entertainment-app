import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
})
export class ThemeComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit() {}

  toggleTheme() {
    this.themeService.toggleDark();
  }
}
