import { Typography } from '@mui/material';
import React from 'react'
import Countdown from "react-countdown";
import { memo } from 'react';

// eslint-disable-next-line react/display-name
const Coundown = memo(() => {
  return (
    <Typography variant="h5" gutterBottom>
        {/* Timer: 1: 30: 13 */}
        <Countdown date={Date.now() + (30*60*1000)} />
      </Typography>
  )
});

export default Coundown;