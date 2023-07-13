import {React, useState} from "react";
import { Box, ThemeProvider, Avatar, Paper, Stack, Typography, Rating, Button} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { grey } from "@mui/material/colors";
import theme from "../theme/mainTheme";
import useMyreviews from "./useMyReviews";
import { IMAGE_BASE_URL } from "../utils/myApiBuilder";

function MyReviews() {
  
  const { state, setReviews, handleSubmit } = useMyreviews();
  const [error, setError] = useState("");

  console.log("state ", state);

  const handleReviewChange = (event, reviewId) => {
    const updatedReview = event.target.value;
    setReviews(reviewId, updatedReview);
    };
  
    const handleEdit = (reviewId, updatedReview) => {
      if (updatedReview.trim() !== "") {
        handleSubmit(reviewId, updatedReview);
        setError("");
      } else {
        setError("Review cannot be empty!");
      }
    };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            overflow: "auto",
            flexGrow: 1,
            flexShrink: 0,
          }}
        >
          <Paper variant="outlined" component="div" sx={{ display: 'flex', flexDirection: 'column', mt: 2, p: 2, width: '100%' }}>
            {state.movies.map((m) => (
              <Box key={m.id} sx={{ display: 'flex', flexDirection: 'row', p: 2, gap: 2 }}>
                <Box sx={{ display: 'inline-flex', alignSelf: 'flex-start', width: '10%', flexGrow: 1 }} component="div">
                  <img width="100%" height="100%" alt={m.title} src={IMAGE_BASE_URL + m.poster_path} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ pl: 1 }} component="div">
                      {m.original_title}
                    </Typography>
                    <Typography variant="span" sx={{ fontSize: 14, color: grey[600], ml: 1 }}>
                      {new Date(m.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Typography>
                  </Box>

                  <Paper elevation={0} sx={{  width: '100%', bgcolor: 'rgb(243, 242, 241)', p: 2, mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={m.profile_url} alt={m.username}></Avatar>
                    <Typography variant="span" sx={{ fontWeight: 600, ml: 1 }}>{m.username}</Typography>
                  </Box>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="span" sx={{ fontSize: 14, color: grey[600] }}>
                        {new Date(m.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </Typography>
                      <Box flexGrow={1} />
                      <Rating
                        value={parseFloat(m.rating)}
                        readOnly
                        precision={0.1}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                    </Stack>
                    <Paper sx={{ width: '100%' }}>
                      <textarea
                        value={m.review}
                        onChange={(event) => handleReviewChange(event, m.id)}
                        style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                      />
                    </Paper>
                                       
                  </Paper>
                  <Button onClick={() => handleEdit(m.id, m.review)}>Edit</Button>
                </Box>
              </Box>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {error && (
                <Typography variant="span" sx={{ color: "red", mt: 1,alignItems: 'center' }}>
                  {error}
                </Typography>
              )}
            </Box>
            
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


export default MyReviews;
