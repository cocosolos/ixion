import { Refresh, Search } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  LinearProgress,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchDataFromBackend } from '../../apiUtil';
import { useLoadingContext } from '../../context/LoadingContext';
import { useThemeModeContext } from '../../context/ThemeContext';
import { SearchState, SearchStateDefaults } from '../../data/SearchState';
import { ServerData } from '../../data/ServerData';
import AlertComponent from '../Alert';
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
  const location = useLocation();
  const { themeMode } = useThemeModeContext();
  const { progress, setProgress, showAlert } = useLoadingContext();
  const [showSearchServer, setShowSearchServer] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);
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
    if (!initialFetch) {
      fetchServerData();
      setInitialFetch(true);
    }
    setFiltersApplied(
      JSON.stringify(searchState) !== JSON.stringify(SearchStateDefaults)
    );
  }, [initialFetch, fetchServerData, searchState]);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ boxShadow: themeMode === 'light' ? 8 : 3 }}
      >
        <Toolbar className="min-h-min py-1">
          <Typography
            component={Link}
            to="/"
            variant="h6"
            id="title"
            sx={{
              flexGrow: 1,
            }}
            onClick={(event) => {
              if (location.pathname === '/') {
                event.preventDefault();
              }
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
              <Badge color="error" variant="dot" invisible={!filtersApplied}>
                <Search />
              </Badge>
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
      <AlertComponent />
      <SearchServers
        showSearchServer={showSearchServer}
        searchState={searchState}
        setSearchState={setSearchState}
      />
    </Box>
  );
}
