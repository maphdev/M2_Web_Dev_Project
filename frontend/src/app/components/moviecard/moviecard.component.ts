import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {

  @Input() id: number;
  @Input() posterPath: string;
  @Input() name: string;
  @Output() click = new EventEmitter<any>();
  
  basePosterPath = "http://image.tmdb.org/t/p/w342";

  constructor() { }

  ngOnInit() {
    this.posterPath = this.basePosterPath + this.posterPath;
  }

  onClick() {
    this.click.emit({
      id: this.id,
    });
  }

}
