import { createTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    setThemeMode(savedTheme || 'light');
  }, []);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'dark'
        ? {
            background: {
              default: '#121212',
              paper: '#333',
            },
            text: {
              primary: '#fff',
              secondary: '#aaa',
            },
          }
        : {
            background: {
              default: '#fff',
              paper: '#fafafa',
            },
            text: {
              primary: '#000',
              secondary: '#333',
            },
          }),
    },
  });

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('themeMode', newTheme);
  };

  return { theme, themeMode, toggleTheme };
};
