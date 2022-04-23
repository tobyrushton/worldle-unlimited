import React, {useEffect} from'react'
import useLocalStorage from '../hooks/useLocalStorage'

type Theme = 'light' | 'dark';
export type ThemeContextType = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
};


export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [themeMode, setThemeMode] = useLocalStorage<Theme>('mode','light');


  //gets browsers colour mode.
  useEffect(() => {
    const onSelectMode = (mode:Theme) => {
      //if dark dont change as if it's dark has to be user set. 
      setThemeMode((theme:Theme)=>theme === 'dark'?'dark':mode)
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => onSelectMode(e.matches ? 'dark' : 'light'));
    onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
      });
    }
  }, [setThemeMode]);
  return (
    <ThemeContext.Provider value={{ theme: themeMode, changeTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;