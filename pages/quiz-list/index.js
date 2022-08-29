import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useSWR, { mutate, trigger } from 'swr';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { Button } from '@mui/material';

function createData(
  id,
  title,
  totalMark,
  totalQuestion,
  teacher,
  duration,
  startTime,
  endTime,
  status,
  createdAt,
  updatedAt
) {
  return {
    id,
    title,
    totalMark,
    totalQuestion,
    teacher,
    duration,
    startTime,
    endTime,
    status,
    createdAt,
    updatedAt,
  };
}

const columns = [
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Edit</Button>;
    },
  },
  { field: 'id', hide: true },
  { field: 'title', headerName: 'Quiz Title', width: 150 },
  { field: 'totalMark', headerName: 'Total Mark', width: 150 },
  { field: 'totalQuestion', headerName: 'Total Questions', width: 150 },
  { field: 'teacher', headerName: 'Teacher', width: 150 },
  { field: 'duration', headerName: 'Duration', width: 150 },
  { field: 'startTime', headerName: 'Start Time', width: 150 },
  { field: 'endTime', headerName: 'End Time', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'createdAt', headerName: 'Created At', width: 150 },
  { field: 'updatedAt', headerName: 'Last Updated At', width: 150 },
];

const QuizList = () => {
  const stateToken = useSelector((state) => state.profile.token);

  const { data } = useSWR(['/quiz/fetch-quizzes', stateToken]);

  let rows = [];
  if (data?.quiz?.length > 0) {
    data.quiz?.map((item, index) => {
      const row = createData(
        item._id,
        item.title,
        item.totalMark,
        item.questions.length,
        item.teacher.name,
        item.duration,
        format(new Date(parseISO(item.startTime)), 'dd/MM/yy hh:mm a'),
        format(new Date(parseISO(item.endTime)), 'dd/MM/yy hh:mm a'),
        item.status,
        format(new Date(parseISO(item.createdAt)), 'dd/MM/yy hh:mm a'),
        format(new Date(parseISO(item.updatedAt)), 'dd/MM/yy hh:mm a')
      );
      rows.push(row);

      // console.log(item.startTime)
      console.log(
        format(new Date(parseISO(item.startTime)), 'dd/MM/yy hh:mm a')
      );
    });
  }

  // console.log(data);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'updatedAt', sort: 'asc' }],
          },
        }}
        autoHeight
        rows={rows}
        columns={columns}
      />
    </div>
  );
};

export default QuizList;
