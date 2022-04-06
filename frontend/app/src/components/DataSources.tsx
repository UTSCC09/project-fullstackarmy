import Typography from '@mui/material/Typography';

export const DataSources = () => {
  return (
    <div className='credits'>
      <Typography variant='h5' sx={{ marginTop: 2, marginBottom: 2 }}>
        Data Sources
      </Typography>
      <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
        Information Tab
      </Typography>
      <Typography variant='body2'>
        <li>
          <a href='https://youtu.be/J0RuJpGtgls'>Video by Houston Methodist</a>
        </li>
      </Typography>
    </div>
  );
};
