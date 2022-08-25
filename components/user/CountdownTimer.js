import { Typography } from '@mui/material';
import React from 'react';
import Countdown from 'react-countdown';
import { memo } from 'react';
import { Box } from '@mui/system';

// eslint-disable-next-line react/display-name
const CountdownTimer = memo(({ duration, timeoutAutoSubmitHandler }) => {
  const timeCompleteHandler = () => {
    console.log('time complete');
    // setOpen(true);
    timeoutAutoSubmitHandler();
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return timeoutAutoSubmitHandler();
    } else {
      // Render a countdown
      return (
          <Typography variant="h6">
            Time Left: {minutes}:{seconds}
          </Typography>    
      );
    }
  };

  return (
    <Typography variant="h5" gutterBottom>
      {/* Timer: 1: 30: 13 */}
      <Countdown date={Date.now() + duration * 60 * 1000} renderer={renderer} />
    </Typography>
  );
});

export default CountdownTimer;
