import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useSWR, { mutate, trigger } from 'swr';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditQuizPopup from '../../components/Admin/EditQuizPopup';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';

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
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('');
  const [editQuizData, setEditQuizData] = React.useState('');

  const stateToken = useSelector((state) => state.profile.token);

  const { data } = useSWR('/quiz/fetch-quizzes');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  const deleteQuiz = React.useCallback(
    (id) => () => {
      setDeleteId(id);
      setOpenDeleteModal(true);
    },
    []
  );

  const editQuiz = React.useCallback(
    (id) => async () => {
      try {
        const { data, error } = await axios.get(`/quiz/singleQuiz/${id}`);
        setEditQuizData(data.quiz);
      } catch (error) {
        console.log(error);
      }
      setOpenEditModal(true);
    },
    []
  );

  const confirmDeleteHandler = async () => {
    const { data, error } = await axios.delete(`/quiz/delete/${deleteId}`, {
      headers: { Authorization: 'Bearer ' + stateToken },
    });
    console.log(data.message);
    if (error) {
      alert(error);
    }
    setRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
    handleDeleteModalClose();
  };

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
  }, [data]);

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
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<EditIcon />}
            label="Edit"
            onClick={editQuiz(params.id)}
          />,
        ],
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
    ],
    [deleteQuiz, editQuiz]
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
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Are you sure you want to delete this quiz?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you click on confirm delete button. You won&apos;t be able to
            recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={confirmDeleteHandler}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        fullScreen={true}
        open={openEditModal}
        onClose={handleEditModalClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ borderBottom: '1px solid #333' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box><Typography variant='h6'>Edit Quiz</Typography></Box>
            <Box>
              <IconButton aria-label="delete" onClick={() => setOpenEditModal(false)}>
                <CancelIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <EditQuizPopup
          editQuizData={editQuizData}
          setOpenEditModal={setOpenEditModal}
        />
      </Dialog>
    </div>
  );
};

export default QuizList;
