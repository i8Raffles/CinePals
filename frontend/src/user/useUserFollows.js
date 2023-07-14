import { useState, useEffect } from "react";
import axios from "axios";

const useUserFollows = (userId) => {
  const [follows, setFollows] = useState([]);
  // const userId = 1; //hard coding

  const fetchFollows = async () => {
    try {
      const response = await axios.get(`/api/follows/${userId}`);
      setFollows(response.data);
    } catch (error) {
      console.log("Error fetching follows:", error);
    }
  };
  useEffect(() => {
    fetchFollows();
  }, []);

  return { follows };
};

export default useUserFollows;