import {FILTER_TYPES} from "../utils/movieApiBuilder";

export const defaultState = {
    movies: [],
    isLoading: false,
    error: false,
    filter: FILTER_TYPES.POPULAR,
    page: 1,
}

export const ACTION_TYPES = {
    FETCH: 'FETCH',
    FILTER_CHANGE: 'FILTER_CHANGE',
    FETCH_MOVIE: 'FETCH_MOVIE'
}

export function movieListReducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.FETCH:
            return {
                ...state,
                movies: action.payload
            };
        case ACTION_TYPES.FILTER_CHANGE:
            return {
                ...state,
                filter: action.payload,
                page: 1,
            };
        case ACTION_TYPES.FETCH_MOVIE:
            return {
              ...state,
              movie: action.payload
            }
        default: return state;
    }
}
