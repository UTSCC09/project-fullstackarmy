import React from 'react';

export const LanguageContext = React.createContext({
  changeLanguage: (lang: string) => {},
});
