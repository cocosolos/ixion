import { useMediaQuery } from '@mui/material';
import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type ThemeMode = 'dark' | 'light';

type ThemeModeState = {
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
};

export const ThemeModeContext = createContext<ThemeModeState | null>(null);

type ThemeModeContextProviderProps = {
  children: ReactNode;
};

export function ThemeContextProvider({
  children,
}: ThemeModeContextProviderProps) {
  const rootElement = document.getElementById('root');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const manualThemeMode = localStorage.getItem('themeMode') as ThemeMode;
    if (manualThemeMode) {
      return manualThemeMode;
    }
    return prefersDarkMode ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode as ThemeMode);
  }, [themeMode]);

  const muiTheme = createTheme({
    palette: {
      mode: themeMode,
    },
    // All `Portal`-related components need to have the the main app wrapper element as a container
    // so that they are in the subtree under the element used in the `important` option of the Tailwind's config.
    components: {
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: rootElement,
        },
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeModeContext.Provider
        value={
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          { themeMode, setThemeMode }
        }
      >
        <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
      </ThemeModeContext.Provider>
    </StyledEngineProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeModeContext() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('Theme context error.');
  }
  return context;
}
