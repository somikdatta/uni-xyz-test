import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { start } from 'repl';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  allMovies;
  moviesInView = [];
  endIndex = 8;
  startIndex = 0;
  isLastSortDesc = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("../../../assets/movies.json").subscribe(data => {
      this.allMovies = data;
      for (let i = this.startIndex; i <= this.endIndex; i++) {
        this.moviesInView.push(this.allMovies[i]);
        this.startIndex++;
      }
    })
  }

  loadMore() {
    this.endIndex += 9;
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      this.moviesInView.push(this.allMovies[i]);
      this.startIndex++;
    }
  }

  selectedMovie(id: any) {
    console.log(id)
  }

  sort(type: string) {
    this.moviesInView.sort(this.compareValues(type, this.isAscDesc(this.isLastSortDesc)));
    this.isLastSortDesc = !this.isLastSortDesc;
  }

  isAscDesc(data: boolean) {
    if (data) {
      return 'desc';
    }
    return 'asc';
  }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

}
