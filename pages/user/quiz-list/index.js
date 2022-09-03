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
} from '@mui/material';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';

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
  const [rows, setRows] = React.useState([]);
  const [openAttemptModal, setOpenAttemptModal] = React.useState(false);
  const [quizId, setQuizId] = React.useState('');

  const router = useRouter();

  const stateToken = useSelector((state) => state.profile.token);

  const { data } = useSWR(['/quiz/available-quizzes', stateToken]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleAttemptModalClose = () => {
    setOpenAttemptModal(false);
  };

  const attemptQuiz = React.useCallback(
    (id) => () => {
      setQuizId(id);
      setOpenAttemptModal(true);
    },
    []
  );

    const confirmAttemptHandler = () => {
      router.push(`/user/quiz/${quizId}`)
      handleAttemptModalClose();
    };

  React.useEffect(() => {
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
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<Button variant="contained">Attempt</Button>
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
    []
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
    </div>
  );
};

export default QuizList;
