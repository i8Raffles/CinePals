export function movieApiBuilder(filter) {
    switch (filter) {
        case FILTER_TYPES.NOW_PLAYING:
            return 'https://api.themoviedb.org/3/movie/now_playing';
        case FILTER_TYPES.POPULAR:
            return 'https://api.themoviedb.org/3/movie/popular';
        case FILTER_TYPES.TOP_RATED:
            return 'https://api.themoviedb.org/3/movie/top_rated';
        case FILTER_TYPES.UPCOMING:
            return 'https://api.themoviedb.org/3/movie/upcoming';
        default:
            throw new Error("Invalid api filter");
    }
}

export const FILTER_TYPES = {
    NOW_PLAYING: 'NOW_PLAYING',
    POPULAR: 'POPULAR',
    TOP_RATED: 'TOP_RATED',
    UPCOMING: 'UPCOMING'
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
