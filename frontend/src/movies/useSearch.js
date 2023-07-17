import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = (searchText) => {
  const [state, setState] = useState({
    movies: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResponse = await axios.get(`/search_by_name/${searchText}`);
        console.log("Search Response! " + JSON.stringify(searchResponse));

        setState({
          movies: searchResponse.data.results,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
        setState({
          movies: [],
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [searchText]);

  return { state };
};

export default useSearch;
