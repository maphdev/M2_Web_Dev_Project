import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  basePosterPath = "http://image.tmdb.org/t/p/w342";
  pageNum = 1;

  constructor(private api: MoviesApiService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(pageNum = 1) {
    this.api.fetchMovies(pageNum)
    .subscribe(
      data => {this.movies = data['results'];},
      err => console.error(err),
    );
  }
}
