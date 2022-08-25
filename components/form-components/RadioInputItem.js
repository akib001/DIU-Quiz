import styled from '@emotion/styled';
import { FormControlLabel, Grid, Radio } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: '4px 4px 6px 8px',
  border: '1px solid #615d5c',
  borderRadius: '13px',
  '&:hover': {
    boxShadow: ' 0 3px 10px #888',

  },
}));

const RadioInputItem = ({ answer }) => {
  return (
    <Grid item xs={12} md={6}>
      <StyledBox>
        <FormControlLabel
          value={answer}
          control={<Radio />}
          label={answer}
          sx={{ width: '100%' }}
        />
      </StyledBox>
    </Grid>
  );
};

export default RadioInputItem;
