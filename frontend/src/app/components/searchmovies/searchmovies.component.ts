import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-searchmovies',
  templateUrl: './searchmovies.component.html',
  styleUrls: ['./searchmovies.component.css']
})
export class SearchmoviesComponent implements OnInit {

  // Movie list
  movies: Movie[] = [];
  basePosterPath = "http://image.tmdb.org/t/p/w342";

  // search
  currentSearch = "";

  // pagination
  currentPage = 1;
  maxPages = 0;

  constructor(private api: MoviesApiService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    if (this.currentSearch != ""){
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


  onSubmitSearch(search: any) {
    this.currentPage = 1;

    this.currentSearch = search;
    this.getMovies();
  }

  clearSearch() {
    this.currentSearch = "";
    this.movies = [];
    this.getMovies();
  }
}
