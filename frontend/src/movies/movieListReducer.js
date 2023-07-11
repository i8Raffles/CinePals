import {FILTER_TYPES} from "../utils/movieApiBuilder";

export const defaultState = {
    movies: [],
    isLoading: false,
    error: false,
    filter: FILTER_TYPES.POPULAR
}

export const ACTION_TYPES = {
    FETCH: 'FETCH',
    FILTER_CHANGE: 'FILTER_CHANGE'
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
                filter: action.payload
            };
        default: return state;
    }
}
