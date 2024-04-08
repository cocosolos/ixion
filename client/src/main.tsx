import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeContextProvider>
        <CssBaseline />
        <WrappedApp />
      </ThemeContextProvider>
    </StyledEngineProvider>
  </StrictMode>
);
