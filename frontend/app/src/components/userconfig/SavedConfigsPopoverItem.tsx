import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { LanguageContext } from '../context/LanguageContext';
import { MenuItem } from '@mui/material';
import { CountriesFilterContext } from '../context/CountriesFilterContext';
import { DateFilterContext } from '../context/DateFilterContext';

// function MouseOverPopover() {
//   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

//   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <div>
//       <Typography
//         aria-owns={open ? 'mouse-over-popover' : undefined}
//         aria-haspopup='true'
//         onMouseEnter={handlePopoverOpen}
//         onMouseLeave={handlePopoverClose}
//       >
//         Hover with a Popover.
//       </Typography>
//       <Popover
//         id='mouse-over-popover'
//         sx={{
//           pointerEvents: 'none',
//         }}
//         open={open}
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         onClose={handlePopoverClose}
//         disableRestoreFocus
//       >
//         <Typography sx={{ p: 1 }}>I use Popover.</Typography>
//       </Popover>
//     </div>
//   );
// }

const SavedConfigsPopoverItem = ({ key, cfg }) => {
  const { changeLanguage } = React.useContext(LanguageContext);
  const { updateSelectedDate } = React.useContext(DateFilterContext);
  const { updateSelectedCountries } = React.useContext(CountriesFilterContext);
  const handleClick = (cfg) => {
    if (cfg.savedLanguage) {
      changeLanguage(cfg.savedLanguage);
    }
    if (cfg.savedStartDate && cfg.savedEndDate) {
      let startDate = new Date(Date.parse(cfg.savedStartDate));
      let endDate = new Date(Date.parse(cfg.savedEndDate));
      updateSelectedDate([startDate, endDate]);
    }
    if (cfg.savedIsoCodes) {
      updateSelectedCountries(cfg.savedIsoCodes);
    }
    return null;
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const itemId = 'mouse-over-popover-' + key;
  return (
    <div>
      <MenuItem
        key={key}
        aria-owns={open ? itemId : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={() => handleClick(cfg)}
      >
        {cfg.name}
      </MenuItem>
      <Popover
        id={itemId}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: { minHeight: 100, minWidth: 200, padding: 10 },
        }}
      >
        <Typography>Saved Language: {cfg ? cfg.savedLanguage : ''}</Typography>
        <br />
        <Typography>
          Saved ISO Codes:{' '}
          {cfg ? (cfg.savedIsoCodes ? cfg.savedIsoCodes.toString() : '') : ''}
        </Typography>
        <br />
        <Typography>
          Saved Start Date:{' '}
          {cfg
            ? cfg.savedStartDate
              ? cfg.savedStartDate.slice(0, 10)
              : ''
            : ''}
        </Typography>
        <br />
        <Typography>
          Saved End Date:{' '}
          {cfg ? (cfg.savedEndDate ? cfg.savedEndDate.slice(0, 10) : '') : ''}
        </Typography>
        <br />
      </Popover>
    </div>
  );
};

export default SavedConfigsPopoverItem;
