import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  lastSortingMethod;

  constructor(private http: HttpClient, private router: Router) { }

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
    if (this.endIndex > this.allMovies.length) {
      this.endIndex = this.allMovies.length - 1;
    }
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      this.moviesInView.push(this.allMovies[i]);
      ++this.startIndex;
    }
    if (this.lastSortingMethod) {
      this.isLastSortDesc = !this.isLastSortDesc;
      this.sort(this.lastSortingMethod);
    }
  }

  selectedMovie(id: number) {
    this.router.navigate([`/movie-detail/${id}`]);
  }

  sort(type: string) {
    this.moviesInView.sort(this.compareValues(type, this.isAscDesc(this.isLastSortDesc)));
    this.isLastSortDesc = !this.isLastSortDesc;
    this.lastSortingMethod = type;
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
