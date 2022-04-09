import { Link, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';

export const Footer = () => {
  const { pathname } = useLocation();
  return (
    <Paper
      elevation={3}
      sx={{ marginTop: pathname !== '/' ? 'auto' : '100vh' }}
    >
      <footer>
        <span>
          <Link className='link' to='/credits'>
            Credits
          </Link>
        </span>
      </footer>
    </Paper>
  );
};
