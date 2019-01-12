import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';
import { ActivatedRoute, Router} from "@angular/router";

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
  currentSearch: string;

  // pagination
  currentPage: number = 1;
  maxPages: number;

  constructor(private api: MoviesApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['query'] != null && params['page'] != null) {
        this.currentSearch = decodeURI(params['query']);
        this.currentPage = params['page'];
        this.getMovies();
      } else {
        this.movies = [];
        this.router.navigate(['/search']);
      }
    });
  }

  getMovies() {
    this.api.fetchMoviesBySearch(this.currentPage, this.currentSearch)
    .subscribe(
      data => {this.movies = data['results']; this.maxPages = data['total_pages']},
      err => console.error(err),
    );
  }

  precedentPage() {
    this.router.navigate(['/search'], { queryParams: {query: encodeURI(this.currentSearch), page: --this.currentPage}});
  }

  nextPage() {
    this.router.navigate(['/search'], { queryParams: {query: encodeURI(this.currentSearch), page: ++this.currentPage}});
  }


  submitSearch(search: any) {
    this.currentPage = 1;
    this.router.navigate(['/search'], { queryParams: {query: encodeURI(search), page: this.currentPage}});
  }

  clearSearch() {
    this.router.navigate(['/search']);
  }

  onCardClicked(movieClickedId:number):void {
    this.router.navigate(['/movie', movieClickedId]);
  }
}
