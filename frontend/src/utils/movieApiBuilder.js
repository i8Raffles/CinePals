import {genresList} from "./genres";

export function movieApiBuilder(filter, page, movieId) {
    switch (filter) {
        case FILTER_TYPES.NOW_PLAYING:
            // return 'https://api.themoviedb.org/3/movie/now_playing';
            return 'http://localhost:8001/movies_now_playing/' + page;
        case FILTER_TYPES.POPULAR:
            // return 'https://api.themoviedb.org/3/movie/popular';
            return 'http://localhost:8001/movies_popular/' + page;
        case FILTER_TYPES.TOP_RATED:
            // return 'https://api.themoviedb.org/3/movie/top_rated';
            return 'http://localhost:8001/movies_top_rated/' + page;
        case FILTER_TYPES.UPCOMING:
            // return 'https://api.themoviedb.org/3/movie/upcoming';
            return 'http://localhost:8001/movies_upcoming/' + page;
        case FILTER_TYPES.MOVIE:
            return 'http://localhost:8001/movie_details/' + movieId;
        default:
            if (!!genresList.find(g => g.id === filter)) {
                return 'http://localhost:8001/movies_by_genres/' + filter + '/' + page;
            }
            throw new Error('Invalid filter type');
    }
}

export const FILTER_TYPES = {
    NOW_PLAYING: 'NOW_PLAYING',
    POPULAR: 'POPULAR',
    TOP_RATED: 'TOP_RATED',
    UPCOMING: 'UPCOMING',
    MOVIE: 'MOVIE'
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
