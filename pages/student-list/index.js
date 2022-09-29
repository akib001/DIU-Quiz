import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import useSWR from 'swr';
import { compareAsc, parseISO } from 'date-fns';

function createData(
  id,
  name,
  numberOfAttendedQuizzes,
  highestMark,
  lastQuizAttemptDate
) {
  return {
    id,
    name,
    numberOfAttendedQuizzes,
    highestMark,
    lastQuizAttemptDate,
  };
}

const StudentList = () => {
  const [rows, setRows] = React.useState([]);
  const { data, error } = useSWR('/quiz/admin/students');

  console.log('students ', data?.students);

  const highestMarkCalculate = (quizzesArray) => {
    let highestMark = 0;
    quizzesArray?.map((item) => {
      if(item.obtainedMark > highestMark)
       highestMark = item.obtainedMark
    })
    return highestMark;
  }

  const latestDateCalculate = (quizzesArray) => {
    let latestDate = new Date(parseISO(quizzesArray[0].date));
    quizzesArray?.map((item) => {
      const itemDate = new Date(parseISO(item.date));
      compareAsc(latestDate, itemDate)
      console.log(compareAsc(latestDate, itemDate))
    })
    return 0;
  }

  React.useEffect(() => {
    let rows = [];
    if (data?.students?.length > 0) {
      data.students?.map((item) => {
        const highestMark = highestMarkCalculate(item.quizzes);
        const lastQuizAttemptDate = latestDateCalculate(item.quizzes);
        const row = createData(
          item.userId,
          item.name,
          item.quizzes.length,
          highestMark,
          50
        );
        rows.push(row);
      });
      setRows(rows);
    }
  }, [data]);

  const columns = React.useMemo(
    () => [
      { field: 'id', hide: true },
      { field: 'name', headerName: 'Name', width: 150 },
      {
        field: 'numberOfAttendedQuizzes',
        headerName: 'Number of Attended Quizzes',
        width: 150,
      },
      { field: 'highestMark', headerName: 'Highest Mark', width: 150 },
      {
        field: 'lastQuizAttemptDate',
        headerName: 'Last Quiz Attempt Data',
        width: 150,
      },
    ],
    []
  );

  return <div style={{ width: '100%' }}>
  <DataGrid
    // initialState={{
    //   sorting: {
    //     sortModel: [{ field: 'updatedAt', sort: 'asc' }],
    //   },
    // }}
    autoHeight
    rows={rows}
    columns={columns}
  />

</div>;
};

export default StudentList;
