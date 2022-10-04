import { Card, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useSWR from 'swr';

const UserStatistics = () => {
    const { data: statistics, error } = useSWR(`/quiz/user/statistics`);

    console.log(statistics);

    return (
        <Box sx={{ flexGrow: 1 , m: '2rem'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                    <Card
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #333',
                            borderRadius: '10px',
                            textAlign: 'center',
                            p: '1rem',
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Total Available Quizzes:
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {statistics?.totalAvailableQuizzes}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #333',
                            borderRadius: '10px',
                            textAlign: 'center',
                            p: '1rem',
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Total Attended Quizzes:
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {statistics?.totalAttemptedQuizzes}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid #333',
                            borderRadius: '10px',
                            textAlign: 'center',
                            p: '1rem',
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Highest Obtained Mark:
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {statistics?.highestMark}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserStatistics;
