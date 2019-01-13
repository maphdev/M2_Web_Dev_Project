import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';
import { Review } from '../../types/review';
import { Video } from '../../types/video';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  baseUrl: string;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.baseUrl = 'http://localhost:4000/api';
  }

  // fetch
  fetchMoviesByCategory(page = 1, category = "popular") {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies/${category}/${page}`);
  }

  fetchMoviesBySearch(page = 1, search = "") {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies/search/${search}/${page}`);
  }

  fetchPersonalMoviesList(list = "watchlist") {
    return this.http.get(`${this.baseUrl}/movielist/${list}`, { headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }});
  }

  fetchMovieById(id = 0) {
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }

  fetchReviewById(id = 0) {
    return this.http.get<Review[]>(`${this.baseUrl}/movies/${id}/reviews`);
  }

  fetchVideosById(id = 0) {
    return this.http.get<Video[]>(`${this.baseUrl}/movies/${id}/videos`);
  }

  // add
  addMovieToMoviesList(list = "watchlist", id = 0) {
    return this.http.put(`${this.baseUrl}/movielist/${list}`, {id: id}, { headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }});
  }

  // delete
  //router.delete('/movielist/favoritelist/:movie_id', auth, ctrl_watchlist.deleteMovieToFavoritelist);
  deleteMovieFromMoviesList(list = "watchlist", id = 0) {
    return this.http.delete(`${this.baseUrl}/movielist/${list}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` }});
  }
}
