import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // false is category, true is search
  typeList: boolean = false;

  // Categories
  categoryLabels = ["Popular", "Top Rated", "Now Playing", "Upcoming"];
  categoryRoutes = ["popular", "top_rated", "now_playing", "upcoming"];
  currentCategory = this.categoryRoutes[0];

  // search
  currentSearch = "";

  // Movie list
  movies: Movie[] = [];
  basePosterPath = "http://image.tmdb.org/t/p/w342";

  // pagination
  currentPage = 1;
  maxPages = 0;

  constructor(private auth: AuthenticationService, private api: MoviesApiService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    if (!this.typeList) {
      this.api.fetchMoviesByCategory(this.currentPage, this.currentCategory)
      .subscribe(
        data => {this.movies = data['results'];},
        err => console.error(err),
      );
    } else {
      this.api.fetchMoviesBySearch(this.currentPage, this.currentSearch)
      .subscribe(
        data => {this.movies = data['results'];},
        err => console.error(err),
      );
    }
  }

  precedentPage() {
    this.currentPage--;
    this.getMovies();
  }

  nextPage() {
    this.currentPage++;
    this.getMovies();
  }

  onCategoryChange(category: any){
    this.currentPage = 1;
    this.typeList = false;

    switch(category) {
       case this.categoryLabels[0]: {
          this.currentCategory = this.categoryRoutes[0];
          break;
       }
       case this.categoryLabels[1]: {
          this.currentCategory = this.categoryRoutes[1];
          break;
       }
       case this.categoryLabels[2]: {
          this.currentCategory = this.categoryRoutes[2];
          break;
       }
       case this.categoryLabels[3]: {
          this.currentCategory = this.categoryRoutes[3];
          break;
       }
    }
    this.getMovies();
  }

  onSubmitSearch(search: any){
    this.currentPage = 1;
    this.typeList = true;

    this.currentSearch = search;

    this.getMovies();
  }
}
