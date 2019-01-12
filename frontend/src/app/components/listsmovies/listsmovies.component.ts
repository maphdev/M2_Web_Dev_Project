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
  categoryLabels = ["Watchlist", "Seen", "Favorite"];
  categoryRoutes = ["watchlist", "seenlist", "favoritelist"];
  currentCategory = this.categoryRoutes[0];
  defaultLabel: string;

  // Movie list
  movies: Movie[] = [];
  basePosterPath = "http://image.tmdb.org/t/p/w342";

  constructor(private api: MoviesApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.movies = [];
      this.currentCategory = params.category;
      this.defaultLabel = this.categoryLabels[this.categoryRoutes.indexOf(this.currentCategory)];
      this.getMovies();
    });
  }

  getMovies() {
    this.api.fetchPersonalMoviesList(this.currentCategory)
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

  onCategoryChange(category: any){
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
    }
    this.router.navigate(['/lists', this.currentCategory]);
  }

  onCardClicked(movieClickedId:number):void {
    this.router.navigate(['/movie', movieClickedId]);
  }
}
