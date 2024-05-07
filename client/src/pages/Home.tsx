import { Box } from '@mui/material';
import ErrorCard from '../components/ErrorCard';
import SettingsChipCloud from '../components/Server/SettingsChipCloud';
import ServerCard from '../components/ServerCard';
import { SearchState } from '../data/SearchState';
import { ServerData } from '../data/ServerData';

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
      typeof server.settings_summary['MAIN.ENABLE_TRUST_CASTING'] === 'number'
    ) {
      const serverTrusts =
        server.settings_summary['MAIN.ENABLE_TRUST_CASTING'] === 1;
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
      typeof server.settings_summary['MAP.LEVEL_SYNC_ENABLE'] === 'boolean'
    ) {
      const serverLevelSync = server.settings_summary['MAP.LEVEL_SYNC_ENABLE'];
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
      if (!server.expansions) {
        return false;
      }
      if (
        searchState.expansions.includes('none') &&
        (server.expansions.rotz ||
          server.expansions.cop ||
          server.expansions.toau ||
          server.expansions.wotg ||
          server.expansions.soa)
      ) {
        return false;
      }
      if (searchState.expansions.includes('rotz') && server.expansions.rotz) {
        return false;
      }
      if (searchState.expansions.includes('cop') && server.expansions.cop) {
        return false;
      }
      if (searchState.expansions.includes('toau') && server.expansions.toau) {
        return false;
      }
      if (searchState.expansions.includes('wotg') && server.expansions.wotg) {
        return false;
      }
      if (searchState.expansions.includes('soa') && server.expansions.soa) {
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
          <ServerCard key={server.url} server={server}>
            <SettingsChipCloud server={server} />
          </ServerCard>
        ))
      )}
    </Box>
  );
}
