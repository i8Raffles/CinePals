
import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography, Avatar } from "@mui/material";
import useUserProfile from "./useUserProfile";
import {AuthContext} from "../App";

function UserProfile() {
  const { userId } = useParams();
  const loginUser = useContext(AuthContext);
  const loginUserId = loginUser?.id;
  const { user, isFollowed, handleFollow, handleUnfollow } = useUserProfile(loginUserId, userId);
  

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box mr={2} >
            <Avatar
            sx={{ width: 200, height: 200, marginRight: 20 }}
            alt="User Avatar"
            src={user.profile_url}
          />
          </Box>
          <Box>
          {user && (
              <>
            <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>User: {user.username}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>Email: {user.email}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>First Name: {user.first_name}</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>Last Name: {user.last_name}</Typography>
            <Typography  variant="body1" sx={{ mb: 3, width: "300px"}}>Description: {user.profile_description}</Typography>
            
            {isFollowed ? (
              <Button
                onClick={() => handleUnfollow(loginUserId, user.id)}
                sx={{ ml: 2, width: "10%" }}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={() => handleFollow(loginUserId, user.id)}
                sx={{ ml: 2, width: "10%" }}
              >
                +Follow
              </Button>
            )}
            </>
            )}      

          </Box>
        </Box>
      );

}

export default UserProfile;
