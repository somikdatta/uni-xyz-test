import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  id: number;
  movies = [];
  searchedMovie;
  featuredMovies;
  featuredMoviesQueue;
  startIndex;
  endIndex;
  isStart = true;
  isEnd = false;
  isLoading = true;
  config = {
    initialStart: 0,
    initialEnd: 4
  }
  infoCardWidth = 32;
  infoCardHeight = 18;
  carouselCardWidth = 16;
  carouselCardHeight = 9;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      let temp = this.id;
      this.id = parseInt(paramMap.get('id'));
      if (this.id != temp) {
        this.getData();
      }
    })

    if (window.innerWidth < 436) {
      this.config.initialStart = 0;
      this.config.initialEnd = 1;
      this.infoCardHeight = 9;
      this.infoCardWidth = 16;
      this.carouselCardWidth = 16;
      this.carouselCardHeight = 9;
    }
    else if (window.innerWidth < 631) {
      this.config.initialStart = 0;
      this.config.initialEnd = 1;
      this.infoCardHeight = 12.5;
      this.infoCardWidth = 24;
      this.carouselCardWidth = 24;
      this.carouselCardHeight = 12.5;
    }
    else if (window.innerWidth < 959) {
      this.config.initialStart = 0;
      this.config.initialEnd = 2;
    }
    else if (window.innerWidth < 1200) {
      this.config.initialStart = 0;
      this.config.initialEnd = 3;
    }

    this.startIndex = this.config.initialStart;
    this.endIndex = this.config.initialEnd;


    window.addEventListener("orientationchange", function () {
      this.location.reload();
    }, false);
    window.addEventListener("resize", function () {
      this.location.reload();
    }, false);
  }

  getData() {
    this.http.get<[]>("../../../assets/movies.json").subscribe(data => {
      this.movies = data;
      this.searchedMovie = this.movies.filter((movie) => {
        return movie.slno == this.id
      })
      this.featuredMovies = this.movies.filter((movie) => {
        return movie.isFeatured == "TRUE";
      })
      this.featuredMoviesQueue = this.featuredMovies.slice(this.startIndex, this.endIndex);
      this.isLoading = false;
    })
  }

  selectedMovie(id: number) {
    this.router.navigate([`/movie-detail/${id}`]);
  }

  onRightButtonClick() {
    this.startIndex++;
    this.endIndex++;
    if (this.endIndex >= this.featuredMovies.length) {
      this.isEnd = true;
      this.isStart = false;
      let delta = this.endIndex - this.featuredMovies.length;
      this.startIndex -= delta;
      this.endIndex -= delta;
      this.featuredMoviesQueue = this.featuredMovies.slice(this.startIndex, this.endIndex);
      return;
    }
    this.featuredMoviesQueue = this.featuredMovies.slice(this.startIndex, this.endIndex);
    this.isStart = false;
  }

  onLeftButtonClick() {
    this.startIndex--;
    this.endIndex--;
    if (this.startIndex <= this.config.initialStart) {
      this.isStart = true;
      this.isEnd = false;
      this.startIndex = this.config.initialStart;
      this.endIndex = this.config.initialEnd;
      this.featuredMoviesQueue = this.featuredMovies.slice(this.startIndex, this.endIndex);
      return;
    }
    this.featuredMoviesQueue = this.featuredMovies.slice(this.startIndex, this.endIndex);
    this.isStart = false;
  }
}
