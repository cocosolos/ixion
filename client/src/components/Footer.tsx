import { Brightness4, Brightness7, QuestionMark } from '@mui/icons-material';
import { AppBar, Box, Toolbar, Tooltip, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to the top of the page smoothly
}

export default function Footer() {
  const theme = useTheme();
  const { switchColorMode } = useContext(ThemeContext);

  return (
    <Box className="bottom-0 w-full flex-none">
      <AppBar position="relative">
        <Toolbar className="min-h-min justify-between">
          <Box>
            <Tooltip title="Support Me" arrow disableInteractive>
              <a
                href="https://ko-fi.com/A0A7WFPSL"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  style={{
                    maxHeight: '2.5em',
                    verticalAlign: 'middle',
                  }}
                  src="https://storage.ko-fi.com/cdn/brandasset/kofi_s_logo_nolabel.png"
                  alt="Buy Me a Coffee at ko-fi.com"
                />
              </a>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title="About" arrow disableInteractive>
              <IconButton component={Link} to="/about" onClick={scrollToTop}>
                <QuestionMark />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Theme" arrow disableInteractive>
              <IconButton onClick={switchColorMode}>
                {theme.palette.mode === 'dark' ? (
                  <Brightness7 />
                ) : (
                  <Brightness4 />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
