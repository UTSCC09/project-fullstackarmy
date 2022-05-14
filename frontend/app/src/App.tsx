import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import TabNav from './components/TabNav';
import { Footer } from './components/Footer';
import { Credits } from './components/Credits';
import { InfoTab } from './components/tabs/InfoTab';
import StatusTab from './components/tabs/StatusTab';
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
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// test
function App() {
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
  const updateUser = (user: {
    userId: number;
    token: string;
    tokenExpiration: number;
  }) => {
    setUser(user);
  };

  // Filter countries included in the charts based on the selectedCountries state
  const [selectedCountries, setSelectedCountries] = React.useState([
    'CAN',
    'AFG',
    'AND',
    'CHL',
    'PRT',
  ]);
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
  const [currentLanguage, setCurrentLanguage] = React.useState('en');
  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: user.token ? `Bearer ${user.token}` : '',
      },
    };
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: user ? authLink.concat(httpLink) : httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
        <DateFilterContext.Provider
          value={{ selectedDate, updateSelectedDate }}
        >
          <CountriesFilterContext.Provider
            value={{ selectedCountries, updateSelectedCountries }}
          >
            <UserContext.Provider value={{ user, updateUser }}>
              <ColorModeContext.Provider value={{ darkMode, toggleDarkMode }}>
                <ThemeProvider theme={theme}>
                  <Router>
                    <div
                      className='app-container'
                      style={{
                        backgroundColor: darkMode ? '#303030' : 'white',
                      }}
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
                  </Router>
                </ThemeProvider>
              </ColorModeContext.Provider>
            </UserContext.Provider>
          </CountriesFilterContext.Provider>
        </DateFilterContext.Provider>
      </LanguageContext.Provider>
    </ApolloProvider>
  );
}

export default Sentry.withProfiler(App);
