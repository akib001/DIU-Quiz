import {
    Container,
    Divider,
    Grid,
    Typography,
  } from '@mui/material';
  import { Box } from '@mui/system';
  import React, { useEffect, useState } from 'react';
//   import questions from '../../../components/data/questions.json';
  import styled from '@emotion/styled';
//   import answersData from '../../../components/data/answersData.json'
  
  const StyledBox = styled(Box)(({ theme }) => ({
    padding: '1rem 1rem 1rem 2rem',
    border: '1px solid #615d5c',
    borderRadius: '13px',
    '&:hover': {
      boxShadow: ' 0 3px 10px #888',
    },
  }));
  
  const ResultsPreview = ({results}) => {
    // const [questionIndex, setQuestionIndex] = useState(0);
    // const [answers, setAnswers] = useState([]);
  
    return (
      <Container
        sx={{
          display: 'flex',
          height: 'calc(100vh - 105px)',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: '2rem' }}>
            {results.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Typography variant="h6" gutterBottom>
              Obtained Mark: {results.obtainedMark}/{results.totalMark}
            </Typography>
          </Box>
          {/* Question */}
          <Divider />
  
          {results.answerScript.map((qItem, index) => (
            <div key={index}>
              <Typography variant="h5" gutterBottom sx={{pl: '1rem', mt: '1rem' }}>
                {qItem.questionText}
              </Typography>
              <Grid container spacing={2} sx={{ padding: '1rem' }}>
                <Grid item xs={12} md={6}>
                  <StyledBox sx={{ 
                      backgroundColor: qItem.answer1 == qItem.userAnswer ? qItem.userAnswer == qItem[qItem.correctAnswer] ?  '#388e3c' : 'red' : qItem.answer1 == qItem[qItem.correctAnswer] ? '#388e3c' : 'white'

                   }}>
                    <Typography variant="body1">
                      {qItem.answer1  }
                    </Typography>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledBox sx={{ 
                      backgroundColor: qItem.answer2 == qItem.userAnswer ? qItem.userAnswer == qItem[qItem.correctAnswer] ?  '#388e3c' : 'red' : qItem.answer2 == qItem[qItem.correctAnswer] ? '#388e3c' : 'white'
  
                   }}>
                    <Typography variant="body1">
                      {qItem.answer2}
                    </Typography>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledBox sx={{ 
                      backgroundColor: qItem.answer3 == qItem.userAnswer ? qItem.userAnswer == qItem[qItem.correctAnswer] ?  '#388e3c' : 'red' : qItem.answer3 == qItem[qItem.correctAnswer] ? '#388e3c' : 'white'
  
                   }}>
                    <Typography variant="body1">
                      {qItem.answer3}
                    </Typography>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledBox sx={{ 
                      backgroundColor: qItem.answer4 == qItem.userAnswer ? qItem.userAnswer == qItem[qItem.correctAnswer] ?  '#388e3c' : 'red' : qItem.answer4 == qItem[qItem.correctAnswer] ? '#388e3c' : 'white'
                   }}>
                    <Typography variant="body1">
                      {qItem.answer4}
                    </Typography>
                  </StyledBox>
                </Grid>
              </Grid>
            </div>
          ))}
        </Box>
      </Container>
    );
  };
  
  export default ResultsPreview;