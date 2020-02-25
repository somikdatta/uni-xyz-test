import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // searchForm: FormGroup;
  control = new FormControl();
  movies = [];
  filteredMovies: Observable<string[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
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
    console.log(id);
  }
  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.movies.filter(movie => this.normalizeValue(movie.name).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }

}
