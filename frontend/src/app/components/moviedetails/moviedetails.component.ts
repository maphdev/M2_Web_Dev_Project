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

  constructor(private api: MoviesApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.getDetails(params.id);
      this.getReviews(params.id);
      this.getVideos(params.id);
    });
  }

  getDetails(id) {
    this.api.fetchMovieById(id)
    .subscribe(
      data => {this.movie = data; this.setStars();},
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

  setStars(){
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
}
