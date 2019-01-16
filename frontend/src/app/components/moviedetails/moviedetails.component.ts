import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';
import { Review } from '../../types/review';
import { Video } from '../../types/video';
import {ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  movie: Movie = null;
  fullStars: number[] = [];
  halfStars: number[] = [];
  emptyStars: number[] = [];
  reviews: Review[] = [];
  videos: Video[] = [];
  isInFavorite: boolean = false;
  isInWatchlist: boolean = false;
  isInSeenlist: boolean = false;

  constructor(private api: MoviesApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.getDetails(params.id);
    });
  }

  getDetails(id) {
    this.api.fetchMovieById(id)
    .subscribe(
      data => {
        this.movie = data;
        this.getReviews(id);
        this.getVideos(id);
        this.setStars();
        this.setHeart(id);
        this.setMoviesListsButton(id);
      },
      error => console.error(error)
    );
  }

  getReviews(id) {
    this.api.fetchReviewById(id)
    .subscribe(
      data => this.reviews = data['results'],
      error => console.error(error)
    );
  }

  getVideos(id) {
    this.api.fetchVideosById(id)
    .subscribe(
      data => this.videos = data['results'],
      error => console.error(error)
    );
  }

  setStars() {
    let voteAverageToHalfPoint = Math.round(this.movie.vote_average * 2) / 2;

    while(voteAverageToHalfPoint >= 2) {
      voteAverageToHalfPoint -= 2;
      this.fullStars.push(1);
    }
    if (voteAverageToHalfPoint >= 1) {
      this.halfStars.push(1);
    }

    let nbStarsLeft = 5 - this.fullStars.length - this.halfStars.length;
    for (let i = 0; i < nbStarsLeft; i++){
      this.emptyStars.push(1);
    }
  }

  setHeart(id) {
    this.api.fetchPersonalMoviesList("favoritelist")
    .subscribe(
      data => {
        data['movieslist'].forEach(element => {
          if(element == id){
            this.isInFavorite = true;
          }
        });
      },
      err => console.error(err)
    );
  }

  setMoviesListsButton(id) {
    this.api.fetchPersonalMoviesList("watchlist")
    .subscribe(
      data => {
        data['movieslist'].forEach(element => {
          if(element == id){
            this.isInWatchlist = true;
          }
        });
      },
      err => console.error(err)
    );
    this.api.fetchPersonalMoviesList("seenlist")
    .subscribe(
      data => {
        data['movieslist'].forEach(element => {
          if(element == id){
            this.isInSeenlist = true;
          }
        });
      },
      err => console.error(err)
    );
  }

  modifyStateFavorite() {
    if (this.isInFavorite == false) {
      this.addToList("favoritelist");
    } else {
      this.removeFromList("favoritelist");
    }
    this.isInFavorite = !this.isInFavorite;
  }

  modifyStateWatchlist() {
    if (this.isInWatchlist == false) {
      this.addToList("watchlist");
    } else {
      this.removeFromList("watchlist");
    }
    this.isInWatchlist = !this.isInWatchlist;
  }

  modifyStateSeelist() {
    if (this.isInSeenlist == false) {
      this.addToList("seenlist");
    } else {
      this.removeFromList("seenlist");
    }
    this.isInSeenlist = !this.isInSeenlist;
  }

  addToList(list) {
    this.api.addMovieToMoviesList(list, this.movie.id)
    .subscribe(
      data => {},
      err => console.error(err),
    );
  }

  removeFromList(list) {
    this.api.deleteMovieFromMoviesList(list, this.movie.id)
    .subscribe(
      data => {},
      err => console.error(err),
    );
  }
}
