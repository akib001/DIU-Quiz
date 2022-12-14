import {
    Button,
    ButtonGroup,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    RadioGroup,
    Typography,
    IconButton
  } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import React, {useCallback, useEffect, useState} from 'react';
import CountdownTimer from './CountdownTimer';
import RadioInputItem from '../form-components/RadioInputItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ResultsPreview from './ResultsPreview';
import { useSnackbar } from 'notistack';
  
  
  const QuizPopup = ({quizData, handleOpenQuizModalClose, mutate}) => {
    const { enqueueSnackbar } = useSnackbar();

    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [cancelQuizPopup, setCancelQuizPopup] = useState(false);
    const [isAutoSubmit, setIsAutoSubmit] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [results, setResults] = React.useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      if(isAutoSubmit) {
        submitQuizHandler();
      }
    }, [isAutoSubmit, submitQuizHandler])

  
    const submitQuizHandler = useCallback(async () => {
      setOpen(false);
      if(cancelQuizPopup) {
        setCancelQuizPopup(false);
        handleOpenQuizModalClose();
      }

      let inputedAnswers = answers;
      quizData.questions?.map((item, index) => {
        if(!inputedAnswers[index]) {
          console.log('alsdf', index);

          inputedAnswers.push({ qIndex: index, answer: 'empty' })
        }
      })


      try {
        const { data, error } = await axios.post(`/quiz/attempt-quiz`, {
          answers: inputedAnswers,
          duration: 10,
          quizId: quizData._id
        });
        console.log('data.results', data.results);
        setResults(data.results);
        enqueueSnackbar('Quiz submitted Successfully!', {variant: 'success'});
        mutate();
      } catch (error) {
        enqueueSnackbar(error.message, {variant: 'error'});
        console.log(error);
      }
    }, [answers, cancelQuizPopup, handleOpenQuizModalClose, mutate, quizData]) 

    const quizCancelHandler = () => {
      if(results) {
        console.log('calling mutate function')
        handleOpenQuizModalClose();
      }
      console.log(answers);
      setCancelQuizPopup(true);
      setOpen(true);
    }
  
    const quizFinishHandler = () => {
      console.log(answers);
      setOpen(true);
    }

    let previousButton = (
      <Button
        variant="outlined"
        onClick={() => setQuestionIndex((prev) => prev - 1)}
      >
        Previous
      </Button>
    );
  
    if (questionIndex === 0) {
      previousButton = null;
    }
  
    let nextButton = (
      <Button
        variant="outlined"
        onClick={() => setQuestionIndex((prev) => prev + 1)}
      >
        Next
      </Button>
    );
  
    if (questionIndex === quizData.questions.length - 1) {
      nextButton = (
        <Button variant="outlined" onClick={quizFinishHandler}>
          Finish
        </Button>
      );
    }

    const answerSaveHandler = (e, questionIndex) => {
      if (!answers[questionIndex]) {
        setAnswers((prevState) => [
          ...prevState,
          { qIndex: questionIndex, answer: e.target.value },
        ]);
      } else {
        setAnswers((prevState) => {
          const answersCp = [...prevState];
          answersCp[questionIndex] = {
            qIndex: questionIndex,
            answer: e.target.value,
          };
          return answersCp;
        });
      }
    };
  
    return (
      <>
      <DialogTitle
          id="responsive-dialog-title"
          sx={{ borderBottom: '1px solid #333' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box><Typography variant='h5'>Attempt Quiz</Typography></Box>
            <Box>
              <IconButton aria-label="delete" onClick={quizCancelHandler}>
                <CancelIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        {!results ? <Container
        sx={{
          display: 'flex',
          height: 'calc(100vh - 105px)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            {quizData.title}
          </Typography>
          <Box sx={{display: 'flex', justifyContent:'space-evenly'}}>
            <CountdownTimer duration={quizData.duration} setOpen={setOpen} setIsAutoSubmit={setIsAutoSubmit} />
          <Typography variant="h5" gutterBottom>
            Total Answerd: {answers.length}/{quizData.questions.length}
          </Typography>
          </Box>
          {/* Question */}
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ textAlign: 'center' }}
            >
              <Typography variant="h5" gutterBottom sx={{ mt: '2rem', color: '#333', textAlign: 'center', textDecoration: 'bold' }}>
                {quizData.questions[questionIndex].questionText}
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onClick={(e) => answerSaveHandler(e, questionIndex)}
              value={
                answers[questionIndex]?.answer
                  ? answers[questionIndex].answer
                  : ''
              }
            >
              <Grid container spacing={2} sx={{ padding: '1rem' }}>
                <RadioInputItem
                  answer={quizData.questions[questionIndex].answer1}
                />
                <RadioInputItem
                  answer={quizData.questions[questionIndex].answer2}
                />
                <RadioInputItem
                  answer={quizData.questions[questionIndex].answer3}
                />
                <RadioInputItem
                  answer={quizData.questions[questionIndex].answer4}
                />
              </Grid>
            </RadioGroup>
          </FormControl>
  
          {/* Previous and Next/Finish Button */}
          <Box
            sx={{ px: '1rem', display: 'flex', justifyContent: 'space-between' }}
          >
            {previousButton}
            {nextButton}
          </Box>
  
          {/* Question number buttons */}
  
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup size="small" aria-label="small button group">
              {quizData?.questions?.map((item, index) => (
                <Button
                  key={index}
                  sx={
                    index === questionIndex
                      ? { backgroundColor: 'dodgerBlue', color: 'white', "&:hover": {color: 'white', backgroundColor: '#607d8b'}  }
                      : answers[index]?.answer
                      ? { backgroundColor: '#bbdefb', color: 'black', "&:hover": {color: 'black', backgroundColor: '#bdbdbd'} }
                      : {}
                  }
                  onClick={() => setQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Box>

        {/* Finish Dialouge  */}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Are you sure you want to finish the exam?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can not re-attempt this exam. Please think before click on finish button.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={submitQuizHandler} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Container> : <ResultsPreview results={results} />}
      
        <DialogActions sx={{ borderTop: '1px solid #333' }}>
        <Button variant="outlined" color="error" onClick={quizCancelHandler}>
          Cancel
        </Button>
        {!results && <Button variant="contained" onClick={quizFinishHandler} endIcon={<TaskAltIcon />}>
          Finish Quiz
        </Button>}
        
      </DialogActions>
      </>
    );
  };
  
  export default QuizPopup;

  