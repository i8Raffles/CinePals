import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../App";

const useMyFollows = () => {
  const [follows, setFollows] = useState([]);
  const loginUser = useContext(AuthContext);
  const userId = loginUser.id;

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
