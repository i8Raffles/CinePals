import {useEffect, useReducer} from "react";
import {movieListReducer, defaultState, ACTION_TYPES} from "./movieListReducer";
import {movieApiBuilder} from "../utils/movieApiBuilder";

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmI2ZjQwN2FiY2RjYmYxMmM1OWZkMDBkYzJmMmQ3OSIsInN1YiI6IjY0YTc1NmYwNjVjMjZjMDBlYjJhM2QwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yo5Mn6XbO7pNSK-YNymfm-ywMRAPQAgAvPJ1KesFe50';

function useMovieList() {
    const [state, dispatch] = useReducer(movieListReducer, defaultState);

    useEffect(() => {
        const options = {method: 'GET', headers: {accept: 'application/json', authorization: 'Bearer ' + TOKEN}};
        dispatch( {type: ACTION_TYPES.LOAD_START });
        fetch(movieApiBuilder(state.searchCriteria.filter, state.searchCriteria.page), options)
            .then(res => res.json())
            .then(json => {
                dispatch({ type: ACTION_TYPES.FETCH, payload: json.results });
            })
            .catch(err => console.log)
            .finally(() => {
                dispatch( {type: ACTION_TYPES.LOAD_END });
            });
    }, [state.searchCriteria]);

    return {state, dispatch};
}

export default useMovieList;
