import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProfile() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const userId = 1;

  useEffect(() => {
    axios
      .get(`/api/users/${userId}`)
      .then((response) => {
        const { profile_description, profile_url, ...userData } = response.data;
        setDescription(profile_description);
        setAvatarUrl(profile_url);
        setUser(userData);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleAvatarChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    const updatedUser = {
        description: description,
        avatarUrl: avatarUrl,
      };
    
      axios
        .patch(`/api/users/${userId}`, updatedUser)
        .then((response) => {
          console.log("User updated successfully");
          // Perform any necessary state updates or actions
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          // Handle the error or display an error message
        });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box mr={2} >
        <Avatar
        sx={{ width: 200, height: 200, marginRight: 20 }}
        alt="User Avatar"
        src={avatarUrl}
      />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>User: {user.username}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>Email: {user.email}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>First Name: {user.first_name}</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>Last Name: {user.last_name}</Typography>
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
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default MyProfile;
