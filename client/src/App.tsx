import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import { SearchState, SearchStateDefaults } from './data/SearchState';
import { ServerData } from './data/ServerData';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ServerDetails from './pages/ServerDetails';

export function App() {
  const [servers, setServers] = useState<ServerData[]>([]);

  const [searchState, setSearchState] =
    useState<SearchState>(SearchStateDefaults);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        servers={servers}
        setServers={setServers}
        searchState={searchState}
        setSearchState={setSearchState}
      />
      <Container className="grow p-0">
        <Box className="m-2">
          <Routes>
            <Route
              path="/"
              element={<Home servers={servers} searchState={searchState} />}
            />
            <Route path="/server/:url" element={<ServerDetails />} />
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
