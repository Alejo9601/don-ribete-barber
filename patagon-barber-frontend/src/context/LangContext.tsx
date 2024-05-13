import { createContext, useState } from 'react';
import ES from '../assets/Languages/ES.json';
import EN from '../assets/Languages/EN.json';

const LanguagesContext = createContext<JSON | undefined>(ES);

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(ES);
  return (
    <LanguagesContext.Provider value={(language, setLanguage)}>
      {children}
    </LanguagesContext.Provider>
  );
}

export { LanguageProvider };
export default LanguagesContext;
