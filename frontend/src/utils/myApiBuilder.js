export function myApiBuilder(filter) {
  switch (filter) {
      case FILTER_TYPES.MY_WATCHLIST:
          return '/api/watchlists';
      case FILTER_TYPES.MY_REVIEWS:
          return '/api/reviews';
      default:
          throw new Error("Invalid api filter");
  }
}

export const FILTER_TYPES = {
  MY_WATCHLIST: 'MY_WATCHLIST',
  MY_REVIEWS: 'MY_REVIEWS'
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';