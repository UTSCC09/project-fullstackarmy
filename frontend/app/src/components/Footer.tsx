import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

export const Footer = () => {
  return (
    <Paper elevation={3} sx={{ marginTop: 'auto' }}>
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
