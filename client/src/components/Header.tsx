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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData, fetchDemo } from '../apiUtil';
import SearchState from '../data/SearchState';
import ServerData from '../data/ServerData';
import AddServer from './AddServer';
import { AlertResponse } from './Alert';
import SearchServers from './SearchServers';

export default function Header({
  setAlertInfo,
  servers,
  setServers,
  searchState,
}: {
  setAlertInfo: React.Dispatch<React.SetStateAction<AlertResponse>>;
  servers: ServerData[];
  setServers: React.Dispatch<React.SetStateAction<ServerData[]>>;
  searchState: SearchState;
}) {
  const [fetchLoading, setFetchLoading] = useState(0);
  const [showSearchServer, setShowSearchServer] = useState(false);
  const toggleShowSearchServer = () => {
    setShowSearchServer((prev) => !prev);
  };

  const fetchServerData = async () => {
    let data: ServerData[] = [];
    try {
      setFetchLoading(25);
      data = await fetchData();
    } catch (err) {
      if (err instanceof Error) {
        setAlertInfo({
          message: err.message,
          severity: 'error',
        });
      } else {
        setAlertInfo({
          message: 'An unknown error occurred.',
          severity: 'error',
        });
      }
    }
    setFetchLoading(50);
    if (data.length === 0) {
      data.push(await fetchDemo());
    }
    setFetchLoading(75);
    setServers(data);
    setFetchLoading(100);
    setTimeout(() => {
      setFetchLoading(0);
    }, 500);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className="min-h-min py-1">
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              userSelect: 'none',
              flexGrow: 1,
            }}
          >
            IXION
          </Typography>
          <AddServer
            setAlertInfo={setAlertInfo}
            servers={servers}
            setServers={setServers}
          />
          <Tooltip arrow disableInteractive title="Refresh server data.">
            <IconButton onClick={fetchServerData} disabled={fetchLoading !== 0}>
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
        value={fetchLoading}
        sx={{
          visibility: fetchLoading === 0 ? 'hidden' : 'visible',
          height: fetchLoading === 0 ? 0 : '1px',
        }}
      />
      <SearchServers
        showSearchServer={showSearchServer}
        searchState={searchState}
      />
    </Box>
  );
}
