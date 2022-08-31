import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormInputNumber = ({ name, control, label, defaultValue = '' }) => {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: {value: 'true', message: 'This field is required'}, pattern:{value: /^[0-9+-]+$/, message: 'Please type number only'} }}
      render={({
        field: { onChange, value},
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={onChange}
          value={value}
          fullWidth
          type="number"
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormInputNumber;