import { Component, OnInit, ViewChild, AfterViewInit,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IonContent } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit, AfterViewInit {
  moviesAndSeries: any[] = [];
  filteredMovies: any[] = [];
  filteredSeries: any[] = [];
  selectedSegment: string = 'all';
  searchQuery: string = '';
  sortOption: string = 'year';
  isDarkTheme: boolean = false;

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  constructor(
    public themeService: ThemeService,
    private router: Router,  private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.scrollToTop(); // Scroll to top after view initialization
  }

  fetchData() {
    axios
      .get('http://www.omdbapi.com/?s=avengers&apikey=90b41d0f')
      .then((moviesResponse) => {
        this.moviesAndSeries = this.moviesAndSeries.concat(moviesResponse.data.Search || []);
        return axios.get('http://www.omdbapi.com/?s=game%20of%20thrones&apikey=90b41d0f');
      })
      .then((seriesResponse) => {
        this.moviesAndSeries = this.moviesAndSeries.concat(seriesResponse.data.Search || []);
        this.filterItems();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  filterItems() {
    if (this.selectedSegment === 'all') {
      this.filteredMovies = this.moviesAndSeries.filter((item) =>
        item.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.filteredSeries = this.filteredMovies.filter((item) => item.Type === 'series');
    } else if (this.selectedSegment === 'movies') {
      this.filteredMovies = this.moviesAndSeries.filter(
        (item) =>
          item.Type === 'movie' &&
          item.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.filteredSeries = [];
    } else if (this.selectedSegment === 'series') {
      this.filteredMovies = [];
      this.filteredSeries = this.moviesAndSeries.filter(
        (item) =>
          item.Type === 'series' &&
          item.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.sortItems();
  }

  sortItems() {
    if (this.sortOption === 'year') {
      this.filteredMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      this.filteredSeries.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    } else if (this.sortOption === 'title') {
      this.filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      this.filteredSeries.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (this.sortOption === 'rating') {
      this.filteredMovies.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
      this.filteredSeries.sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));
    }
  }

  viewDetails(item: any) {
    this.router.navigate(['/information', item.imdbID]);
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme();

    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
