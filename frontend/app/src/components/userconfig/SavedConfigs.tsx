import React from 'react';
import SavedConfigDropdown from './SavedConfigDropdown';
import SavedConfigForm from './SavedConfigForm';

interface Props {}

const SavedConfigs: React.FC<Props> = () => {
  return (
    <>
      <SavedConfigDropdown />
      <SavedConfigForm />
    </>
  );
};

export default SavedConfigs;
