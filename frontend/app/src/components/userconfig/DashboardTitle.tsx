import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

interface Props {
  children?: React.ReactNode;
  titleVar: string;
}

const DashboardTitle: React.FC<Props> = ({ children, titleVar }) => {
  const { t } = useTranslation();

  return (
    <Typography component='h2' variant='h6' color='primary' gutterBottom>
      {t(titleVar)}
      {children}
    </Typography>
  );
};

export default DashboardTitle;
