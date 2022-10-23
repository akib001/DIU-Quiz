import React, { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import FormInputText from '../../components/form-components/FormInputText';
import { FormInputDropdown } from '../../components/form-components/FormInputDropdown';
import FormInputNumber from '../../components/form-components/FormInputNumber';
import FormDatePicker from '../../components/form-components/FormDatePicker';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FormStatusDropdown } from '../../components/form-components/FormStatusDropdown';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useTheme } from '@mui/material/styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

const EditQuizPopup = ({ editQuizData, setOpenEditModal }) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: editQuizData,
  });

  const router = useRouter();

  const [totalMark, setTotalMark] = useState(0);
  const [status, setStatus] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [quizData, setQuizData] = React.useState('');

  console.log(editQuizData);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  // use field array
  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });


  const addNewQuestion = () => appendQuestion();

  const onSubmitHandler = async (data) => {
    try {
      const {data: response, error} = await axios.put(
        `/quiz/update/${editQuizData._id}`,
        { ...data, totalMark: totalMark },
        );
        enqueueSnackbar(response?.message, {variant: 'success'});
      setOpenEditModal(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.response?.data?.message, {variant: 'error'});
      setOpenEditModal(false);
    }
  };

  const resetHandler = () => {
    reset({
      title: '',
      // questions: '',
      // TODO: totalMark problem
      totalMark: '',
      status: false,
      startTime: null,
      endTime: null,
      duration: 0,
    });
  };

  const previewHandler = () => {
    console.log('preview Handler');
    setPreviewOpen(true);
  };

  const watchedFields = useWatch({ control, name: 'questions' });
  const watchedStatusField = useWatch({ control, name: 'status' });

  React.useEffect(() => {
    // let array = Object.values(watchedFields || {});
    let sumOfMark = 0;
    for (const key in watchedFields) {
      if (watchedFields[key].mark) {
        const number = +watchedFields[key].mark;
        sumOfMark += number;
        setTotalMark(sumOfMark);
      }
    }
  }, [watchedFields]);

  React.useEffect(() => {
    setStatus(watchedStatusField);
  }, [watchedStatusField]);

  return (
    <>
      <DialogContent>
        <Box component="form" container="true" sx={{ my: '2rem' }}>
          <Stack spacing={3}>
            <FormInputText
              name="title"
              control={control}
              label="Quiz Title"
              defaultValue={editQuizData.title}
            />
            <Grid container>
              <Grid item xs={12} md={6}>
                <FormInputNumber
                  name="duration"
                  control={control}
                  label="Duration in Minutes"
                />
                <Box sx={{ mb: '1.8rem' }}></Box>
              </Grid>
              {/* TODO: error controlled issue */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Total Mark (Auto Calculate)"
                  defaultValue={0}
                  type="number"
                  value={totalMark}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
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
          <Box sx={{ display: 'flex' }}>
            {/* <Button
          startIcon={<AirplayIcon />}
          onClick={(event) => {handleSubmit(onSubmitHandler(event))}}
          fullWidth
          variant="outlined"
          sx={{ mr: '2rem' }}
        >
          Preview
        </Button> */}
            <FormStatusDropdown
              name={'status'}
              control={control}
              label="Status"
            />
            <Button
              startIcon={<PublishedWithChangesIcon />}
              onClick={resetHandler}
              fullWidth
              variant="outlined"
            >
              Reset
            </Button>
            {/* {status ? (
          <Button
            startIcon={<PublishedWithChangesIcon />}
            onClick={handleSubmit(onSubmitHandler)}
            fullWidth
            variant="outlined"
          >
            Publish Quiz
          </Button>
        ) : (
          <Button
            startIcon={<SaveIcon />}
            onClick={handleSubmit(onSubmitHandler)}
            fullWidth
            variant="outlined"
          >
            Save Quiz
          </Button>
        )} */}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid #333' }}>
        <Button variant="outlined" color="error" onClick={() => setOpenEditModal(false)}>
          Cancel
        </Button>
        <Button variant="contained" endIcon={<TaskAltIcon />} onClick={handleSubmit(onSubmitHandler)}>
          ConFirm Edit
        </Button>
      </DialogActions>
    </>
  );
};

export default EditQuizPopup;
