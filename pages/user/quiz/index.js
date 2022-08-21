import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Countdown from "react-countdown";
import React, { useState } from 'react';
import questions from '../../../components/data/questions.json';
import Coundown from '../../../components/user/Coundown';

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

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
      <Button variant="outlined" onClick={() => console.log(answers)}>
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
    <Container>
      <Typography variant="h4" gutterBottom>
        {questions.quizTitle}
      </Typography>
      {/* <Typography variant="h5" gutterBottom>
        <Countdown date={Date.now() + (questions.Duration*60*1000)} />
      </Typography> */}
      <Coundown/>
      <Typography variant="h5" gutterBottom>
        Total Answerd: {answers.length}/{questions.questions.length}
      </Typography>
      {/* Question */}
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          {questions.questions[questionIndex].question}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onClick={(e) => answerSaveHandler(e, questionIndex)}
          value={
            answers[questionIndex]?.answer ? answers[questionIndex].answer : ''
          }
        >
          <FormControlLabel
            value={questions.questions[questionIndex].answer1}
            control={<Radio />}
            label={questions.questions[questionIndex].answer1}
          />
          <FormControlLabel
            value={questions.questions[questionIndex].answer2}
            control={<Radio />}
            label={questions.questions[questionIndex].answer2}
          />
          <FormControlLabel
            value={questions.questions[questionIndex].answer3}
            control={<Radio />}
            label={questions.questions[questionIndex].answer3}
          />
          <FormControlLabel
            value={questions.questions[questionIndex].answer4}
            control={<Radio />}
            label={questions.questions[questionIndex].answer4}
          />
        </RadioGroup>
      </FormControl>

      {/* Previous and Next/Finish Button */}
      <Box>
        {previousButton}
        {nextButton}
      </Box>

      {/* Question number buttons */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
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
    </Container>
  );
};

export default Quiz;
