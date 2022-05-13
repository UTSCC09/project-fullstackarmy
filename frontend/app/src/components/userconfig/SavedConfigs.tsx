import Divider from '@mui/material/Divider';
import React from 'react';
import SavedConfigDropdown from './SavedConfigDropdown';
import SavedConfigForm from './SavedConfigForm';

interface Props {}

const SavedConfigs: React.FC<Props> = () => {
  return (
    <>
      <SavedConfigDropdown />
      <Divider sx={{ marginTop: '14px' }} />
      <SavedConfigForm />
    </>
  );
};

export default SavedConfigs;
