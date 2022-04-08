import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import TabNav from './components/TabNav';
import { Footer } from './components/Footer';
import { Credits } from './components/Credits';
import { InfoTab } from './components/tabs/InfoTab';
import { StatusTab } from './components/tabs/StatusTab';
import RatesTab from './components/tabs/RatesTab';
import DistributionTab from './components/tabs/DistributionTab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from './components/context/ColorModeContext';
import { CountriesFilterContext } from './components/context/CountriesFilterContext';
import { DateFilterContext } from './components/context/DateFilterContext';
import { LanguageContext } from './components/context/LanguageContext';
import { UserContext } from './components/context/UserContext';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';
import SignUp from './components/authentication/SignUp';
import SignIn from './components/authentication/SignIn';

/**
 * Modifies the Event prototype so it will affect how the Google Library behaves.
 * Otherwise non-passive event listener violations will appear in the console.
 * @note Credits: https://stackoverflow.com/questions/47799388/javascript-google-maps-api-non-passive-event-handlers
 */
const modifyEventListenerOptions = () => {
  if (typeof EventTarget !== 'undefined') {
    let func = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
      this.func = func;
      if (typeof capture !== 'boolean') {
        capture = capture || {};
        capture.passive = false;
      }
      this.func(type, fn, capture);
    };
  }
};

function App() {
  modifyEventListenerOptions();

  // Set theme attributes based on darkMode state
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#00acea',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#303030' : 'white',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: darkMode ? 'white' : 'black',
          },
        },
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#00acea',
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  // User state
  const [user, setUser] = React.useState(null);
  const updateUser = (user: { _id: number; username: string }) => {
    setUser(user);
  };

  // Filter countries included in the charts based on the selectedCountries state
  const [selectedCountries, setSelectedCountries] = React.useState(["CAN", "AFG", "AND", "CHL", "PRT"]);
  const updateSelectedCountries = (countries) => {
    setSelectedCountries(countries);
  };

  // Filter date based on the selectedDate state
  const [selectedDate, setSelectedDate] = React.useState([null, null]);
  const updateSelectedDate = (date) => {
    setSelectedDate(date);
  };

  // Handle translation
  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ColorModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <Router>
          <UserContext.Provider value={{ user, updateUser }}>
            <LanguageContext.Provider value={{ changeLanguage }}>
              <CountriesFilterContext.Provider
                value={{ selectedCountries, updateSelectedCountries }}
              >
                <DateFilterContext.Provider
                  value={{ selectedDate, updateSelectedDate }}
                >
                  <div
                    style={{ backgroundColor: darkMode ? '#303030' : 'white' }}
                  >
                    <Header />
                    <Routes>
                      <Route
                        path='/'
                        element={
                          <div id='no-scroll'>
                            <>
                              <TabNav selected='one' /> <InfoTab />
                            </>
                          </div>
                        }
                      ></Route>
                      <Route
                        path='/vaccination-status'
                        element={
                          <>
                            <TabNav selected='two' /> <StatusTab />
                          </>
                        }
                      ></Route>
                      <Route
                        path='/vaccination-rates'
                        element={
                          <>
                            <TabNav selected='three' /> <RatesTab />
                          </>
                        }
                      ></Route>
                      <Route
                        path='/vaccination-distribution'
                        element={
                          <>
                            {' '}
                            <TabNav selected='four' /> <DistributionTab />
                          </>
                        }
                      ></Route>
                      <Route path='/credits' element={<Credits />}></Route>
                      <Route path='/signin' element={<SignIn />}></Route>
                      <Route path='/signup' element={<SignUp />}></Route>
                    </Routes>
                    <Footer />
                  </div>
                </DateFilterContext.Provider>
              </CountriesFilterContext.Provider>
            </LanguageContext.Provider>
          </UserContext.Provider>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Sentry.withProfiler(App);
