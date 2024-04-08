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
        <Toolbar className="min-h-min justify-end">
          <Tooltip title="About" arrow disableInteractive>
            <IconButton component={Link} to="/about" onClick={scrollToTop}>
              <QuestionMark />
            </IconButton>
          </Tooltip>
          <IconButton onClick={switchColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
