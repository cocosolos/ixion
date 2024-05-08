import { Box } from '@mui/material';
import ErrorCard from '../components/ErrorCard';
import ServerCard from '../components/Server/ServerCard';
import SettingsChipCloud from '../components/Server/SettingsChipCloud';
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
    // Name
    if (searchState.name.length > 0) {
      const serverName = server.name.toLowerCase();
      if (!serverName.includes(searchState.name.toLowerCase())) {
        return false;
      }
    }
    // Max Level
    if (server.max_level < searchState.maxLevel[0]) {
      return false;
    }
    if (server.max_level > searchState.maxLevel[1]) {
      return false;
    }
    // Trusts
    if (
      searchState.trusts &&
      typeof server.settings_summary['MAIN.ENABLE_TRUST_CASTING'] === 'number'
    ) {
      const serverEnabled =
        server.settings_summary['MAIN.ENABLE_TRUST_CASTING'] === 1;
      const searchEnabled = searchState.trusts.includes('enabled');
      const searchDisabled = searchState.trusts.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Level Sync
    if (
      searchState.levelSync &&
      typeof server.settings_summary['MAP.LEVEL_SYNC_ENABLE'] === 'boolean'
    ) {
      const serverEnabled = server.settings_summary['MAP.LEVEL_SYNC_ENABLE'];
      const searchEnabled = searchState.levelSync.includes('enabled');
      const searchDisabled = searchState.levelSync.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Home Point Teleport
    if (
      searchState.homePoint &&
      typeof server.settings_summary['MAIN.HOMEPOINT_TELEPORT'] === 'number'
    ) {
      const serverEnabled =
        server.settings_summary['MAIN.HOMEPOINT_TELEPORT'] === 1;
      const searchEnabled = searchState.homePoint.includes('enabled');
      const searchDisabled = searchState.homePoint.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Survival Guides
    if (
      searchState.survivalGuide &&
      typeof server.settings_summary['MAIN.ENABLE_SURVIVAL_GUIDE'] === 'number'
    ) {
      const serverEnabled =
        server.settings_summary['MAIN.ENABLE_SURVIVAL_GUIDE'] === 1;
      const searchEnabled = searchState.survivalGuide.includes('enabled');
      const searchDisabled = searchState.survivalGuide.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Records of Eminence
    if (
      searchState.recordsOfEminence &&
      typeof server.settings_summary['MAIN.ENABLE_ROE'] === 'number'
    ) {
      const serverEnabled = server.settings_summary['MAIN.ENABLE_ROE'] === 1;
      const searchEnabled = searchState.recordsOfEminence.includes('enabled');
      const searchDisabled = searchState.recordsOfEminence.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Fields of Valor
    if (
      searchState.fieldsOfValor &&
      typeof server.settings_summary['MAIN.ENABLE_FIELD_MANUALS'] === 'number'
    ) {
      const serverEnabled =
        server.settings_summary['MAIN.ENABLE_FIELD_MANUALS'] === 1;
      const searchEnabled = searchState.fieldsOfValor.includes('enabled');
      const searchDisabled = searchState.fieldsOfValor.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Grounds of Valor
    if (
      searchState.groundsOfValor &&
      typeof server.settings_summary['MAIN.ENABLE_GROUNDS_TOMES'] === 'number'
    ) {
      const serverEnabled =
        server.settings_summary['MAIN.ENABLE_GROUNDS_TOMES'] === 1;
      const searchEnabled = searchState.groundsOfValor.includes('enabled');
      const searchDisabled = searchState.groundsOfValor.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Expansions
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
      if (searchState.expansions.includes('rotz') !== server.expansions.rotz) {
        return false;
      }
      if (searchState.expansions.includes('cop') !== server.expansions.cop) {
        return false;
      }
      if (searchState.expansions.includes('toau') !== server.expansions.toau) {
        return false;
      }
      if (searchState.expansions.includes('wotg') !== server.expansions.wotg) {
        return false;
      }
      if (searchState.expansions.includes('soa') !== server.expansions.soa) {
        return false;
      }
    }
    // Multibox
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
