import React, { createContext, useState } from "react";

export const OpsiContext = createContext<null | {
  darkMode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
}>(null);

type OpsiProviderProps = {
  children: React.ReactNode;
};
/**
 * Component/Function  Opsi Provider.
 * Used to render or handle logic for OpsiProvider.
 */
const OpsiProvider: React.FC<OpsiProviderProps> = ({ children }) => {
  const [darkMode, setDarkmode] = useState(false);
  return (
    <OpsiContext.Provider value={{ darkMode, setDarkmode }}>
      {children}
    </OpsiContext.Provider>
  );
};
export default OpsiProvider;
