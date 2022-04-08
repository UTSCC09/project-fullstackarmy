import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const Credits = () => {
  // Go to top of the page upon rendering
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='h5' sx={sx.title}>
          Credits
        </Typography>
      </Paper>

      <Paper elevation={3} sx={sx.section}>
        <Typography variant='h6' sx={sx.heading}>
          Data Sources
        </Typography>
        <Typography variant='subtitle1'></Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            Information Tab info from{' '}
            <a className='link' href='https://youtu.be/J0RuJpGtgls'>
              Video{' '}
            </a>
            by
            <a
              className='link'
              href='https://www.youtube.com/c/HoustonMethodist/about'
            >
              {' '}
              Houston Methodist
            </a>
          </li>
          <li>
            COVID-19 Vaccine Distrubtion data by
            <a
              className='link'
              href='https://data.covid19taskforce.com/data/tables'
            >
              {' '}
              Multilateral Leaders Task Force on COVID-19
            </a>
          </li>
          <li>
            COVID-19 Vaccination data by Mathieu, E., Ritchie, H., Ortiz-Ospina,
            E. et al. A global database of COVID-19 vaccinations. Nat Hum Behav
            (2021) -
            <a
              className='link'
              href='https://doi.org/10.1038/s41562-021-01122-8'
            >
              {' '}
              Citation
            </a>
          </li>
          <li>
            Google Maps Country Features from
            <a
              className='link'
              href='https://github.com/johan/world.geo.json/blob/master/countries.geo.json'
            >
              {' '}
              Johan
            </a>{' '}
            and{' '}
            <a className='link' href='https://datahub.io/core/geo-countries'>
              Data Hub
            </a>
          </li>
          <li>
            Google Maps Continent Features from
            <a
              className='link'
              href='https://gist.github.com/hrbrmstr/91ea5cc9474286c72838?short_path=f3fde31'
            >
              {' '}
              hrbrmstr
            </a>
          </li>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ margin: 5, padding: 5 }}>
        <Typography variant='h6' sx={sx.heading}>
          User Interface and Design
        </Typography>
        <Typography variant='subtitle1'>
          UI Components (Layout Components, Buttons, Dropdown Menus)
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            From
            <a className='link' href='https://mui.com/pricing/'>
              {' '}
              MUI (open-source Community plan)
            </a>
            , licensed under the
            <a
              className='link'
              href='https://github.com/mui/material-ui/blob/master/LICENSE'
            >
              {' '}
              MIT License
            </a>
          </li>
        </Typography>

        <Typography variant='subtitle1'>Charts and Maps</Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            From
            <a className='link' href='https://www.chartjs.org/'>
              {' '}
              Chart.js
            </a>
            , licensed under the
            <a
              className='link'
              href='https://www.chartjs.org/docs/2.9.4/notes/license.html'
            >
              {' '}
              MIT License
            </a>
          </li>
          <li>
            Google maps styling from{' '}
            <a className='Link' href='https://snazzymaps.com'>
              Snazzy Maps
            </a>
          </li>
        </Typography>

        <Typography variant='subtitle1'>Information Tab Images</Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            Images from
            <a className='link' href='https://pixabay.com/'>
              {' '}
              Pixabay
            </a>
            , licensed under the
            <a className='link' href='https://pixabay.com/service/license/'>
              {' '}
              Pixabay License
            </a>
          </li>
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            Arrow GIF from
            <a className='link' href='https://www.canva.com/'>
              {' '}
              Canva
            </a>
            , licensed under the
            <a
              className='link'
              href='https://www.canva.com/policies/content-license-agreement/'
            >
              {' '}
              Canva Free Content License
            </a>
          </li>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={sx.section}>
        <Typography variant='h6' sx={sx.heading}>
          People
        </Typography>
        <Typography variant='subtitle1'>
          The efforts of these people helped us go beyond:)
        </Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            <a className='Link' href='https://github.com/chendaniely'>
              Daniel Chen
            </a>{' '}
            For advice to ensure our visualizations are correct and informative.
          </li>
          <li>
            <a
              className='Link'
              href='https://www.linkedin.com/in/shehab-eid-824985118/'
            >
              Shehab Eid
            </a>{' '}
            Ensuring that our information is correct and not misleading from a
            scientific perspective.
          </li>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={sx.section}>
        <Typography variant='h6' sx={sx.heading}>
          Code Segments
        </Typography>
        <Typography variant='subtitle1'>What would we do without:</Typography>
        <Typography variant='body2' sx={sx.bullet}>
          <li>
            <a className='Link' href='https://stackoverflow.com/'>
              Stack Overflow
            </a>
          </li>
          <li>
            <a className='Link' href='https://codepen.io/'>
              Code Pen
            </a>
          </li>
          <li>
            <a className='Link' href='https://codesandbox.io/'>
              Code Sandbox
            </a>
          </li>
        </Typography>
      </Paper>
    </div>
  );
};

// sx values for Typography components
const sx = {
  title: { marginTop: 2, marginBottom: 2 },
  section: { margin: 5, padding: 5 },
  heading: { textDecoration: 'underline' },
  bullet: { marginLeft: 2 },
};
