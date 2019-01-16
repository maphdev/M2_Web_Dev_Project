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
}
