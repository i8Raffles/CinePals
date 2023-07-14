import { useState, useEffect } from "react";
import axios from "axios";

const useUserMovies = (userId) => {
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
  }, [userId]);

  return { state };
};

export default useUserMovies;
