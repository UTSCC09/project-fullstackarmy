import { useLazyQuery } from '@apollo/client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Error from '../elements/Error/Error';
import { SIGN_IN } from './queries/AuthenticationQuries';

const SignIn: React.FC = () => {
  const [errorPanel, setErrorPanel] = React.useState<string | null>(null);
  const { updateUser } = React.useContext(UserContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [signIn] = useLazyQuery(SIGN_IN, {
    onCompleted: (data) => {
      updateUser(data.signIn);
      navigate('/');
    },
    onError: (error) => {
      setErrorPanel(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      setErrorPanel(t('emailPasswordRequired'));
      return;
    }

    setErrorPanel(null);

    signIn({
      variables: {
        username: email,
        password,
      },
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('signin')}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            color='secondary'
            autoComplete='email'
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            color='secondary'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {t('signin')}
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link
                component={RouterLink}
                to='/signup'
                color='secondary'
                variant='body2'
              >
                {t('noAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {errorPanel && <Error message={errorPanel} />}
      </Box>
    </Container>
  );
};

export default SignIn;
