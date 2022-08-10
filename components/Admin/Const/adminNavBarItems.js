import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LogoutIcon from '@mui/icons-material/Logout';

export const mainNavbarItems = [
    {
        id: 0,
        icon: <DashboardIcon />,
        label: 'Dashboard',
        route: 'dashboard',
    },
    {
        id: 1,
        icon: <QuizIcon />,
        label: 'Create Quiz',
        route: 'create-quiz',
    },
    
    {
        id: 2,
        icon: <ListAltIcon />,
        label: 'Quiz List',
        route: 'quiz-list',
    },
    {
        id: 3,
        icon: <GroupIcon />,
        label: 'Student List',
        route: 'student-list',
    },
    {
        id: 4,
        icon: <PlaylistAddCheckIcon />,
        label: 'Results',
        route: 'results',
    },
    {
        id: 5,
        icon: <LogoutIcon />,
        label: 'Logout',
        route: 'logout',
    },
]