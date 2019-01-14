import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasFavorite: boolean;
  favoriteMovie: Movie = null;
  recommendations: Movie = [];

  basePosterPath = "http://image.tmdb.org/t/p/w342";

  constructor(private api: MoviesApiService) { }

  ngOnInit() {
    this.getRandomFavorite();
  }

  getRandomFavorite(){
    this.api.fetchPersonalMoviesList("favoritelist")
    .subscribe(
      data => {
        let favoriteMovies = data['movieslist'];
        if (favoriteMovies.length > 0){
          this.hasFavorite = true;
          let favoriteMovieId = favoriteMovies[Math.floor(Math.random()*favoriteMovies.length)];
          this.api.fetchMovieById(favoriteMovieId)
          .subscribe(
            datum => {
              this.favoriteMovie = datum;
              this.getRecommendation(this.favoriteMovie.id);
            },
            error => console.error(error)
          );
        } else {
          this.hasFavorite = false;
        }
      },
      err => console.error(err)
    );
  }

  getRecommendation(id) {
    this.api.fetchMovieRecommendationsById(id)
    .subscribe(
      data => {this.recommendations = data['results']; console.log(this.recommendations);},
      err => console.error(err),
    );
  }
}
