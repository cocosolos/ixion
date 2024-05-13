import { Box } from '@mui/material';
import { useEffect } from 'react';
import ErrorCard from '../components/ErrorCard';
import ServerCard from '../components/Server/ServerCard';
import SettingsChipCloud from '../components/Server/SettingsChipCloud';
import { SearchState, SearchStateDefaults } from '../data/SearchState';
import { ServerData } from '../data/ServerData';

function serializeSearchState(search: SearchState): string {
  const params = new URLSearchParams();

  Object.entries(search).forEach(([key, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      !(key === 'name' && value === SearchStateDefaults.name) &&
      !(
        key === 'maxLevel' &&
        JSON.stringify(value) === JSON.stringify(SearchStateDefaults.maxLevel)
      )
    ) {
      if (Array.isArray(value)) {
        if (key === 'maxLevel') {
          if (value[0] === value[1]) {
            params.append(key, JSON.stringify(value[0]));
            return;
          }
        }
        params.append(key, value.join(' '));
      } else {
        params.append(key, value);
      }
    }
  });

  return params.toString();
}

type HomeProps = {
  servers: ServerData[];
  searchState: SearchState;
};

export default function Home({ servers, searchState }: HomeProps) {
  useEffect(() => {
    // Update URL params whenever search state changes
    const searchParams = serializeSearchState(searchState);
    if (searchParams.length !== 0) {
      window.history.replaceState({}, '', `?${searchParams}`);
    } else {
      window.history.replaceState({}, '', '/');
    }
  }, [searchState]);

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
      searchState.roe &&
      typeof server.settings_summary['MAIN.ENABLE_ROE'] === 'number'
    ) {
      const serverEnabled = server.settings_summary['MAIN.ENABLE_ROE'] === 1;
      const searchEnabled = searchState.roe.includes('enabled');
      const searchDisabled = searchState.roe.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Fields of Valor
    if (
      searchState.fov &&
      typeof server.settings_summary['MAIN.ENABLE_FIELD_MANUALS'] === 'number'
    ) {
      const serverEnabled =
        server.settings_summary['MAIN.ENABLE_FIELD_MANUALS'] === 1;
      const searchEnabled = searchState.fov.includes('enabled');
      const searchDisabled = searchState.fov.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Grounds of Valor
    if (
      searchState.gov &&
      typeof server.settings_summary['MAIN.ENABLE_GROUNDS_TOMES'] === 'number'
    ) {
      const serverEnabled =
        server.settings_summary['MAIN.ENABLE_GROUNDS_TOMES'] === 1;
      const searchEnabled = searchState.gov.includes('enabled');
      const searchDisabled = searchState.gov.includes('disabled');
      if (
        (serverEnabled && searchDisabled && !searchEnabled) ||
        (!serverEnabled && searchEnabled && !searchDisabled)
      ) {
        return false;
      }
    }
    // Expansions
    if (searchState.expansionsEnabled) {
      if (!server.expansions) {
        return false;
      }
      if (
        searchState.expansionsEnabled.includes('none') &&
        (server.expansions.rotz ||
          server.expansions.cop ||
          server.expansions.toau ||
          server.expansions.wotg ||
          server.expansions.soa)
      ) {
        return false;
      }
      if (
        searchState.expansionsEnabled.includes('rotz') !==
        server.expansions.rotz
      ) {
        return false;
      }
      if (
        searchState.expansionsEnabled.includes('cop') !== server.expansions.cop
      ) {
        return false;
      }
      if (
        searchState.expansionsEnabled.includes('toau') !==
        server.expansions.toau
      ) {
        return false;
      }
      if (
        searchState.expansionsEnabled.includes('wotg') !==
        server.expansions.wotg
      ) {
        return false;
      }
      if (
        searchState.expansionsEnabled.includes('soa') !== server.expansions.soa
      ) {
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
