import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input()
  movieName: string;

  @Input()
  rating: number;

  @Input()
  starCount: number;

  @Input()
  id: number;

  @Input()
  height: number;

  @Input()
  width: number;

  @Output()
  onSelect = new EventEmitter<Data>();

  ratingArr = [];

  constructor() { }

  ngOnInit() {
    if (!this.height) {
      this.height = 9;
    }
    if (!this.width) {
      this.width = 16;
    }
    if (!this.starCount) {
      this.starCount = 5;
    }
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
