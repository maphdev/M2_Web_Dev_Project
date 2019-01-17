# Watchlist
## About the application

_Watchlist_ is an application in which you can discover new movies and add them to your watchlist, so that you never run out of movies to watch. You can also add movies to your list of favorites and to your list of already seen movies.

You can discover new films in several ways:
- on the home page with some recommendations based on the movies in your favorites list.
- by searching them by name
- by searching them by category (popular, top rated, now playing and upcoming)

For each film in the TMDB database, you can obtain details such as the poster, synopsys, genres, release date, users' rating, trailers and reviews.

## Test the application

To test the application, you can either do it locally or you can do it on an already deployed version.

### Local installation

To install locally the application, download or clone the files via this page.

In the root of the application, install all the dependencies :

```bash
npm install
```

Then start both front-end and back-end server :

```bash
npm start
```

The application is available on http://localhost:4200/.

The Watchlist API is available on http://localhost:4000/.

### Deployed application

The deployed application is available via github pages : [watchlist](https://maphdev.github.io/watchlist/).

The deployed API is available on heroku : [api-watchlist](https://api-watchlist.herokuapp.com/).

## API Documentation
The Watchlist API documentation is available [here](http://alienor.brabant.emi.u-bordeaux.fr/m2web/watchlistApi.html).
