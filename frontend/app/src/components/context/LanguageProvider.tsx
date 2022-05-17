import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageContext = React.createContext({
  currentLanguage: '',
  changeLanguage: (lang: string) => {},
});

interface Props {
  children: ReactNode;
}

const LanguageProvider: React.FC<Props> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = React.useState('en');

  const changeLanguage = React.useMemo(
    () => (lang: string) => {
      setCurrentLanguage(lang);
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  return (
    <LanguageContext.Provider
      value={React.useMemo(
        () => ({ currentLanguage, changeLanguage }),
        [currentLanguage, changeLanguage]
      )}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
