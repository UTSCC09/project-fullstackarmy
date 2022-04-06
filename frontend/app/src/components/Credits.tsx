import Typography from '@mui/material/Typography';

export const Credits = () => {
  return (
    <div className='credits'>
      <Typography variant='h5' sx={{ marginTop: 2, marginBottom: 2 }}>
        Credits
      </Typography>
      <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
        UI Components
      </Typography>
      <Typography variant='subtitle1'>
        Information Tab Images - Sources
      </Typography>
      <Typography variant='body2'>
        <li>
          Background GIF:{' '}
          <a href='https://tenor.com/view/blue-white-gradient-carrd-gif-23556830'>
            Tenor GIF
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          Scroll GIF:{' '}
          <a href='https://burlingtonhealthja.com/doctors/'>
            Burlington Health
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          COVID-19 GIF:{' '}
          <a href='https://www.realsimple.com/health/preventative-health/recover-from-lingering-covid-19-symptoms'>
            Real Simple
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          Population Graphic:{' '}
          <a href='https://www.gavi.org/vaccineswork/not-so-super-immunity-people-whove-recovered-covid-19-and-vaccinated-can-still-be'>
            Gavi
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          COVID-19 Vaccine Graphic:{' '}
          <a href='https://www.wyomingpublicmedia.org/open-spaces/2021-09-10/natrona-county-health-officer-says-vaccinations-would-solve-wyomings-covid-19-problems'>
            Wyoming Public Media
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          Stop COVID-19 Graphic:{' '}
          <a href='https://medcitynews.com/2020/11/moderna-does-one-better-than-pfizer-biontech-touts-94-5-efficacy-for-its-covid-vaccine/'>
            MedCity News
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          Physical Distancing Graphic:{' '}
          <a href='https://scopeblog.stanford.edu/2020/12/02/persuading-the-public-to-take-protective-measures-in-the-pandemic/'>
            Stanford Medicine
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          Person in Bubble Graphic:{' '}
          <a href='https://health.clevelandclinic.org/how-to-fight-coronavirus-caution-fatigue/'>
            Cleveland Clinic
          </a>
        </li>
      </Typography>
      <Typography variant='body2'>
        <li>
          Raised Hands Graphic:{' '}
          <a href='https://www.biomatrixsprx.com/news/covid-19-encouragement-and-hope-for-fertility-patients'>
            BIOMATRIX
          </a>
        </li>
      </Typography>
    </div>
  );
};
