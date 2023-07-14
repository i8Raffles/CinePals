import React from "react";
import { Box, Paper, Avatar, Typography } from "@mui/material";
import useUserFollows from "./useUserFollows";
import { useNavigate, useParams } from "react-router-dom";


function UserFollows(props) {
    const { userId } = useParams();
    const { follows } = useUserFollows(userId);
    const navigate = useNavigate();  
    return (
        <Box sx={{mt:10, mr: 5, ml: 5}}>
           {follows.map((follow) => (
            <Paper key={follow.id}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 2, ml: 2, cursor: "pointer" }}
                onClick={() => navigate(`/user/${follow.id}/profile`)}
              >
              
                <Avatar src={follow.profile_url } alt="Follow avatar" sx= {{width: '60', height:'100%'}}/>
                
                <Typography sx={{ ml: 2, width: '10%' }}> {follow.username}</Typography>
              
                <Typography sx={{ ml: 2, width: '60%' }}>{follow.profile_description}</Typography>

              </Box>
            </Paper>
          ))}
        </Box>
      );
}

export default UserFollows;
