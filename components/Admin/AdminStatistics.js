import { Card, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useSWR from 'swr';

const AdminStatistics = () => {
    const { data: statistics, error } = useSWR(`/quiz/admin/statistics`);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                    <Card variant="outlined" sx={{display: 'flex', flexDirection: 'column', border: '1px solid #333', borderRadius: '10px', textAlign: 'center', p: '1rem'}}>
                        <Typography variant="h4" gutterBottom>
                            Total Attended Students:
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {statistics?.attendedStudents}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card variant="outlined" sx={{display: 'flex', flexDirection: 'column', border: '1px solid #333', borderRadius: '10px', textAlign: 'center', p: '1rem'}}>
                        <Typography variant="h4" gutterBottom>
                            Total Active Quizzes:
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {statistics?.countActiveQuizzes}
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card variant="outlined" sx={{display: 'flex', flexDirection: 'column', border: '1px solid #333', borderRadius: '10px', textAlign: 'center', p: '1rem'}}>
                        <Typography variant="h4" gutterBottom>
                            Total Published Quizzes:
                        </Typography>
                        <Typography variant="h3" gutterBottom>
                            {statistics?.totalQuizzes}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminStatistics;