import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import useSWR from 'swr';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import ResultsPreview from '../../components/user/ResultsPreview';
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
    date,
  };
}

const Results = () => {
  const [rows, setRows] = React.useState([]);
  const [openResultPreviewModal, setOpenResultPreviewModal] =
    React.useState(false);
  const [result, setResult] = React.useState([]);
  const [dropdownValue, setDropdownValue] = React.useState(null);
  const [dropdownOptions, setDropdownOptions] = React.useState([]);

  const [resultsData, setResultsData] = React.useState(null);

  const [quizzes, setQuizzes] = React.useState([]);

  const stateToken = useSelector((state) => state.profile.token);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleModalClose = () => {
    setOpenResultPreviewModal(false);
  };

  // let dropdownOptions = [];
  React.useEffect(() => {
    const fetchQuizOptions = async () => {
      let dropdownOptionsArray = [];
      try {
        const { data } = await axios.get('/quiz/fetch-quizzes');
        console.log(data);
        setQuizzes(data?.quiz);
        if (data?.quiz) {
          data?.quiz?.map((item) => {
            if (dropdownOptions.indexOf(item.title) === -1) {
              dropdownOptionsArray.push(item.title);
            }
          });
          setDropdownOptions(dropdownOptionsArray);
          setDropdownValue(dropdownOptionsArray[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizOptions();
  }, []);

  const detailsResultHandler = React.useCallback(
    (id) => () => {
      const result = resultsData?.filter((item) => item._id == id);
      // console.log('detailed results result', result)
      setResult(result[0]);
      setOpenResultPreviewModal(true);
    },
    [resultsData]
  );

  React.useEffect(() => {
    const fetchQuizResult = async () => {
      let quiz;
      if (quizzes.length > 0) {
        quiz = quizzes?.find((item) => item.title == dropdownValue);
      }
      try {
        if (quiz?._id) {
          const { data } = await axios.get(
            `/quiz/fetch-results/quiz/${quiz._id}`
          );
          setResultsData(data?.results);
          let rowsArray = [];
            data?.results?.map((item, index) => {
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
          setRows(rowsArray);
          console.log('setting results data', data?.results)
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizResult();
  }, [dropdownValue, quizzes]);

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
            icon={
              <Box
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#2563eb',
                  px: '1rem',
                  py: '.4rem',
                  borderRadius: '15px',
                }}
              >
                See Details
              </Box>
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

  console.log('results data ', resultsData)

  return (
    <div style={{ width: '100%' }}>
      <Autocomplete
        value={dropdownValue}
        onChange={(event, newValue) => {
          setDropdownValue(newValue);
        }}
        id="controllable-states-demo"
        options={dropdownOptions}
        sx={{ mx: '2rem', mt: '1rem' }}
        renderInput={(params) => <TextField {...params} label="Select Quiz" />}
      />

      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'updatedAt', sort: 'asc' }],
          },
        }}
        sx={{ mx: '2rem', mt: '3rem' }}
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
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ borderBottom: '1px solid #333' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5">Result Preview</Typography>
            </Box>
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
          <Button
            autoFocus
            variant="outlined"
            color="error"
            onClick={handleModalClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Results;
