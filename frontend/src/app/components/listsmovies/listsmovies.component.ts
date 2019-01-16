import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listsmovies',
  templateUrl: './listsmovies.component.html',
  styleUrls: ['./listsmovies.component.css']
})

export class ListsmoviesComponent implements OnInit {
  // Categories
  categoryLabels = ["Watchlist", "Seen", "Favorites"];
  categoryRoutes = ["watchlist", "seenlist", "favoritelist"];
  currentLabel: string;
  currentRoute: string;

  // Movie list
  movies: Movie[] = [];
  basePosterPath = "http://image.tmdb.org/t/p/w342";

  constructor(private api: MoviesApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.movies = [];
      this.currentRoute = params.category;
      this.currentLabel = this.categoryLabels[this.categoryRoutes.indexOf(this.currentRoute)];
      this.getMovies();
    });
  }

  getMovies() {
    this.api.fetchPersonalMoviesList(this.currentRoute)
    .subscribe(
      data => {
        data['movieslist'].forEach(element => {
          this.api.fetchMovieById(element)
          .subscribe(
            datum => this.movies.push(datum),
            error => console.error(error)
          );
        })
      },
      err => console.error(err)
    );

  }

  onCardClicked(movieClickedId:number):void {
    this.router.navigate(['/movie', movieClickedId]);
  }
}
