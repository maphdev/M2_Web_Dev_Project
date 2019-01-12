import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api/movies-api.service';
import { Movie } from '../../types/movie';
import {ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  movie: Movie = null;

  constructor(private api: MoviesApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.getDetails(params.id);
    });
  }

  getDetails(id) {
    this.api.fetchMovieById(id)
    .subscribe(
      data => this.movie = data,
      error => console.error(error)
    );
  }
}
