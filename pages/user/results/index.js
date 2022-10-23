import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useSWR from 'swr';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import ResultsPreview from '../../../components/user/ResultsPreview';
import CancelIcon from '@mui/icons-material/Cancel';


function createData(
  id,
  title,
  totalMark,
  obtainedMark,
  duration,
  totalQuestions,
  teacher,
  date
) {
  return {
     id,
  title,
  totalMark,
  obtainedMark,
  duration,
  totalQuestions,
  teacher,
  date
  };
}

const Results = () => {
  const [rows, setRows] = React.useState([]);
  const [quizData, setQuizData] = React.useState('');
  const [openResultPreviewModal, setOpenResultPreviewModal] = React.useState(false);
  const [result, setResult] = React.useState([]);


  const stateUserId = useSelector((state) => state.profile.userId);

  const { data, error } = useSWR(`/quiz/fetch-results/user/${stateUserId}`);

  console.log('data', data);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleModalClose = () => {
    setOpenResultPreviewModal(false);
  };


  const detailsResultHandler = React.useCallback(
    (id) => () => {
        const result = data.results?.filter((item) => item._id == id);
        setResult(result[0])
        setOpenResultPreviewModal(true)
    },
    [data]
  );

    const confirmAttemptHandler = () => {
      setOpenQuizModal(true);
      handleAttemptModalClose();
    };

  React.useEffect(() => {
    let rowsArray = [];
    if (data?.results?.length > 0) {
      data.results?.map((item, index) => {
        const row = createData(
          item._id,
          item.title,
          item.totalMark,
          item.quizId.totalMark,
          item.duration,
          item.quizId.questions.length,
          item.quizId.teacher.name,
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
        width: 150,
        getActions: (params) => [
          <GridActionsCellItem
            key={params.id}
            icon={<Box sx={{ fontWeight: 'bold', color: 'white', backgroundColor: '#2563eb', px: '1rem', py: '.4rem', borderRadius: '15px'}}>See Details</Box>
        }
            label="Attempt"
            onClick={detailsResultHandler(params.id)}
          />,
        ],
      },
      { field: 'id', hide: true },
      { field: 'title', headerName: 'Quiz Title', width: 200 },
      { field: 'totalMark', headerName: 'Total Mark', width: 150 },
      { field: 'obtainedMark', headerName: 'Obtained Mark', width: 130 },
      { field: 'duration', headerName: 'Duration', width: 150 },
      { field: 'totalQuestions', headerName: 'Total Questions', width: 130 },
      { field: 'teacher', headerName: 'Teacher', width: 120 },
      { field: 'date', headerName: 'Date', width: 150 },
    ],
    [detailsResultHandler]
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
        fullScreen={true}
        open={openResultPreviewModal}
        onClose={handleModalClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"   sx={{ borderBottom: '1px solid #333' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box><Typography variant='h5'>Result Preview</Typography></Box>
            <Box>
              <IconButton aria-label="delete" onClick={handleModalClose}>
                <CancelIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
            <ResultsPreview results={result} />
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #333' }}>
          <Button autoFocus variant="outlined" color="error" onClick={handleModalClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Results;
