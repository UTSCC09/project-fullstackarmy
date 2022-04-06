import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const Credits = () => {
  // Go to top of the page upon rendering 
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Paper elevation={2} sx={{display:'flex', justifyContent:'center'}}>
        <Typography variant='h5' sx={sx.title}>
          Credits
        </Typography>
      </Paper>

      <Paper elevation={3} sx={sx.section}>
        <Typography variant='h6' sx={sx.heading}>
          Data Sources
        </Typography>
        <Typography variant='subtitle1'>
          Information Tab
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            <a className='link' href='https://youtu.be/J0RuJpGtgls'>Video </a>
            by 
            <a className='link' href='https://www.youtube.com/c/HoustonMethodist/about'> Houston Methodist</a> 
          </li>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{margin: 5, padding: 5}}>
        <Typography variant='h6' sx={sx.heading}>
          User Interface and Design
        </Typography>
        <Typography variant='subtitle1'>
          UI Components (Layout Components, Buttons, Dropdown Menus)
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            From 
            <a className='link' href='https://mui.com/pricing/'> MUI (open-source Community plan)</a>
            , licensed under the
            <a className='link' href='https://github.com/mui/material-ui/blob/master/LICENSE'> MIT License</a> 
          </li>
        </Typography>

        <Typography variant='subtitle1'>
          Charts Layout
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            From 
            <a className='link' href='https://www.chartjs.org/'> Chart.js</a>
            , licensed under the
            <a className='link' href='https://www.chartjs.org/docs/2.9.4/notes/license.html'> MIT License</a> 
          </li>
        </Typography>

        <Typography variant='subtitle1'>
          Information Tab Images
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            Images from 
            <a className='link' href='https://pixabay.com/'> Pixabay</a>
            , licensed under the
            <a className='link' href='https://pixabay.com/service/license/'> Pixabay License</a> 
          </li>
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            Arrow GIF from 
            <a className='link' href='https://www.canva.com/'> Canva</a>
            , licensed under the
            <a className='link' href='https://www.canva.com/policies/content-license-agreement/'> Canva Free Content License</a> 
          </li>
        </Typography>
      </Paper>
    </div>
  );
};

// sx values for Typography components
const sx = {
  'title' : {marginTop: 2, marginBottom: 2},
  'section' : {margin: 5, padding: 5},
  'heading' : {textDecoration: 'underline'},
  'bullet' : {marginLeft: 2}
}