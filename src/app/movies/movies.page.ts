import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  moviesAndSeries: any[] = [];
  filteredMovies: any[] = [];
  filteredSeries: any[] = [];
  selectedSegment: string = 'all';
  searchQuery: string = '';
  sortOption: string = 'year';
  darkMode = false;

  isDarkTheme: boolean = false;

  constructor(private router: Router,  private modalCtrl: ModalController) {}

  ngOnInit() {
    this.fetchData();
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
 // toggleTheme(event: any) {
   // const isChecked = event.detail.checked;
  //  this.themeService.setTheme(isChecked ? 'dark' : 'light');
 // }
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
}
