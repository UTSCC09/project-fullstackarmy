import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Header } from "./components/Header";
import {TabNav} from "./components/TabNav";
import { Footer } from "./components/Footer";
import { DataSources } from "./components/DataSources";
import { Credits } from "./components/Credits";
import { InfoTab } from "./components/tabs/InfoTab";
import { StatusTab } from "./components/tabs/StatusTab";
import { RatesTab } from "./components/tabs/RatesTab";
import { DistributionTab } from "./components/tabs/DistributionTab";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from "./components/context/ColorModeContext";
import { LanguageContext} from "./components/context/LanguageContext";
import { useTranslation } from 'react-i18next';

const theme = createTheme({
  components:{
    MuiButton:{
      styleOverrides: {
        root: {
          color:'#00acea'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#00acea',
    },
  },
  typography: {
    button:{
      textTransform: 'none',
    }, 
  },
});

// Modifies the Event prototype so it will affect how the Google Library behaves.
// Otherwise non-passive event listener violations will appear in the console.
// Credits: https://stackoverflow.com/questions/47799388/javascript-google-maps-api-non-passive-event-handlers
const modifyEventListenerOptions = () => {
  if (typeof EventTarget !== "undefined") {
    let func = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
        this.func = func;
        if(typeof capture !== "boolean"){
            capture = capture || {};
            capture.passive = false;
        }
        this.func(type, fn, capture);
    };
  };
};

function App() {
  modifyEventListenerOptions();

  // Set theme attributes based on darkMode state 
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleDarkMode = () => {setDarkMode(!darkMode)}
  const theme = createTheme({
    components:{
      MuiButton:{
        styleOverrides: {
          root: {
            color:'#00acea'
          }
        }
      },
      MuiTabs:{
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#303030': 'white'
          }
        }
      },
      MuiTypography:{
        styleOverrides: {
          root: {
            color: darkMode ? 'white': 'black'
          }
        }
      }
    },
    palette: {
      mode: darkMode ? 'dark': 'light',
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#00acea',
      },
    },
    typography: {
      button:{
        textTransform: 'none',
      }, 
    },
  });

  // Handle translation 
  const {i18n} = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ColorModeContext.Provider value={{darkMode, toggleDarkMode}}>
      <ThemeProvider theme={theme}>
        <Router>
          <LanguageContext.Provider value={{changeLanguage}}>
            <div style={{backgroundColor: darkMode ? '#303030': 'white'}}>
              <Header />
              <Routes>
                <Route path= "/" element={<><TabNav selected="one"/> <InfoTab /></>}></Route>
                <Route path= "/vaccination-status" element={<><TabNav selected="two"/> <StatusTab /></>}></Route>
                <Route path= "/vaccination-rates" element={<><TabNav selected="three" /> <RatesTab /></>}></Route>
                <Route path= "/vaccination-distribution" element={<> <TabNav selected="four" /> <DistributionTab /></>}></Route>
                <Route path= "/datasources" element={<DataSources/>}></Route>
                <Route path= "/credits" element={<Credits/>}></Route>
              </Routes>
              <Footer />
            </div>
          </LanguageContext.Provider>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;