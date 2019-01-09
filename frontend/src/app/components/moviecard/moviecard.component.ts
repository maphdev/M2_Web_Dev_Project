import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {

  @Input() id: string;
  @Input() posterPath: string;
  @Input() name: string;
  @Output() click = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.click.emit({
      id: this.id,
    });
  }

}
