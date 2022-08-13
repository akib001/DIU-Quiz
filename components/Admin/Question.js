import {
  Autocomplete,
  Box,
  Grid,
  TextField,
} from '@mui/material';
import React from 'react';

const Question = () => {
  const answersArray = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];

  return (
    <Box sx={{my:'1rem', p:'1rem', border: '1px solid #555', borderRadius: '10px'}}>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <TextField
            id="question"
            name="question"
            label="Question"
            variant="outlined"
            fullWidth
          
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="answer-1"
            label="Answer 1"
            variant="outlined"
            fullWidth
          
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="answer-2"
            label="Answer 2"
            variant="outlined"
            fullWidth
          
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="answer-3"
            label="Answer 3"
            variant="outlined"
            fullWidth
          
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="answer-4"
            label="Answer 4"
            variant="outlined"
            fullWidth
          
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="select-correct-answer"
            fullWidth
            sx={{mb: '0.5rem'}}
            options={answersArray}
            renderInput={(params) => (
              <TextField {...params} label="Select Correct Answer" />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Question;
