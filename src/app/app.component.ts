import { Component } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean;
  constructor(private authService: AuthenticationService) {
  }
  ngOnInit() {
    this.authService.autoAuthUser();
    this.isAuthenticated = this.authService.getIsAuth();
    console.log(this.isAuthenticated)
    this.authService.getAuthStatusListener().subscribe(res => this.isAuthenticated = res, err => this.isAuthenticated = false);
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
