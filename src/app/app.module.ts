import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { SearchComponent } from './movie/movie-list/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './movie/movie-list/movies/movies.component';
import { MovieCardComponent } from './movie/movie-card/movie-card.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MovieListComponent,
    SearchComponent,
    MoviesComponent,
    MovieCardComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
