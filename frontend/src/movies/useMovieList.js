import {useEffect, useReducer} from "react";
import {movieListReducer, defaultState, ACTION_TYPES} from "./movieListReducer";
import {movieApiBuilder} from "../utils/movieApiBuilder";
import { FILTER_TYPES } from "../utils/movieApiBuilder";

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmI2ZjQwN2FiY2RjYmYxMmM1OWZkMDBkYzJmMmQ3OSIsInN1YiI6IjY0YTc1NmYwNjVjMjZjMDBlYjJhM2QwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yo5Mn6XbO7pNSK-YNymfm-ywMRAPQAgAvPJ1KesFe50';

function useMovieList() {
    const [state, dispatch] = useReducer(movieListReducer, defaultState);

    useEffect(() => {
        const options = {method: 'GET', headers: {accept: 'application/json', authorization: 'Bearer ' + TOKEN}};
        fetch(movieApiBuilder(state.filter, state.page, state.movieId), options)
            .then(res => res.json())
            .then(json => {
                dispatch({ type: ACTION_TYPES.FETCH, payload: json.results });
            })
            .catch(err => console.log);
    }, [state.filter, state.page]);

    return {state, dispatch};
}

export function useMovie() {
  const [state, dispatch] = useReducer(movieListReducer, defaultState);

  useEffect(() => {
    if (state.movieId === undefined) {
      return;
    }
    const options = {method: 'GET', headers: {accept: 'application/json', authorization: 'Bearer ' + TOKEN}};
    fetch(movieApiBuilder(FILTER_TYPES.MOVIE, 1, state.movieId), options)
    .then(res => res.json())
    .then(json => {
      dispatch({ type:ACTION_TYPES.FETCH_MOVIE, payload: json });
    })
    .catch(err => console.log);
  }, [state.movieId]);

  return {state, dispatch};
}

export default useMovieList;
