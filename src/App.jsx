import { ThemeProvider } from '@mui/material';

import './App.css';
import Table from './components/Table';
import { useTheme } from './hooks/useTheme';
import { useEffect } from 'react';

function App() {
  const { theme, themeMode, toggleTheme } = useTheme();
  useEffect(() => {
    if (themeMode === 'light') {
      document.body.style.backgroundColor = '#fff';
    } else {
      document.body.style.backgroundColor = '#0F1924';
    }
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <button onClick={toggleTheme} className="toggleThemeButton">
          Изменить тему на {themeMode === 'light' ? 'Темную' : 'Светлую'}
        </button>
        <Table />
      </div>
    </ThemeProvider>
  );
}

export default App;
