import React, { useState, useEffect } from 'react';
import AdminDashboard from '../Admin/AdminDashboard';
import Auth from '../Auth';
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '../../store/profile-slice';
import UserDashboard from '../user/UserDashboard';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

const Layout = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const stateUserToken = useSelector((state) => state.profile.token);
  const stateUserRole = useSelector((state) => state.profile.role);

  // Beacuse it's a next app we can't run localstorage on redux app it will show an error so to avoid that error
  useEffect(() => {
    let retrivedToken;
    let retrivedUserId;
    let retrivedEmail;
    let retrivedName;
    let retrivedRole;

    const checkAuth = async () => {
      try {
        const {data: authResponse} = await axios.get('/auth/check-auth');
        console.log('authResponse', authResponse)
        retrivedRole = authResponse.role;
        if (retrivedRole) {
          dispatch(
            profileActions.userLogin({
              token: retrivedToken,
              userId: retrivedUserId,
              email: retrivedEmail,
              name: retrivedName,
              role: retrivedRole,
            })
          );
        }
        setLoading(false);

      } catch(err) {
        console.log(err)
      }
    }

    checkAuth();

    console.log('retrivedRole', retrivedRole);

    
  }, [dispatch]);

  return (
    <>
      {!loading ? (
        stateUserRole ? (
          stateUserRole == 'user' ? (
            <UserDashboard {...props} />
          ) : (
            <AdminDashboard {...props} />
          )
        ) : (
          <Auth />
        )
      ) : (
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
    </>
  );
};

export default Layout;
