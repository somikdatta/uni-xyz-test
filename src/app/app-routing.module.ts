import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { ReverseGuard } from './auth/reverse.guard';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: "", redirectTo: "signup", pathMatch: "full" },
  { path: "signup", component: SignupComponent, canActivate: [ReverseGuard] },
  { path: "movie-index", component: MovieListComponent, canActivate: [AuthGuard] },
  {
    path: "movie-detail", canActivate: [AuthGuard], children: [
      { path: ":id", component: MovieDetailComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
