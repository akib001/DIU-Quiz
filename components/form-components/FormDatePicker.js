import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormDatePicker = ({ name, control, label, defaultValue = null }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: { value: 'true', message: 'This field is required' },
        }}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
          formState,
        }) => (
          <DateTimePicker
            helperText={error ? error.message : null}
            error={!!error}
            errorText="This is an error message."
            ref={ref}
            label={label}
            renderInput={(params) => (
              <TextField
                fullWidth
                helperText={error ? error.message : null}
                error={!!error}
                {...params}
                sx={{
                  '& .MuiFormHelperText-root': {
                    color: '#D32F2F',
                  },
                  '& .Mui-error":': {
                    color: '#D32F2F',
                  },
                }}
              />
            )}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormDatePicker;
