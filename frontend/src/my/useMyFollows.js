import { useState, useEffect } from "react";
import axios from "axios";

const useMyFollows = () => {
  const [follows, setFollows] = useState([]);
  const userId = 1; //hard coding

  const fetchFollows = async () => {
    try {
      const response = await axios.get(`/api/follows/${userId}`);
      setFollows(response.data);
    } catch (error) {
      console.log("Error fetching follows:", error);
    }
  };

  const handleUnfollow = async (userId, followId) => {
    try {
    await axios.patch(`/api/follows/${userId}/${followId}`);
    fetchFollows();
    } catch (error) {
      console.log("Error unfollowing user:", error);
    }
  };


  useEffect(() => {
    fetchFollows();
  }, []);

  return { follows, handleUnfollow };
};

export default useMyFollows;