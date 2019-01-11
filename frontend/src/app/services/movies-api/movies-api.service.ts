import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';
import { map } from 'rxjs/operators/map';


@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:4000/api';
  }

  printOnConsole(){
    console.log("ok");
  }

  fetchMoviesByCategory(page = 1, category = "popular") {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies/${category}/${page}`);
  }

  fetchMoviesBySearch(page = 1, search = "") {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies/search/${search}/${page}`);
  }
}
