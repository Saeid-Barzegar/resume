import React, { createContext, useContext, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import en from '../locales/en.json';
import fa from '../locales/fa.json';

const messages = { en, fa };

type LanguageType = 'en' | 'fa';

interface IntlProviderContextPropTypes {
  children: React.ReactNode;
}

type ContextType = {
  language: LanguageType;
  switchLanguage: (locale: LanguageType) => void;
}

const LanguageContext = createContext<ContextType>({
  language: 'en',
  switchLanguage: () => { }
});

const IntlProviderContext: React.FC<IntlProviderContextPropTypes> = ({
  children
}) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  const switchLanguage = (locale: LanguageType) => {
    setLanguage(locale);
  };

  const initialState = useMemo(() => ({
    language,
    switchLanguage
  }), [language]);

  return (
    <LanguageContext.Provider value={initialState}>
      <IntlProvider locale={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default IntlProviderContext;

export const useLanguage = () => useContext(LanguageContext);
