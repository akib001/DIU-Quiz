import { Button, TextField } from '@mui/material';
import { Box, fontStyle } from '@mui/system';
import React, { useState } from 'react';
import Question from '../../components/Admin/Question';
import BackspaceIcon from '@mui/icons-material/Backspace';
import AddCardIcon from '@mui/icons-material/AddCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Controller, FormProvider, useForm  } from "react-hook-form";
import FormInputText from '../../components/form-components/FormInputText';

const CreateQuiz = () => {
  const [questionCountArr, setquestionCountArr] = useState(['q']);

  const defaultValues = {
    textValue: "",
  };

  const { register, handleSubmit, control, errors } = useForm({defaultValues});  

  const onSubmitHandler = (data) => console.log(data);

  // increse question count array 
  const addQuestionHandler = () => {
    setquestionCountArr(prev => [...prev, `q`])
  }

  // decrese question count array 
  const removeQuestionHandler = () => {
    const questionCountArrCopy = [...questionCountArr]
    questionCountArrCopy.pop();
    setquestionCountArr(questionCountArrCopy);
  }

  let questionContent = questionCountArr.map((element, index) => {
    return <Question key={index} />
  })


  return (
    <Box
      component="form"
      container="true"
    > 
       <FormInputText
        name="textValue" control={control} label="Text Input"
       />
 
      {questionContent}
      <Box component="div" sx={{my: '1.5rem', display:'flex', justifyContent: 'center'}}>
        <Button
          variant="outlined"
          sx={{ px: '2rem', mr: '2rem' }}
          color="error"
          startIcon={<BackspaceIcon />}
          onClick={removeQuestionHandler}
        >
          Delete Question
        </Button>
        <Button
          variant="outlined"
          sx={{ px: '2rem' }}
          startIcon={<AddCardIcon />}
          onClick={addQuestionHandler}
        >
          Add Question
        </Button>
      </Box>
      <Button startIcon={<CheckCircleOutlineIcon />} onClick={handleSubmit(onSubmitHandler)} fullWidth variant="outlined">Submit Quiz</Button>
    </Box>
  );
};

export default CreateQuiz;
