import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import React from "react";
import useMyProfile from "./useMyProfile";

function MyProfile() {
  const {user, description, setDescription, avatarUrl, setAvatarUrl, handleSubmit } = useMyProfile();

  const handleAvatarChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };  

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box mr={2} >
        <Avatar
        sx={{ width: 200, height: 200, marginRight: 20 }}
        alt="User Avatar"
        src={avatarUrl|| user.profile_url}
      />
      </Box>
      <Box>
      {user && (
          <>
        <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>User: {user.username}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>Email: {user.email}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>First Name: {user.first_name}</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>Last Name: {user.last_name}</Typography>
        </>
        )}
        <TextField sx={{ mb: 3 }}
          label="Avatar URL"
          variant="outlined"
          value={avatarUrl}
          onChange={handleAvatarChange}
          fullWidth
        />
        <TextField sx={{ mb: 3 }}
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
        />
        <Button variant="contained" onClick={() => handleSubmit(description, avatarUrl)}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default MyProfile;
