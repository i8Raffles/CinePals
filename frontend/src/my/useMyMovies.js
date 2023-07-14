import { useState, useEffect } from "react";
import axios from "axios";

const useMyMovies = (userId) => {
  const [state, setState] = useState({
    movies: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMyMovies = async () => {
      try {
        const response = await axios.get(`/api/watchlists/${userId}`); 
        setState({
          movies: response.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          movies: [],
          loading: false,
          error: error.message,
        });
      }
      // console.log(state.movies);
    };

    fetchMyMovies();
  }, []);

  const deleteMovie = async (userId, movieId) => {
    const confirmed = window.confirm("Are you sure you want to remove this movie from your watchlist?");
    if (confirmed) {
    try {
      console.log("state.movies: ", state.movies);
      await axios.delete(`/api/watchlists/${userId}/${movieId}`);
      const updatedMovies = state.movies.filter((movie) => movie.movie_id !== movieId);
      console.log("updatedMovies", updatedMovies);
      setState({
        ...state,
        movies: updatedMovies,
      });
    } catch (error) {
      setState({
        movies: [],
        loading: false,
        error: error.message,
      });
    }
   }
  };

  return { state, deleteMovie };
};

export default useMyMovies;
