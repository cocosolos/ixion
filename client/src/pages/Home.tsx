import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchData, fetchDemo } from '../apiUtil';
import { AlertResponse } from '../components/Alert';
import ErrorCard from '../components/ErrorCard';
import ServerCard from '../components/ServerCard';
import SearchState from '../data/SearchState';
import ServerData from '../data/ServerData';

export default function Home({
  servers,
  setServers,
  searchState,
  setAlertInfo,
}: {
  servers: ServerData[];
  setServers: React.Dispatch<React.SetStateAction<ServerData[]>>;
  searchState: SearchState;
  setAlertInfo: React.Dispatch<React.SetStateAction<AlertResponse>>;
}) {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchServerData = async () => {
      let data: ServerData[] = [];
      try {
        data = await fetchData();
      } catch (err) {
        if (err instanceof Error) {
          setAlertInfo({
            message: err.message,
            severity: 'error',
          });
        } else {
          setError('An unknown error occurred.');
        }
      }
      if (data.length === 0) {
        data.push(await fetchDemo());
      }
      setServers(data);
    };

    fetchServerData();
  }, [setAlertInfo, setServers]);

  const filterServers = (server: ServerData): boolean => {
    if (
      searchState.name.value.length > 0 &&
      typeof server.settings['MAIN.SERVER_NAME'] === 'string'
    ) {
      const serverName = server.settings['MAIN.SERVER_NAME'].toLowerCase();
      if (!serverName.includes(searchState.name.value.toLowerCase())) {
        return false;
      }
    }

    if (typeof server.settings['MAIN.MAX_LEVEL'] === 'number') {
      if (server.settings['MAIN.MAX_LEVEL'] < searchState.maxLevel.value[0]) {
        return false;
      }
      if (server.settings['MAIN.MAX_LEVEL'] > searchState.maxLevel.value[1]) {
        return false;
      }
    }

    if (
      searchState.trusts.value &&
      typeof server.settings['MAIN.ENABLE_TRUST_CASTING'] === 'number'
    ) {
      const serverTrusts = server.settings['MAIN.ENABLE_TRUST_CASTING'] === 1;
      const searchEnabled = searchState.trusts.value.includes('enabled');
      const searchDisabled = searchState.trusts.value.includes('disabled');
      if (serverTrusts && searchDisabled && !searchEnabled) {
        return false;
      }
      if (!serverTrusts && searchEnabled && !searchDisabled) {
        return false;
      }
    }

    if (
      searchState.levelSync.value &&
      typeof server.settings['MAP.LEVEL_SYNC_ENABLE'] === 'boolean'
    ) {
      const serverLevelSync = server.settings['MAP.LEVEL_SYNC_ENABLE'];
      const searchEnabled = searchState.levelSync.value.includes('enabled');
      const searchDisabled = searchState.levelSync.value.includes('disabled');
      if (serverLevelSync && searchDisabled && !searchEnabled) {
        return false;
      }
      if (!serverLevelSync && searchEnabled && !searchDisabled) {
        return false;
      }
    }

    if (searchState.expansions.value) {
      const searchNoneEnabled = searchState.expansions.value.includes('none');
      const searchRotzEnabled = searchState.expansions.value.includes('rotz');
      const serverRotzEnabled =
        server.settings['LOGIN.RISE_OF_ZILART'] === true;
      const searchCopEnabled = searchState.expansions.value.includes('cop');
      const serverCopEnabled =
        server.settings['LOGIN.CHAINS_OF_PROMATHIA'] === true;
      const searchToauEnabled = searchState.expansions.value.includes('toau');
      const serverToauEnabled =
        server.settings['LOGIN.TREASURES_OF_AHT_URGHAN'] === true;
      const searchWotgEnabled = searchState.expansions.value.includes('wotg');
      const serverWotgEnabled =
        server.settings['LOGIN.WINGS_OF_THE_GODDESS'] === true;
      const searchSoaEnabled = searchState.expansions.value.includes('soa');
      const serverSoaEnabled =
        server.settings['LOGIN.SEEKERS_OF_ADOULIN'] === true;
      if (
        searchNoneEnabled &&
        (serverRotzEnabled ||
          serverCopEnabled ||
          serverToauEnabled ||
          serverWotgEnabled ||
          serverSoaEnabled)
      ) {
        return false;
      }
      if (searchRotzEnabled !== serverRotzEnabled) {
        return false;
      }
      if (searchCopEnabled !== serverCopEnabled) {
        return false;
      }
      if (searchToauEnabled !== serverToauEnabled) {
        return false;
      }
      if (searchWotgEnabled !== serverWotgEnabled) {
        return false;
      }
      if (searchSoaEnabled !== serverSoaEnabled) {
        return false;
      }
    }

    if (searchState.multibox.value) {
      const serverMultibox = server.settings['LOGIN.LOGIN_LIMIT'];
      if (typeof serverMultibox === 'number') {
        if (
          searchState.multibox.value.includes('none') &&
          serverMultibox !== 1
        ) {
          return false;
        }
        if (
          searchState.multibox.value.includes('unlimited') &&
          serverMultibox !== 0
        ) {
          return false;
        }
        if (
          searchState.multibox.value.includes('limited') &&
          !searchState.multibox.value.includes('unlimited') &&
          serverMultibox < 2
        ) {
          return false;
        }
      }
    }

    return true;
  };

  const filteredServers = servers.filter(filterServers);

  return (
    <Box>
      {error ? (
        <ErrorCard error={error} />
      ) : (
        filteredServers.map((server: ServerData) => (
          <ServerCard key={server.id} server={server} />
        ))
      )}
    </Box>
  );
}
