import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {

  @Input() id: number;
  @Input() posterPath: string;
  @Input() name: string;
  @Output() cardClicked = new EventEmitter<number>();

  basePosterPath = "http://image.tmdb.org/t/p/w342";

  constructor(private api: MoviesApiService) { }

  ngOnInit() {
    this.posterPath = this.basePosterPath + this.posterPath;
  }

  onClick() {
    this.cardClicked.emit(this.id);
  }

  // essai pour tester les fonctions
  /*
  addToWatchList() {
    this.api.addMovieToMoviesList("watchlist", this.id)
    .subscribe(
      data => {console.log(data);},
      err => console.error(err),
    );
    console.log("add watchlist : ", this.id);
  }

  addToSeenList() {
    this.api.addMovieToMoviesList("seenlist", this.id)
    .subscribe(
      data => {console.log(data);},
      err => console.error(err),
    );
    console.log("add seenlist : ", this.id);
  }

  addToFavoriteList() {
    this.api.addMovieToMoviesList("favoritelist", this.id)
    .subscribe(
      data => {console.log(data);},
      err => console.error(err),
    );
    console.log("add favoritelist : ", this.id);
  }
  */
}
