import { useState, useEffect } from "react";
import axios from "axios";

const useUserProfile = (userId,followId) => {
  const [user, setUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);


  const handleFollow = async (userId, followId) => {
    try {
    await axios.post(`/api/addfollows/${userId}/${followId}`);
    fetchUserData(followId);
    setIsFollowed(true);
    } catch (error) {
      console.log("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId, followId) => {
    try {
    await axios.patch(`/api/follows/${userId}/${followId}`);
    fetchUserData(followId);
    setIsFollowed(false);
    } catch (error) {
      console.log("Error unfollowing user:", error);
    }
  };

  const fetchUserData = async (followId) =>{
    try {
      const response = await axios.get(`/api/users/${followId}`);
      console.log("In fetchUserData, followid ", response.data);
      setUser( response.data);
      
    } catch (error){
      console.error(error);
    }
  };

  useEffect(() => {    
    fetchUserData(followId);
  }, [followId]);

  // Check if the user is followed by the login user
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await axios.get(`/api/checkfollow/${userId}/${followId}`);
        const isFollowed = response.data.isFollowed;
        setIsFollowed(isFollowed);
      } catch (error) {
        console.log("Error checking follow status:", error);
      }
    };

    checkFollowStatus();
  }, [userId,followId]);

  return { 
    user,
    isFollowed,
    handleFollow,
    handleUnfollow
  };
};

export default useUserProfile;