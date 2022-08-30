import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useSWR, { mutate, trigger } from 'swr';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

const QuizList = () => {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('');

  const stateToken = useSelector((state) => state.profile.token);

  const { data } = useSWR(['/quiz/fetch-quizzes', stateToken]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const deleteQuiz = React.useCallback(
    (id) => () => {     
        // setRows((prevRows) => prevRows.filter((row) => row.id !== id));    
        setDeleteId(id);
        setOpen(true);
    },
    [],
  );

  const confirmDeleteHandler = async () => {
      const { data, error} = await axios.delete(`/quiz/delete/${deleteId}`, { headers: { Authorization: "Bearer " + stateToken } });
      console.log(data.message);
      if(error) {
        alert(error);
      }
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
      handleClose();
  }
  
  React.useEffect(() => {
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
          setRows((prev) => [...prev, row]);
        });
      }
  }, [data])

  const columns = React.useMemo(
    () => [
      {
        field: 'actions',
        headerName: 'Action',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteQuiz(params.id)}
          />
        ],
      },
      // {
      //   field: 'action',
      //   headerName: 'Action',
      //   sortable: false,
      //   renderCell: (params) => {
      //     const onClick = (e) => {
      //       e.stopPropagation(); // don't select this row after clicking
    
      //       const api = params.api;
      //       const thisRow = {};
    
      //       api
      //         .getAllColumns()
      //         .filter((c) => c.field !== '__check__' && !!c)
      //         .forEach(
      //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
      //         );
    
      //       return alert(JSON.stringify(thisRow, null, 4));
      //     };
    
      //     return <Button onClick={onClick}>Edit</Button>;
      //   },
      // },
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
    ],
    [deleteQuiz],
  );

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

      {/* Delete confirmation dialouge */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Are you sure you want to delete this quiz?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you click on confirm delete button. You won&apos;t be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={confirmDeleteHandler}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizList;
