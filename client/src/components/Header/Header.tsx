import { Refresh, Search } from '@mui/icons-material';
import {
  AppBar,
  Box,
  LinearProgress,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDataFromBackend } from '../../apiUtil';
import { useLoadingContext } from '../../context/LoadingContext';
import { useThemeModeContext } from '../../context/ThemeContext';
import { SearchState } from '../../data/SearchState';
import { ServerData } from '../../data/ServerData';
import AddServer from './AddServer';
import SearchServers from './SearchServers';

type HeaderProps = {
  servers: ServerData[];
  setServers: React.Dispatch<React.SetStateAction<ServerData[]>>;
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
};

export default function Header({
  servers,
  setServers,
  searchState,
  setSearchState,
}: HeaderProps) {
  const { themeMode } = useThemeModeContext();
  const { progress, setProgress, showAlert } = useLoadingContext();
  const [showSearchServer, setShowSearchServer] = useState(false);
  const toggleShowSearchServer = () => {
    setShowSearchServer((prev) => !prev);
  };

  const fetchServerData = useCallback(async () => {
    let data: ServerData[] = [];
    try {
      setProgress(25);
      data = await fetchDataFromBackend();
    } catch (err) {
      if (err instanceof Error) {
        showAlert({
          message: err.message,
          severity: 'error',
        });
      } else {
        showAlert({
          message: 'An unknown error occurred.',
          severity: 'error',
        });
      }
    }
    setServers(data);
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
    }, 500);
  }, [showAlert, setServers, setProgress]);

  useEffect(() => {
    fetchServerData();
  }, [fetchServerData]);

  return (
    <Box>
      <AppBar position="static" elevation={themeMode === 'light' ? 8 : 3}>
        <Toolbar className="min-h-min py-1">
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            IXION
          </Typography>
          <AddServer servers={servers} setServers={setServers} />
          <Tooltip arrow disableInteractive title="Refresh server data.">
            <IconButton onClick={fetchServerData} disabled={progress !== 0}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip arrow disableInteractive title="Filter servers.">
            <IconButton onClick={toggleShowSearchServer}>
              <Search />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          visibility: progress === 0 ? 'hidden' : 'visible',
          height: progress === 0 ? 0 : '1px',
        }}
      />
      <SearchServers
        showSearchServer={showSearchServer}
        searchState={searchState}
        setSearchState={setSearchState}
      />
    </Box>
  );
}