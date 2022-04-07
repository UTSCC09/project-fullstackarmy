/**
 * Changes the tab index of the tab panel.
 * @param {number} index
 * @return {{id: string, aria-controls: string}} properties for the tab panel.
 * @note From https://mui.com/components/tabs/ example
 */
export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};
