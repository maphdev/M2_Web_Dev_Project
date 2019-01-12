import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-discovermovies',
  templateUrl: './discovermovies.component.html',
  styleUrls: ['./discovermovies.component.css']
})
export class DiscovermoviesComponent implements OnInit {
  // Categories
  categoryLabels = ["Popular", "Top Rated", "Now Playing", "Upcoming"];
  categoryRoutes = ["popular", "top_rated", "now_playing", "upcoming"];
  currentCategory = this.categoryRoutes[0];

  // Movie list
  movies: Movie[] = [];
  basePosterPath = "http://image.tmdb.org/t/p/w342";

  // pagination
  currentPage = 1;
  maxPages = 0;

  constructor(private api: MoviesApiService) { }

  ngOnInit() {
     this.getMovies();
  }

  getMovies() {
    this.api.fetchMoviesByCategory(this.currentPage, this.currentCategory)
    .subscribe(
      data => {this.movies = data['results'];},
      err => console.error(err),
    );
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
}