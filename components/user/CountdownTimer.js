import { Typography } from '@mui/material';
import React from 'react'
import Countdown from "react-countdown";
import { memo } from 'react';

// eslint-disable-next-line react/display-name
const CountdownTimer = memo(({setOpen, timeoutAutoSubmitHandler}) => {
  const timeCompleteHandler = () => {
    console.log('time complete')
    // setOpen(true);
    timeoutAutoSubmitHandler();
  }

  return (
    <Typography variant="h5" gutterBottom>
        {/* Timer: 1: 30: 13 */}
        <Countdown onComplete={timeCompleteHandler} date={Date.now() + (10*1000)} />
      </Typography>
  )
});

export default CountdownTimer;