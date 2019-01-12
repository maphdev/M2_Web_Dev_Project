import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-discovermovies',
  templateUrl: './discovermovies.component.html',
  styleUrls: ['./discovermovies.component.css']
})

export class DiscovermoviesComponent implements OnInit {
  // Categories
  categoryLabels = ["Popular", "Top Rated", "Now Playing", "Upcoming"];
  categoryRoutes = ["popular", "top_rated", "now_playing", "upcoming"];
  currentCategory: string;
  defaultLabel: string;

  // Movie list
  movies: Movie[] = [];
  basePosterPath = "http://image.tmdb.org/t/p/w342";

  // pagination
  currentPage: number;
  maxPages = 0;

  constructor(private api: MoviesApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.currentCategory = params.category;
      this.currentPage = params.page;
      this.defaultLabel = this.categoryLabels[this.categoryRoutes.indexOf(this.currentCategory)];
      this.getMovies();
    });
  }

  getMovies() {
    this.api.fetchMoviesByCategory(this.currentPage, this.currentCategory)
    .subscribe(
      data => {this.movies = data['results'];},
      err => console.error(err),
    );
  }

  precedentPage() {
    this.router.navigate(['/discover', this.currentCategory, --this.currentPage]);
  }

  nextPage() {
    this.router.navigate(['/discover', this.currentCategory, ++this.currentPage]);
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
    this.router.navigate(['/discover', this.currentCategory, this.currentPage]);
  }

  onCardClicked(movieClickedId:number):void {
    this.router.navigate(['/movie', movieClickedId]);
  }
}
