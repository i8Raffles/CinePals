import {useEffect, useReducer} from "react";
import {movieListReducer, defaultState, ACTION_TYPES} from "./movieListReducer";
import {movieApiBuilder} from "../utils/movieApiBuilder";

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmI2ZjQwN2FiY2RjYmYxMmM1OWZkMDBkYzJmMmQ3OSIsInN1YiI6IjY0YTc1NmYwNjVjMjZjMDBlYjJhM2QwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yo5Mn6XbO7pNSK-YNymfm-ywMRAPQAgAvPJ1KesFe50';

function useMovieList() {
    const [state, dispatch] = useReducer(movieListReducer, defaultState);

    useEffect(() => {
        const options = {method: 'GET', headers: {accept: 'application/json', authorization: 'Bearer ' + TOKEN}};
        fetch(movieApiBuilder(state.filter, state.page), options)
            .then(res => res.json())
            .then(json => {
                dispatch({ type: ACTION_TYPES.FETCH, payload: json.results });
            })
            .catch(err => console.log);
    }, [state.filter, state.page]);

    // console.log("in useMovieList, state is ", state);

    return {state, dispatch};
}

export default useMovieList;
