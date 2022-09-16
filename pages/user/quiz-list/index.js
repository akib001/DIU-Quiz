import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useSWR from 'swr';
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
} from '@mui/material';
import QuizPopup from '../../../components/user/QuizPopup';

import { useRouter } from 'next/router';
import { Box } from '@mui/system';


function createData(
  id,
  title,
  totalMark,
  totalQuestion,
  teacher,
  duration,
  startTime,
  endTime,
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
    createdAt,
    updatedAt,
  };
}

const QuizList = () => {
  const router = useRouter()

  const [rows, setRows] = React.useState([]);
  const [openAttemptModal, setOpenAttemptModal] = React.useState(false);
  const [quizId, setQuizId] = React.useState('');
  const [quizData, setQuizData] = React.useState('');
  const [openQuizModal, setOpenQuizModal] = React.useState(false);


  const stateToken = useSelector((state) => state.profile.token);

  const { data, mutate } = useSWR(['/quiz/available-quizzes', stateToken]);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleAttemptModalClose = () => {
    setOpenAttemptModal(false);
  };

  const handleOpenQuizModalClose = () => {
    setOpenQuizModal(false);
  };


  const attemptQuiz = React.useCallback(
    (id) => async () => {
      try {
        setQuizId(id);
        const { data, error } = await axios.get(`/quiz/singleQuiz/${id}`, {
          headers: { Authorization: 'Bearer ' + stateToken },
        });
        setQuizData(data.quiz);
        setOpenAttemptModal(true);
      } catch (error) {
        console.log(error);
      }
    },
    [stateToken]
  );

    const confirmAttemptHandler = () => {
      setOpenQuizModal(true);
      handleAttemptModalClose();
    };

  React.useEffect(() => {
    let rowsArray = [];
    if (data?.availableQuizzes?.length > 0) {
      data.availableQuizzes?.map((item, index) => {
        const row = createData(
          item._id,
          item.title,
          item.totalMark,
          item.questions.length,
          item.teacher.name,
          item.duration,
          format(new Date(parseISO(item.startTime)), 'dd/MM/yy hh:mm a'),
          format(new Date(parseISO(item.endTime)), 'dd/MM/yy hh:mm a'),
          format(new Date(parseISO(item.createdAt)), 'dd/MM/yy hh:mm a'),
          format(new Date(parseISO(item.updatedAt)), 'dd/MM/yy hh:mm a')
        );
        rowsArray.push(row);
      });
    }
    setRows(rowsArray);
  }, [data]);

  const columns = React.useMemo(
    () => [
      {
        field: 'actions',
        headerName: 'Action',
        type: 'actions',
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<Box sx={{ fontWeight: 'bold', color: 'white', backgroundColor: '#2563eb', px: '1rem', py: '.4rem', borderRadius: '15px'}}>Attempt</Box>
        }
            label="Attempt"
            onClick={attemptQuiz(params.id)}
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
      { field: 'createdAt', headerName: 'Created At', width: 150 },
      { field: 'updatedAt', headerName: 'Last Updated At', width: 150 },
    ],
    [attemptQuiz]
  );

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'updatedAt', sort: 'asc' }],
          },
        }}
        sx={{mx: '2rem', mt: '3rem'}}
        autoHeight
        rows={rows}
        columns={columns}
      />

      {/* Attempt confirmation dialouge */}
      <Dialog
        fullScreen={fullScreen}
        open={openAttemptModal}
        onClose={handleAttemptModalClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Are you sure you want to attempt this quiz?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can only attempt this quiz one Time
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAttemptModalClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={confirmAttemptHandler}>
            Confirm Attempt
          </Button>
        </DialogActions>
      </Dialog>

       {/* Attempt Modal */}
       <Dialog
        fullScreen={true}
        open={openQuizModal}
        onClose={handleOpenQuizModalClose}
        aria-labelledby="responsive-dialog-title"
      >
        
        <QuizPopup
          quizData={quizData}
          handleOpenQuizModalClose={handleOpenQuizModalClose}
          mutate={mutate}
        /> 
      </Dialog>
    </div>
  );
};

export default QuizList;
