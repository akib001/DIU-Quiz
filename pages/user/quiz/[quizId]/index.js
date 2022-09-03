import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const index = () => {
  return (
    <div>index</div>
  )
}

export async function getStaticProps(context) {
    const quizId = context.params.quizId;
  
    const fetchedQuiz = axios.get('', {
        headers: { Authorization: 'Bearer ' + stateToken },
      })

      const selectedPlace = data.data;
  
    return {
      props: {
        selectedPlace: selectedPlace,
      },
    };
}

export default index
