import * as Sentry from '@sentry/react';
import React from 'react';
import ColorModeProvider from './components/context/ColorModeProvider';
import CountriesFilterProvider from './components/context/CountriesFilterProvider';
import DateFilterProvider from './components/context/DateFilterProvider';
import LanguageProvider from './components/context/LanguageProvider';
import UserProvider from './components/context/UserProvider';
import RouterComponent from './components/routerComponent/RouterComponent';

function App() {
  return (
    <UserProvider>
      <LanguageProvider>
        <DateFilterProvider>
          <CountriesFilterProvider>
            <ColorModeProvider>
              <RouterComponent></RouterComponent>
            </ColorModeProvider>
          </CountriesFilterProvider>
        </DateFilterProvider>
      </LanguageProvider>
    </UserProvider>
  );
}

export default Sentry.withProfiler(App);
