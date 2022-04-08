import React, { useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { ALL_SAVED_CONFIGS } from './queries/UserConfigQueries';
import { useLazyQuery } from '@apollo/client';
import Loading from '../elements/Loading/Loading';
import Error from '../elements/Error/Error';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import SavedConfigsPopoverItem from './SavedConfigsPopoverItem';

interface Props {}

const SavedConfigDropdown: React.FC<Props> = () => {
  const { user } = React.useContext(UserContext);

  const [getConfigs, allSavedConfigs] = useLazyQuery(ALL_SAVED_CONFIGS);

  useEffect(() => {
    if (user) {
      getConfigs({ variables: { user: user.userId } });
    }
  }, [user, getConfigs]);

  if (allSavedConfigs && allSavedConfigs.loading) return <Loading />;
  if (allSavedConfigs && allSavedConfigs.error)
    return <Error message={allSavedConfigs.error.message} />;

  const userConfigs = allSavedConfigs.data
    ? allSavedConfigs.data.userConfigs
    : [];

  const menuItems = userConfigs.map((cfg) => {
    return <SavedConfigsPopoverItem key={userConfigs.indexOf(cfg)} cfg={cfg} />;
  });

  return (
    <FormControl sx={{ m: 2, width: 230 }} size='small'>
      <Select value='' color='secondary'>
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SavedConfigDropdown;
