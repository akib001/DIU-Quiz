import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import FormInputText from '../../components/form-components/FormInputText';
import { FormInputDropdown } from '../../components/form-components/FormInputDropdown';
import FormInputNumber from '../../components/form-components/FormInputNumber';
import FormDatePicker from '../../components/form-components/FormDatePicker';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const CreateQuiz = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const [watchedMarkField, setWatchedMarkField] = useState('');
  const [totalMark, setTotalMark] = useState(0);

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const dispatch = useDispatch();

  const stateToken = useSelector((state) => state.profile.token);

  const addNewQuestion = () => appendQuestion();

  const onSubmitHandler = async (data) => {
    console.log(data);
    const response = await axios.post('/quiz/create-quiz', data, {
      headers: { Authorization: 'Bearer ' + stateToken },
    });
    console.log(response);
  };

  const watchedFields = useWatch({control, name: 'questions'});

  React.useEffect(() => {
    // let array = Object.values(watchedFields || {});
    let sumOfMark = 0;
    for (const key in watchedFields) {
      if(watchedFields[key].mark) {
        
        const number = +watchedFields[key].mark;
        sumOfMark += number;
        setTotalMark(sumOfMark);
      }
    }
  }, [watchedFields]);


  return (
    <Box component="form" container="true">
      <Stack spacing={3}>
        <Typography>{totalMark}</Typography>
        <FormInputText name="title" control={control} label="Quiz Title" />
        <FormInputNumber
          name="duration"
          control={control}
          label="Duration in Minutes"
        />
        <Grid container>
          <Grid item xs={12} md={6}>
            <FormDatePicker
              name="startTime"
              control={control}
              label="Quiz Start Time"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormDatePicker
              name="endTime"
              control={control}
              label="Quiz End Time"
            />
          </Grid>
        </Grid>
      </Stack>
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
                name={`questions.${index}.questionText`}
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
            <Grid item xs={4}>
              <FormInputDropdown
                name={`questions.${index}.correctAnswer`}
                control={control}
                label="Correct Answer"
              />
            </Grid>
            <Grid item xs={4}>
              <FormInputNumber
                name={`questions.${index}.mark`}
                control={control}
                label="Mark"
              />
            </Grid>
            <Grid item xs={4}>
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
