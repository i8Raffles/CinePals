import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../App";

const useMyProfile = () => {
  const [user, setUser] = useState({});
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const loginUser = useContext(AuthContext);
  const userId = loginUser?.id;

  useEffect(() => {
    const fetchUserData = async () =>{
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const { profile_description, profile_url, ...userData } = response.data;
        setUser(userData);
        setDescription(profile_description);
        setAvatarUrl(profile_url);
      } catch (error){
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId]);


  const handleSubmit = (description, avatarUrl) => {
    const updatedUser = {
        description: description,
        avatarUrl: avatarUrl,
      };
    
      axios
        .patch(`/api/users/${userId}`, updatedUser)
        .then((response) => {
          console.log("User updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
  };

  return { 
    user, 
    description, 
    setDescription, 
    avatarUrl, 
    setAvatarUrl, 
    handleSubmit
  };
};

export default useMyProfile;
