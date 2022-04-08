import { useQuery } from '@apollo/client';
import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import DashboardTitle from './DashboardTitle';
import { UserContext } from '../context/UserContext';
import Error from '../elements/Error/Error';
import { ALL_SAVED_CONFIGS } from './queries/UserConfigQueries';
import Loading from '../elements/Loading/Loading';
import List from '@mui/material/List';

function renderRow(props: ListChildComponentProps, data: string) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component='div' disablePadding>
      <ListItemButton>
        <ListItemText primary={data} />
      </ListItemButton>
    </ListItem>
  );
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const SavedConfigs: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  const { user } = React.useContext(UserContext);
  const allSavedConfigs = useQuery(ALL_SAVED_CONFIGS, {
    variables: {
      user: '624dad9714daa3e6fd937623',
    },
  });
  if (allSavedConfigs && allSavedConfigs.loading) return <Loading />;
  if (allSavedConfigs && allSavedConfigs.error)
    return <Error message={allSavedConfigs.error.message} />;
  const userConfigs = allSavedConfigs.data.userConfigs;
  let rowData = userConfigs.map((elmt) => {
    if (elmt) {
      let res = '';
      if (elmt.savedLanguage) {
        res += 'Saved Language: ' + elmt.savedLanguage + '   ';
      } else {
        res += 'Saved Language: null   ';
      }
      if (elmt.savedIsoCodes) {
        res += 'Saved ISO Codes: ' + elmt.savedIsoCodes.toString() + '   ';
      }
      if (elmt.savedStartDate && elmt.savedEndDate) {
        res +=
          'Saved Date Range: ' +
          elmt.savedStartDate +
          ' - ' +
          elmt.savedEndDate +
          '   ';
      } else {
        res += 'Saved Date Range : null   ';
      }
      return res;
    }
    return '';
  });
  console.log(rowData);
  return (
    <React.Fragment>
      <DashboardTitle titleVar='userDashboard.savedConfigs' />
      <Box
        sx={{
          width: '100%',
          height: 400,
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <List
          component='nav'
          aria-label='main mailbox folders'
          sx={{ width: 850 }}
        >
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary='Inbox' />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary='Drafts' />
          </ListItemButton>
        </List>
      </Box>
    </React.Fragment>
  );
};
export default SavedConfigs;
