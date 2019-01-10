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

  fetchMovies(page = 1) {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies/popular/${page}`);
/*
    let base = this.http.get<Movie[]>(`${this.baseUrl}/movies/popular/${page}`);

    const request = base.pipe(
      map((data: Movie[]) => {
        return data;
      })
    );

    return request;*/
  }
}
