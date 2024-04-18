import { useMediaQuery } from '@mui/material';
import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

type ThemeContextType = {
  switchColorMode: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  switchColorMode: () => {},
});

export function ThemeContextProvider({ children }: ThemeProviderProps) {
  const rootElement = document.getElementById('root');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const manualTheme = localStorage.getItem('theme');
    if (manualTheme && (manualTheme === 'light' || manualTheme === 'dark')) {
      return manualTheme;
    }
    return prefersDarkMode ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const switchColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
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
      }),
    [rootElement, mode]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider
        value={
          // eslint-disable-next-line react/jsx-no-constructed-context-values
          { switchColorMode }
        }
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
