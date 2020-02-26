import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  control = new FormControl();
  movies = [];
  filteredMovies: Observable<string[]>;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    //Could've made a model but we aren't really getting data from backend
    this.http.get<{ moviename: any, slno: any }>("../../../assets/movies.json").subscribe(data => {
      for (let i = 0; i < 100; i++) {
        this.movies.push({ name: data[i].moviename, id: data[i].slno });
      }
      this.filteredMovies = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this.filter(value))
      );
    });
  }

  goToMovie(id: number) {
    this.router.navigate([`/movie-detail/${id}`]);
  }
  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.movies.filter(movie => this.normalizeValue(movie.name).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }

}
