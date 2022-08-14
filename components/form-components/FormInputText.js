import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormInputText = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      rules={{ required: "field is required" , minLength: { value: 4, message: 'Quiz title must be more than 4 character'} }}
      render={({
        field: { onChange, value},
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormInputText;