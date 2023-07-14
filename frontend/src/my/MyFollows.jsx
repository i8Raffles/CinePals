import React from "react";
import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import useMyFollows from "./useMyFollows";

function MyFollows() {
  const { follows, handleUnfollow } = useMyFollows();

  

  return (
    <Box sx={{mt:10, mr: 5, ml: 5}}>
       {follows.map((follow) => (
        <Paper key={follow.id}>
          <Box  sx={{ display: "flex", alignItems: "center", mb: 2, ml:2 }}>
            <Avatar src={follow.profile_url } alt="Follow avatar" sx= {{width: '60', height:'100%'}}/>
            <Typography sx={{ ml: 2, width: '10%' }}> {follow.username}</Typography>
            <Typography sx={{ ml: 2, width: '60%' }}>{follow.profile_description}</Typography>
            <Button onClick={() => handleUnfollow(follow.user_id, follow.id)} sx={{ ml: 2, width: '10%' }}>
              Unfollow
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default MyFollows;

