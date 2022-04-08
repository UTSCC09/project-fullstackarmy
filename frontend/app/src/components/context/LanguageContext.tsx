import React from 'react';

export const LanguageContext = React.createContext({
  currentLanguage: '',
  changeLanguage: (lang: string) => {},
});
