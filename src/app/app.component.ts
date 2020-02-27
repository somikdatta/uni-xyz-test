import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  path: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.path = event.url;
      }
    })
  }
  ngOnInit() {
    this.authService.autoAuthUser();
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(res => this.isAuthenticated = res, err => this.isAuthenticated = false);
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
