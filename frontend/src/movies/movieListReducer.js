import {FILTER_TYPES} from "../utils/movieApiBuilder";

export const defaultState = {
    movies: [],
    isLoading: false,
    error: false,
    searchCriteria: {
        filter: FILTER_TYPES.POPULAR,
        page: 1,
    },
    loading: false,
}

export const ACTION_TYPES = {
    LOAD_START: 'LOAD_START',
    FETCH: 'FETCH',
    RESET: 'REST',
    LOAD_END: 'LOAD_END',
    FILTER_CHANGE: 'FILTER_CHANGE',
    NEXT_PAGE: 'NEXT_PAGE'
}

export function movieListReducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.LOAD_START:
            return {
                ...state,
                loading: true,
            };
        case ACTION_TYPES.LOAD_END:
            return {
                ...state,
                loading: false
            };
        case ACTION_TYPES.FETCH:
            const appendedMovies = [...state.movies, ...(action.payload || [])]
            return {
                ...state,
                movies: appendedMovies
            };
        case ACTION_TYPES.RESET:
            return {
                ...state,
                movies: [],
            }
        case ACTION_TYPES.FILTER_CHANGE:
            return {
                ...state,
                movies: [],
                searchCriteria: {
                    ...state.searchCriteria,
                    filter: action.payload,
                },
                page: 1,
            };
        case ACTION_TYPES.NEXT_PAGE:
            const nextPage = state.searchCriteria.page + 1;
            console.log('next page', state.searchCriteria.page, nextPage);
            return {
                ...state,
                searchCriteria: {
                    ...state.searchCriteria,
                    page: nextPage
                }
            }
        default: return state;
    }
}
