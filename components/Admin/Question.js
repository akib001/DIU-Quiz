import { Autocomplete, Box, Grid, TextField } from '@mui/material';
import React from 'react';
import { FormInputDropdown } from '../form-components/FormInputDropdown';
import FormInputText from '../form-components/FormInputText';

const Question = ({ index, control, field }) => {
  const answersArray = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
  return (
    <Box
      sx={{
        my: '1rem',
        p: '1rem',
        border: '1px solid #555',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <FormInputText
          field={field}
            name={`questions.${index}.question`}
            control={control}
            label="Question"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInputText
            name={`questions.${index}.answer1`}
            control={control}
            label="Answer 1"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInputText
            name={`questions.${index}.answer2`}
            control={control}
            label="Answer 2"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInputText
            name={`questions.${index}.answer3`}
            control={control}
            label="Answer 3"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormInputText
            name={`questions.${index}.answer4`}
            control={control}
            label="Answer 4"
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Autocomplete
            disablePortal
            id="select-correct-answer"
            fullWidth
            sx={{ mb: '0.5rem' }}
            options={answersArray}
            renderInput={(params) => (
              <TextField {...params} label="Select Correct Answer" />
            )}
          /> */}
          {/* <FormInputDropdown
          name={`correctAnswer-${index}`}
          control={control}
          label='Correct Answer'
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Question;
