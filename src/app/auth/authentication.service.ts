import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor(private router: Router) { }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  setAuth() {
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }
  private clearAuthData() {
    localStorage.removeItem("userData");
  }
  logoutUser() {

    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(["/signup"]);
  }

  private getAuthData() {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      return;
    }
    return {
      userData: userData
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }
}

