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
  currentLabel: string;
  currentRoute: string;

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
      this.currentRoute = params.category;
      this.currentPage = params.page;
      this.currentLabel = this.categoryLabels[this.categoryRoutes.indexOf(this.currentRoute)];
      this.getMovies();
    });
  }

  getMovies() {
    this.api.fetchMoviesByCategory(this.currentPage, this.currentRoute)
    .subscribe(
      data => {this.movies = data['results'];},
      err => console.error(err),
    );
  }

  precedentPage() {
    this.router.navigate(['/discover', this.currentRoute, --this.currentPage]);
  }

  nextPage() {
    this.router.navigate(['/discover', this.currentRoute, ++this.currentPage]);
  }

  onCardClicked(movieClickedId:number):void {
    this.router.navigate(['/movie', movieClickedId]);
  }
}
