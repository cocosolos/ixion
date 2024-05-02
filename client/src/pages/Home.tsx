import { Box } from '@mui/material';
import ErrorCard from '../components/ErrorCard';
import ServerCard from '../components/ServerCard';
import SearchState from '../data/SearchState';
import ServerData from '../data/ServerData';

export default function Home({
  servers,
  searchState,
}: {
  servers: ServerData[];
  searchState: SearchState;
}) {
  const filterServers = (server: ServerData): boolean => {
    if (searchState.name.length > 0) {
      const serverName = server.name.toLowerCase();
      if (!serverName.includes(searchState.name.toLowerCase())) {
        return false;
      }
    }

    if (server.max_level < searchState.maxLevel[0]) {
      return false;
    }
    if (server.max_level > searchState.maxLevel[1]) {
      return false;
    }

    if (
      searchState.trusts &&
      typeof server.customizations['MAIN.ENABLE_TRUST_CASTING'] === 'number'
    ) {
      const serverTrusts =
        server.customizations['MAIN.ENABLE_TRUST_CASTING'] === 1;
      const searchEnabled = searchState.trusts.includes('enabled');
      const searchDisabled = searchState.trusts.includes('disabled');
      if (serverTrusts && searchDisabled && !searchEnabled) {
        return false;
      }
      if (!serverTrusts && searchEnabled && !searchDisabled) {
        return false;
      }
    }

    if (
      searchState.levelSync &&
      typeof server.customizations['MAP.LEVEL_SYNC_ENABLE'] === 'boolean'
    ) {
      const serverLevelSync = server.customizations['MAP.LEVEL_SYNC_ENABLE'];
      const searchEnabled = searchState.levelSync.includes('enabled');
      const searchDisabled = searchState.levelSync.includes('disabled');
      if (serverLevelSync && searchDisabled && !searchEnabled) {
        return false;
      }
      if (!serverLevelSync && searchEnabled && !searchDisabled) {
        return false;
      }
    }

    if (searchState.expansions) {
      const searchNoneEnabled = searchState.expansions.includes('none');
      const searchRotzEnabled = searchState.expansions.includes('rotz');
      const serverRotzEnabled =
        server.customizations['LOGIN.RISE_OF_ZILART'] === true;
      const searchCopEnabled = searchState.expansions.includes('cop');
      const serverCopEnabled =
        server.customizations['LOGIN.CHAINS_OF_PROMATHIA'] === true;
      const searchToauEnabled = searchState.expansions.includes('toau');
      const serverToauEnabled =
        server.customizations['LOGIN.TREASURES_OF_AHT_URGHAN'] === true;
      const searchWotgEnabled = searchState.expansions.includes('wotg');
      const serverWotgEnabled =
        server.customizations['LOGIN.WINGS_OF_THE_GODDESS'] === true;
      const searchSoaEnabled = searchState.expansions.includes('soa');
      const serverSoaEnabled =
        server.customizations['LOGIN.SEEKERS_OF_ADOULIN'] === true;
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

    if (searchState.multibox) {
      const serverMultibox = server.login_limit;
      if (searchState.multibox.includes('none') && serverMultibox !== 1) {
        return false;
      }
      if (searchState.multibox.includes('unlimited') && serverMultibox !== 0) {
        return false;
      }
      if (
        searchState.multibox.includes('limited') &&
        !searchState.multibox.includes('unlimited') &&
        serverMultibox < 2
      ) {
        return false;
      }
    }

    return true;
  };

  const filteredServers = servers.filter(filterServers);

  return (
    <Box>
      {filteredServers.length === 0 ? (
        <ErrorCard error="" />
      ) : (
        filteredServers.map((server: ServerData) => (
          <ServerCard key={server.id} server={server} />
        ))
      )}
    </Box>
  );
}
