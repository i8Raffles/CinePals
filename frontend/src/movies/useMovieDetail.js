import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../App";
// import { useRouteId } from "react-router/dist/lib/hooks";

const useMovieDetail = (movieId) => {
  console.log("in useMovieDetail, movieId is ", movieId);

  const user = useContext(AuthContext);
  const userId = user.id;

  const [state, setState] = useState({
    movie: {},
    reviews: [],
    avg_rating: 0,
    loading: true,
    error: null,
    addToWatchlistSuccess:null,
  });

  const updateReviews = (newReviewData) => {
    setState((prevState) => ({
      ...prevState,
      reviews: [...prevState.reviews, newReviewData],
    }));
  };

  useEffect(() => {
    // console.log("useEffect is being called");
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(`/movie_details/${movieId}`);
        const reviewsResponse = await axios.get(`/api/reviews/${movieId}`);
        const ratingResponse = await axios.get(`/api/avg_rating/${movieId}`);
        // console.log("Movie data from the API response:", movieResponse.data);
        // console.log("Reviews data from the API response:", reviewsResponse.data);

        setState({
          movie: movieResponse.data,
          reviews: reviewsResponse.data,
          avg_rating: ratingResponse.data.avg_rating,
          loading: false,
          error: null,
          addToWatchlistSuccess:null,
        });
      } catch (error) {
        console.error("Error fetching movie and reviews:", error);
        setState({
          movie: {},
          reviews: [],
          avg_rating: 0,
          loading: false,
          error: error.message,
          addToWatchlistSuccess:null,
        });
      }
    };

    fetchData();
  }, [movieId]);

  const handleSubmit = (newReview, newRating) => {
  //   console.log("newReview:", newReview);
  console.log("newRating in handleSubmit:", newRating);
  // console.log("Type of newRating:", typeof newRating);
    
  //   console.log(`newReview: ${newReview}`);
    const newData = {
      newReview: newReview,
      newRating: parseFloat(newRating)
    };

    axios
    .get(`/api/reviews/${movieId}/${userId}`)
    .then((response) => {
      const existingReviews = response.data;
      console.log("existingReviews ? ", existingReviews);

      if (existingReviews && existingReviews.length > 0) {
        setState((prevState) => ({
          ...prevState,
          error: "You have did a review on this movie.",
        }));
        console.error("Error: Review already exists for this movie and user");
      } else {
        // Post the new review since it doesn't already exist
        axios
          .post(`/api/reviews/${movieId}/${userId}`, newData)
          .then((response) => {
            console.log("Add new review successfully");
            console.log("Add review response.data", response.data);

            updateReviews({
              id: response.data.id,
              rating: newRating,
              review: newReview,
              created_at: response.data.created_at,
              username: response.data.username,
              user_id: response.data.user_id
            });
          })
          .catch((error) => {
            console.error("Error adding new review:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error fetching existing reviews:", error);
    });
    
  };
    const handleAddToWatchlist = () => {

    axios
      .get(`/api/watchlists/${movieId}/${userId}`)
      .then((response) => {
        const existInWatchlist = response.data;
        console.log("Moive existed in watchlist? ", existInWatchlist);

        if(existInWatchlist){
          setState((prevState) => ({
            ...prevState,
            error: "This movie existed in Your Movies.",
          }));
          console.error("Error: Moive already exists in My movies for this user");
        } else{
          axios
          .post(`/api/watchlists/${movieId}/${userId}`)
          .then((response) => {
            console.log("Movie added to watchlist");
            setState((prevState)=>({
              ...prevState,
              addToWatchlistSuccess: true
            }));
          })
          .catch((error) => {
            if (error.response && error.response.status === 409) {
                console.log("Movie already in watchlist");
              // You can show an error message here if needed
            } else {
              console.error("Error adding movie to watchlist:", error);
              // You can show an error message here if needed
            }
          });

        }
      })
      .catch((error) =>{

      })
    
  };

  // console.log("state in useMovieDetail ", state);
  // console.log("reviews in useMovieDetail ", state.reviews);
  console.log("state.AVG_RATING in useMovieDetail ", state.avg_rating);
  return { state, handleSubmit, handleAddToWatchlist };
};

export default useMovieDetail;
