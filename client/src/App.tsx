import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AlertComponent from './components/Alert';
import Footer from './components/Footer';
import Header from './components/Header';
import SearchState from './data/SearchState';
import ServerData from './data/ServerData';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function App() {
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
  } | null>(null);
  const [servers, setServers] = useState<ServerData[]>([]);

  const [searchName, setSearchName] = useState('');
  const [searchMultibox, setSearchMultibox] = useState<string[] | null>(null);
  const [searchTrusts, setSearchTrusts] = useState<string[] | null>(null);
  const [searchLevelSync, setSearchLevelSync] = useState<string[] | null>(null);
  const [searchMaxLevel, setSearchMaxLevel] = useState<number[]>([1, 99]);
  const [searchExpansions, setSearchExpansions] = useState<string[] | null>(
    null
  );

  const searchState: SearchState = {
    name: { value: searchName, setValue: setSearchName },
    multibox: { value: searchMultibox, setValue: setSearchMultibox },
    trusts: { value: searchTrusts, setValue: setSearchTrusts },
    levelSync: { value: searchLevelSync, setValue: setSearchLevelSync },
    maxLevel: { value: searchMaxLevel, setValue: setSearchMaxLevel },
    expansions: { value: searchExpansions, setValue: setSearchExpansions },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        setAlertInfo={setAlertInfo}
        servers={servers}
        setServers={setServers}
        searchState={searchState}
      />
      <AlertComponent alertInfo={alertInfo} setAlertInfo={setAlertInfo} />
      <Container className="grow p-0">
        <Box className="m-2">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  servers={servers}
                  setServers={setServers}
                  searchState={searchState}
                  setAlertInfo={setAlertInfo}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
