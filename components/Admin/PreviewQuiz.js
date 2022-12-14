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
  } from '@mui/material';
//   import Router from "next/router";
//   import { useRouter } from 'next/router';
  import { Box } from '@mui/system';
  import React, { useEffect, useState } from 'react';
//   import questions from '../../../components/data/questions.json';
  import CountdownTimer from '../user/CountdownTimer';
  import RadioInputItem from '../form-components/RadioInputItem';
//   import { useBeforeUnload } from "react-use";
  import { useTheme } from '@mui/material/styles';
  import useMediaQuery from '@mui/material/useMediaQuery';
  
  
  const PreviewQuiz = ({quizData}) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    // const [isConfirm, setIsConfirm] = useState(true);
    // const [message, setMessage] = useState('Are you sure you want to leave');
  
    // const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  
    // const router = useRouter();
  
    // useBeforeUnload(isConfirm, message);
  
    // useEffect(() => {
    //   const handler = () => {
    //     if (isConfirm && !window.confirm(message)) {
    //       console.log('router rejected')
    //       throw "Route Canceled";
    //     }
    //   };
  
    //   Router.events.on("beforeHistoryChange", handler);
  
    //   return () => {
    //     Router.events.off("beforeHistoryChange", handler);
    //   };  
    // }, [isConfirm, message]);
  
    // const handleClose = () => {
    //   setOpen(false);
    // };
  
    // const submitQuizHandler = () => {
    //   setOpen(false);
    //   setIsConfirm(false);
    //   router.push('/user/quiz/result')
    // }
  
    // const finishHandler = () => {
    //   console.log(answers);
    //   setOpen(true);
    // }
  
    // const timeoutAutoSubmitHandler = () => {
    //   console.log(answers);
    //   setIsConfirm(false);
    //   router.push('/result')
    // }
  
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
  
    if (questionIndex == quizData.questions.length - 1) {
      nextButton = (
        <Button variant="outlined">
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
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: '2rem', mb: '4rem' }}>
            {quizData.title}
          </Typography>
          <Box sx={{display: 'flex', justifyContent:'space-evenly'}}>
            <CountdownTimer duration={quizData.duration} />    
          <Typography variant="h6" gutterBottom>
            Total Answerd: {answers.length}/{quizData.questions.length}
          </Typography>
          </Box>
          {/* Question */}
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ textAlign: 'center' }}
            >
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', textDecoration: 'bold' }}>
                {quizData.questions[questionIndex].question}
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
              {quizData.questions.map((item, index) => (
                <Button
                  key={index}
                  sx={
                    index == questionIndex
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
{/*   
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
        </Dialog> */}
      </Container>
    );
  };
  
  export default PreviewQuiz;
  