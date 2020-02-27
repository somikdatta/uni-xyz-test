import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: "root" })
export class ReverseGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot
    ):
        | boolean
        | import("@angular/router").UrlTree
        | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
        | Promise<boolean | import("@angular/router").UrlTree> {
        const isAuthenticated = this.authService.getIsAuth();
        if (isAuthenticated) {
            this.router.navigate(["/movie-index"]);
        }
        return true;
    }
}