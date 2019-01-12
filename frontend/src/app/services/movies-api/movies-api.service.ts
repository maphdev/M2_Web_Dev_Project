import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';
import { map } from 'rxjs/operators/map';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  baseUrl: string;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.baseUrl = 'http://localhost:4000/api';
  }

  fetchMoviesByCategory(page = 1, category = "popular") {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies/${category}/${page}`);
  }

  fetchMoviesBySearch(page = 1, search = "") {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies/search/${search}/${page}`);
  }

  fetchPersonalMoviesList(list = "watchlist") {
    return this.http.get(`${this.baseUrl}/movielist/${list}/`, { headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }});
  }

  fetchMovieById(id = 0) {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}/`);
  }
  // (PUT) /api/movielist/watchlist/
  addMovieToMoviesList(list = "watchlist", id = 0) {
    return this.http.put(`${this.baseUrl}/movielist/${list}`, {id: id}, { headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }});
  }
}
