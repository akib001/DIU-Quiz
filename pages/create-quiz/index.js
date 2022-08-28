import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
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
import SaveIcon from '@mui/icons-material/Save';
import AirplayIcon from '@mui/icons-material/Airplay';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const CreateQuiz = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [totalMark, setTotalMark] = useState(0);
  const [status, setStatus] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

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
    console.log("open " + open)
    console.log("status " + status)
    if (open === false) {
      setOpen(true);
    }

    let response;
    // ok, publish button action
    if (status && open === true) {
      console.log(data);
      response = await axios.post('/quiz/create-quiz', {...data, totalMark: totalMark}, {
        headers: { Authorization: 'Bearer ' + stateToken },
      });
      handleClose();
    }

    if(!status && open === true) {
      response = await axios.post('/quiz/create-quiz', {...data, totalMark: totalMark}, {
        headers: { Authorization: 'Bearer ' + stateToken },
      });
      console.log(response);
      console.log('save');
      handleClose();
    }
  };

  const previewHandler = () => {
    console.log('preview Handler')
  }

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
    <Box component="form" container="true">
      <Stack spacing={3}>
        <FormInputText name="title" control={control} label="Quiz Title" />
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
              defaultValue="Hello World"
              type="number"
              value={totalMark}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
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
          </Grid> */}
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
        <FormStatusDropdown name={'status'} control={control} label="Status" />
        {status ? (
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
        )}
      </Box>
      {/* Publish Confirm Dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Are you sure you want to publish this quiz?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {status ? "Because once you publish this quiz you won't be able to update it. Please preview it before make it active." : "You can edit the quiz anytime. Click on save quiz"}
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={previewHandler}>
            Preview
          </Button>
          <Button autoFocus onClick={handleSubmit(onSubmitHandler)}>
            {status ? 'Ok, Publish' : 'Save Quiz'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Quiz */}
      {/* <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handlePreviewClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Are you sure you want to publish this quiz?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Because once you publish this quiz you won't be able to update it.
            Please preview it before make it active.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePreviewClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleSubmit(onSubmitHandler)}>
            Ok, Publish
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default CreateQuiz;
