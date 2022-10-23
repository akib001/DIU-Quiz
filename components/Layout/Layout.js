import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import Auth from '../Auth';
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '../../store/profile-slice';
import UserDashboard from '../user/UserDashboard';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

const Layout = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const stateUserRole = useSelector((state) => state.profile.role);

  const extractRoleFromCookie = (cookie) => {
    return cookie.split('role=')[1]
  }

  // Beacuse it's a next app we can't run localstorage on redux app it will show an error so to avoid that error
  useEffect(() => {
    console.log('check fn', extractRoleFromCookie(document.cookie))

    const extractRole = extractRoleFromCookie(document.cookie);

    if (extractRole !== null && extractRole !== 'undefined') {
          dispatch(
              profileActions.userLogin({
                role: extractRole,
              })
          );
        }

    setLoading(false);

  }, [dispatch]);


  return (
    <>
      {!loading ? (
        stateUserRole ? (
          stateUserRole === 'user' ? (
            <UserDashboard {...props} />
          ) : (
            <AdminDashboard {...props} />
          )
        ) : (
          <Auth />
        )
      ) : (
        <Box sx={{ width: '100wh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Layout;
