import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  { path: "", redirectTo: "signup", pathMatch: "full" },
  { path: "signup", component: SignupComponent },
  { path: "movie-index", component: MovieListComponent },
  // {path:"movie-detail/:id"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
