import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const options = [
  {
    label: "Answer 1",
    value: "answer1",
  },
  {
    label: "Answer 2",
    value: "answer2",
  },
  {
    label: "Answer 3",
    value: "answer3",
  },
  {
    label: "Answer 4",
    value: "answer4",
  },
];

export const FormInputDropdown = ({
  name,
  control,
  label,
}) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel >{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error }, }) => (
          <Select  error={!!error} fullWidth variant="outlined" label={label} onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        rules={{ required: "Please select correct answer"}}
        control={control}
        name={name}
        defaultValue=""
      />
    </FormControl>
  );
};


{/* <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl> */}
