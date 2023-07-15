import { useState, useEffect } from "react";
import axios from "axios";
// import { useRouteId } from "react-router/dist/lib/hooks";

const useMovieDetail = (movieId) => {
  console.log("in useMovieDetail, movieId is ", movieId);
  const userId = 1; //hard coding
  const [state, setState] = useState({
    movie: {},
    reviews: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // console.log("useEffect is being called");
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(`/movie_details/${movieId}`);
        const reviewsResponse = await axios.get(`/api/reviews/${movieId}`);
        // console.log("Movie data from the API response:", movieResponse.data);
        // console.log("Reviews data from the API response:", reviewsResponse.data);

        setState({
          movie: movieResponse.data,
          reviews: reviewsResponse.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching movie and reviews:", error);
        setState({
          movie: {},
          reviews: [],
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [movieId]);

  const handleSubmit = (newReview, newRating) => {
  //   console.log("newReview:", newReview);
  // console.log("newRating:", newRating);
  // console.log("Type of newRating:", typeof newRating);
    
  //   console.log(`newReview: ${newReview}`);
    const newData = {
      newReview: newReview,
      newRating: parseFloat(newRating)
    };
    axios
      .post(`/api/reviews/${movieId}/${userId}`, newData)
      .then((response) => {
        console.log("add new review successfully");
      })
      .catch((error) => {
        console.error("Error adding new review:", error);
      });
    
  };
  
  // console.log("state in useMovieDetail ", state);
  // console.log("reviews in useMovieDetail ", state.reviews);
  return { state, handleSubmit };
};

export default useMovieDetail;
