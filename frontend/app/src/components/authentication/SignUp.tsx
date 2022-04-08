import { useMutation } from '@apollo/client';
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
import Error from '../elements/Error/Error';
import { SIGN_UP } from './queries/AuthenticationQuries';

const SignUp: React.FC = () => {
  const [errorPanel, setErrorPanel] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: () => {
      navigate('/signin');
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

    signUp({
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
          {t('signup')}
        </Typography>
        <Box
          component='form'
          noValidate={true}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                color='secondary'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                color='secondary'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {t('signup')}
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link
                component={RouterLink}
                to='/signin'
                color='secondary'
                variant='body2'
              >
                {t('alreadyHaveAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {errorPanel && <Error message={errorPanel} />}
      </Box>
    </Container>
  );
};

export default SignUp;
