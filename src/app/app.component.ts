import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';
import { MovieService } from './movie/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(private authService: AuthenticationService, private movieService: MovieService) {
  }
  ngOnInit() {
    this.movieService.getMovies();
    this.authService.autoAuthUser();
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(res => this.isAuthenticated = res, err => this.isAuthenticated = false);
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
