// Adapted from:
// https://codesandbox.io/s/persistentdrawerright-material-demo-forked-756g4v?file=/demo.tsx:2050-2054
import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {CountriesFilter} from './CountriesFilter';
import {DateFilter} from './DateFilter';

interface Props {
    open: boolean,
}

export const ConfigBar = ({open}) => {
    return (
        <Drawer
        
            sx={{
                width: 260,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                width: 260
                }
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >   
            <Typography variant="subtitle1" align="left" sx={{marginLeft:'14px'}}>Filter Data by Countries</Typography>
            <CountriesFilter />
            <Divider />
            <Typography variant="subtitle1" align="left" sx={{marginLeft:'14px'}}>Filter Data by Date Range</Typography>
            <DateFilter />
        </Drawer>
    );
}