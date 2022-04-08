import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import DashboardTitle from './DashboardTitle';
import { UserContext } from '../context/UserContext';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const ProfileSection: React.FC = () => {
  // TODO: Get actual user
  const { user } = React.useContext(UserContext);
  return (
    <React.Fragment>
      <DashboardTitle titleVar='userDashboard.profileSection' />
      <Avatar alt='Profile Picture' sx={{ width: 56, height: 56, margin: 5 }}>
        <AccountCircleIcon fontSize='large' />
      </Avatar>
      <Typography component='p' variant='h4'>
        {user && user.userId}
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        is your user id.
      </Typography>
    </React.Fragment>
  );
};

export default ProfileSection;
