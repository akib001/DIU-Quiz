import { Button, Grid, TextField } from '@mui/material';
import { Box, fontStyle } from '@mui/system';
import React, { useState } from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import FormInputText from '../../components/form-components/FormInputText';
import { FormInputDropdown } from '../../components/form-components/FormInputDropdown';

const CreateQuiz = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const addNewQuestion = () => appendQuestion();

  const onSubmitHandler = (data) => console.log(data);

  // console.log(errors.textValue);

  return (
    <Box component="form" container="true">
      <FormInputText name="quizTitle" control={control} label="Quiz Title" />
      {questions.map((field, index) => (
        <Box
          key={field.id}
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
            <Grid item xs={6}>
              <FormInputDropdown
                name={`questions.${index}.correctAnswer`}
                control={control}
                label="Correct Answer"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ py: '0.93rem' }}
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={() => removeQuestion(index)}
              >
                Delete Question
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Box
        component="div"
        sx={{ my: '1.5rem', display: 'flex', justifyContent: 'center' }}
      >
        <Button
          variant="outlined"
          sx={{ px: '2rem' }}
          startIcon={<AddCardIcon />}
          onClick={addNewQuestion}
        >
          Add Question
        </Button>
      </Box>
      <Button
        startIcon={<CheckCircleOutlineIcon />}
        onClick={handleSubmit(onSubmitHandler)}
        fullWidth
        variant="outlined"
      >
        Submit Quiz
      </Button>
    </Box>
  );
};

export default CreateQuiz;
