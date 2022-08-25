import {
  Button,
  ButtonGroup,
  Card,
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
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Router from "next/router";
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import Countdown from 'react-countdown';
import React, { useEffect, useState } from 'react';
import questions from '../../../components/data/questions.json';
import CountdownTimer from '../../../components/user/CountdownTimer';
import RadioInputItem from '../../../components/form-components/RadioInputItem';
import { useBeforeUnload } from "react-use";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isConfirm, setIsConfirm] = useState(true);
  const [message, setMessage] = useState('Are you sure you want to leave');

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const router = useRouter();

  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const handler = () => {
      if (isConfirm && !window.confirm(message)) {
        console.log('router rejected')
        throw "Route Canceled";
      }
    };

    Router.events.on("beforeHistoryChange", handler);

    return () => {
      Router.events.off("beforeHistoryChange", handler);
    };  
  }, [isConfirm, message]);

  const handleClose = () => {
    setOpen(false);
  };

  const submitQuizHandler = () => {
    setOpen(false);
    setIsConfirm(false);
    router.push('/result')
  }

  const finishHandler = () => {
    console.log(answers);
    setOpen(true);
  }

  const timeoutAutoSubmitHandler = () => {
    console.log(answers);
    setIsConfirm(false);
    router.push('/result')
  }

  let previousButton = (
    <Button
      variant="outlined"
      onClick={() => setQuestionIndex((prev) => prev - 1)}
    >
      Previous
    </Button>
  );

  if (questionIndex == 0) {
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

  if (questionIndex == questions.questions.length - 1) {
    nextButton = (
      <Button variant="outlined" onClick={finishHandler}>
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
    <Container
      sx={{
        display: 'flex',
        height: 'calc(100vh - 105px)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          {questions.quizTitle}
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <span>Time Remaing: </span> <CountdownTimer setOpen={setOpen} timeoutAutoSubmitHandler={timeoutAutoSubmitHandler} />    
        </Box>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
          Total Answerd: {answers.length}/{questions.questions.length}
        </Typography>
        {/* Question */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ textAlign: 'center' }}
          >
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', textDecoration: 'bold' }}>
              {questions.questions[questionIndex].question}
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
                answer={questions.questions[questionIndex].answer1}
              />
              <RadioInputItem
                answer={questions.questions[questionIndex].answer2}
              />
              <RadioInputItem
                answer={questions.questions[questionIndex].answer3}
              />
              <RadioInputItem
                answer={questions.questions[questionIndex].answer4}
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
            {questions.questions.map((item, index) => (
              <Button
                key={index}
                sx={
                  index == questionIndex
                    ? { backgroundColor: 'gray', color: 'black' }
                    : answers[index]?.answer
                    ? { backgroundColor: 'dodgerBlue', color: 'white' }
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
            You can not re-attemp this exam. Please think before click on finish button.
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
    </Container>
  );
};

export default Quiz;