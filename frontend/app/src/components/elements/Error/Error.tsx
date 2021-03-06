import React from 'react';
import './Error.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className='alertContainer'>
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export default Error;
