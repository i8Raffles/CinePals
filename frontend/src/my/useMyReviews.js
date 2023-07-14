import { useState, useEffect } from "react";
import axios from "axios";

const useMyReviews = () => {
  const [state, setState] = useState({
    movies: [],
    loading: true,
    error: null,
  });
  const userId = 1; //hard coding

  useEffect(() => {
    const fetchMyMovies = async () => {
      try {
        const response = await axios.get(`/api/myreviews/${userId}`); 
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

  const setReviews = (reviewId, updatedReview) => {
    // console.log("reviewId is", reviewId, "updatedReview is ", updatedReview);
    setState((prevState) => {
      const updatedMovies = prevState.movies.map((m) => {
        if (m.id === reviewId) {
          return { ...m, review: updatedReview };
        }
        return m;
      });
  
      return {
        ...prevState,
        movies: updatedMovies,
      };
    });
  };

  const handleSubmit = (reviewId, updatedReview) => {
    
    // console.log(`Review ID: ${reviewId}, Updated Review: ${updatedReview}`);
    const updatedReviews = {
      updatedReview: updatedReview
    };
    axios
      .patch(`/api/myreviews/${reviewId}`, updatedReviews)
      .then((response) => {
        console.log("reviews updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
    
  };
  

  return { state, setReviews,handleSubmit };
};

export default useMyReviews;
