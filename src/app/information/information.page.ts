import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  imdbID: string | null;
  item: any;

  constructor(private activatedRoute: ActivatedRoute) {
    this.imdbID = null;
  }

  ngOnInit() {
    this.imdbID = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.imdbID) {
      this.fetchDetails();
    }
  }

  fetchDetails() {
    axios
      .get(`http://www.omdbapi.com/?i=${this.imdbID}&apikey=90b41d0f`)
      .then((response) => {
        this.item = response.data;
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
      });
  }
}
