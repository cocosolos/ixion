import { RestartAlt, Sort } from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Input,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchState, SearchStateDefaults } from '../../data/SearchState';

type SearchServersProps = {
  showSearchServer: boolean;
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
};

export default function SearchServers({
  showSearchServer,
  searchState,
  setSearchState,
}: SearchServersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [initialPath] = useState(location.pathname);
  const [contentHeight, setContentHeight] = useState(0);

  function parseSearchParams(searchParams: string): SearchState {
    const params = new URLSearchParams(searchParams);
    const parsedState = SearchStateDefaults;

    const keys = Object.keys(SearchStateDefaults) as Array<keyof SearchState>;

    keys.forEach((key) => {
      if (params.has(key)) {
        const value = params.get(key) as string;
        const decodedValue = decodeURIComponent(value);

        if (key === 'maxLevel') {
          const maxLevelArray = decodedValue.split(',').map(Number);
          parsedState[key] =
            maxLevelArray.length === 1 ? [1, maxLevelArray[0]] : maxLevelArray;
        } else if (key === 'expansionsEnabled') {
          parsedState[key] = decodedValue.split(',') as string[];
        } else {
          parsedState[key] = decodedValue;
        }
      }
    });

    return parsedState as SearchState;
  }

  useEffect(() => {
    // Populate search state with URL params only if loading the home page
    // Home page manages updating URL params
    if (initialPath === '/') {
      const params = parseSearchParams(location.search);
      if (params !== SearchStateDefaults) {
        setSearchState(params);
      }
    }
    if (showSearchServer && containerRef.current) {
      setContentHeight(containerRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [showSearchServer, location.search, setSearchState, initialPath]);

  const handleChange = (
    name: string,
    value: string | string[] | number | number[],
    activeThumb?: number
  ) => {
    let newValue = value;
    if (name === 'maxLevel') {
      if (
        !Array.isArray(value) ||
        !value.every((item) => typeof item === 'number')
      ) {
        return;
      }
      newValue = [
        activeThumb === 0
          ? Math.min((newValue as number[])[0], searchState.maxLevel[1])
          : searchState.maxLevel[0],
        activeThumb === 0
          ? searchState.maxLevel[1]
          : Math.max((newValue as number[])[1], searchState.maxLevel[0]),
      ];
    }
    setSearchState({ ...searchState, [name]: newValue });
  };

  const handleSearchExpansions = (
    _event: React.MouseEvent<HTMLElement>,
    newSearchExpansions: string[]
  ) => {
    if (newSearchExpansions.length === 0) {
      setSearchState({ ...searchState, expansionsEnabled: null });
    } else if (
      searchState.expansionsEnabled &&
      searchState.expansionsEnabled.includes('none') &&
      newSearchExpansions.length > 1
    ) {
      setSearchState({
        ...searchState,
        expansionsEnabled: newSearchExpansions.filter(
          (item) => item !== 'none'
        ),
      });
    } else if (
      searchState.expansionsEnabled &&
      !searchState.expansionsEnabled.includes('none') &&
      newSearchExpansions.includes('none')
    ) {
      setSearchState({ ...searchState, expansionsEnabled: ['none'] });
    } else {
      setSearchState({
        ...searchState,
        expansionsEnabled: newSearchExpansions,
      });
    }
  };

  return (
    <Box
      ref={containerRef}
      className="overflow-hidden"
      sx={{
        transition: 'all 0.3s ease',
        maxHeight: showSearchServer ? contentHeight : 0,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .06)'
            : 'rgba(0, 0, 0, .06)',
        boxShadow: 'inset 0em 3em 5em -5em black,inset 0em -3em 5em -6em black',
      }}
    >
      <Container>
        <Grid container spacing={2} className="py-2">
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              value={searchState.name}
              onChange={(event) => {
                handleChange('name', event.target.value);
              }}
              variant="standard"
              autoComplete="false"
              fullWidth
              label="Name"
              size="small"
              className="pb-2"
            />
          </Grid>
          {/* Max Level */}
          <Grid
            item
            xs={12}
            className="pt-0"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="max-level" variant="caption">
              Max Level
            </Typography>
          </Grid>
          <Grid item xs={12} className="flex pt-0">
            <Input
              value={searchState.maxLevel[0]}
              size="small"
              onChange={(event) => {
                let value = parseInt(event.target.value, 10);
                if (Number.isNaN(value) || value < 1) {
                  value = 1;
                } else if (value > 99) {
                  value = 99;
                }
                handleChange('maxLevel', [value, searchState.maxLevel[1]], 0);
              }}
              // onBlur={handleBlur}
              inputProps={{
                name: 'max-level-min',
                step: 1,
                min: 1,
                max: 99,
                type: 'number',
                'aria-labelledby': 'max-level',
              }}
            />
            <Slider
              aria-labelledby="max-level"
              value={searchState.maxLevel}
              onChange={(_event, value, activeThumb) => {
                handleChange('maxLevel', value, activeThumb);
              }}
              valueLabelDisplay="auto"
              disableSwap
              className="mx-4"
              size="small"
              min={1}
              max={99}
            />
            <Input
              value={searchState.maxLevel[1]}
              size="small"
              onChange={(event) => {
                let value = parseInt(event.target.value, 10);
                if (Number.isNaN(value) || value < 1) {
                  value = 1;
                } else if (value > 99) {
                  value = 99;
                }
                handleChange('maxLevel', [searchState.maxLevel[0], value], 1);
              }}
              // onBlur={handleBlur}
              inputProps={{
                name: 'max-level-max',
                step: 1,
                min: 1,
                max: 99,
                type: 'number',
                'aria-labelledby': 'max-level',
              }}
            />
          </Grid>
          {/* Expansion */}
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Tooltip
              title="Enabled expansions, exact match."
              arrow
              disableInteractive
              placement="top"
            >
              <Typography id="expansions-button-group" variant="caption">
                Expansions
              </Typography>
            </Tooltip>
            <ToggleButtonGroup
              value={searchState.expansionsEnabled}
              onChange={handleSearchExpansions}
              size="small"
              aria-labelledby="expansions-button-group"
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                key="none"
                value="none"
                aria-label="none-enabled"
                className="py-0"
                sx={{ width: '20%' }}
              >
                None
              </ToggleButton>
              <ToggleButton
                key="rotz"
                value="rotz"
                aria-label="rotz-enabled"
                className="py-0"
                sx={{ width: '20%' }}
              >
                RotZ
              </ToggleButton>
              <ToggleButton
                key="cop"
                value="cop"
                aria-label="cop-enabled"
                className="py-0"
                sx={{ width: '20%' }}
              >
                CoP
              </ToggleButton>
              <ToggleButton
                key="toau"
                value="toau"
                aria-label="toau-enabled"
                className="py-0"
                sx={{ width: '20%' }}
              >
                ToAU
              </ToggleButton>
              <ToggleButton
                key="wotg"
                value="wotg"
                aria-label="wotg-enabled"
                className="py-0"
                sx={{ width: '20%' }}
              >
                WotG
              </ToggleButton>
              <ToggleButton
                key="soa"
                value="soa"
                aria-label="soa-enabled"
                className="py-0"
                sx={{ width: '20%' }}
              >
                SoA
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Multiboxing */}
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="multibox-button-group" variant="caption">
              Multiboxing
            </Typography>
            <ToggleButtonGroup
              value={searchState.multibox}
              onChange={(_event, value) => {
                handleChange('multibox', value);
              }}
              size="small"
              aria-labelledby="multibox-button-group"
              sx={{
                display: 'flex',
                width: '100%',
              }}
              exclusive
            >
              <ToggleButton
                value="none"
                aria-label="no-multiboxing"
                className="py-0"
                sx={{ width: '33.33%' }}
              >
                None
              </ToggleButton>
              <ToggleButton
                value="limited"
                aria-label="limited-multiboxing"
                className="py-0"
                sx={{ width: '33.33%' }}
              >
                Limited
              </ToggleButton>
              <ToggleButton
                value="unlimited"
                aria-label="unlimited-multiboxing"
                className="py-0"
                sx={{ width: '33.33%' }}
              >
                Unlimited
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Trusts */}
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="trust-button-group" variant="caption">
              Trusts
            </Typography>
            <ToggleButtonGroup
              value={searchState.trusts}
              onChange={(_event, value) => {
                handleChange('trusts', value);
              }}
              size="small"
              aria-labelledby="trust-button-group"
              exclusive
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                value="disabled"
                aria-label="trust-disabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Disabled
              </ToggleButton>
              <ToggleButton
                value="enabled"
                aria-label="trust-enabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Enabled
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Level Sync */}
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="level-sync-button-group" variant="caption">
              Level Sync
            </Typography>
            <ToggleButtonGroup
              value={searchState.levelSync}
              onChange={(_event, value) => {
                handleChange('levelSync', value);
              }}
              size="small"
              aria-labelledby="level-sync-button-group"
              exclusive
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                value="disabled"
                aria-label="level-sync-disabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Disabled
              </ToggleButton>
              <ToggleButton
                value="enabled"
                aria-label="level-sync-enabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Enabled
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Home Point Teleport */}
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="home-point-button-group" variant="caption">
              Home Point Teleport
            </Typography>
            <ToggleButtonGroup
              value={searchState.homePoint}
              onChange={(_event, value) => {
                handleChange('homePoint', value);
              }}
              size="small"
              aria-labelledby="home-point-button-group"
              exclusive
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                value="disabled"
                aria-label="home-point-disabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Disabled
              </ToggleButton>
              <ToggleButton
                value="enabled"
                aria-label="home-point-enabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Enabled
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Survival Guide Teleport */}
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="survival-guide-button-group" variant="caption">
              Survival Guides
            </Typography>
            <ToggleButtonGroup
              value={searchState.survivalGuide}
              onChange={(_event, value) => {
                handleChange('survivalGuide', value);
              }}
              size="small"
              aria-labelledby="survival-guide-button-group"
              exclusive
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                value="disabled"
                aria-label="survival-guide-disabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Disabled
              </ToggleButton>
              <ToggleButton
                value="enabled"
                aria-label="survival-guide-enabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Enabled
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Fields of Valor */}
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="fields-of-valor-button-group" variant="caption">
              Fields of Valor
            </Typography>
            <ToggleButtonGroup
              value={searchState.fov}
              onChange={(_event, value) => {
                handleChange('fov', value);
              }}
              size="small"
              aria-labelledby="fields-of-valor-button-group"
              exclusive
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                value="disabled"
                aria-label="fields-of-valor-disabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Disabled
              </ToggleButton>
              <ToggleButton
                value="enabled"
                aria-label="fields-of-valor-enabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Enabled
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Grounds of Valor */}
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="grounds-of-valor-button-group" variant="caption">
              Grounds of Valor
            </Typography>
            <ToggleButtonGroup
              value={searchState.gov}
              onChange={(_event, value) => {
                handleChange('gov', value);
              }}
              size="small"
              aria-labelledby="grounds-of-valor-button-group"
              exclusive
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                value="disabled"
                aria-label="grounds-of-valor-disabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Disabled
              </ToggleButton>
              <ToggleButton
                value="enabled"
                aria-label="grounds-of-valor-enabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Enabled
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Records of Eminence */}
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography id="roe-button-group" variant="caption">
              Records of Eminence
            </Typography>
            <ToggleButtonGroup
              value={searchState.roe}
              onChange={(_event, value) => {
                handleChange('roe', value);
              }}
              size="small"
              aria-labelledby="records-of-eminence-button-group"
              exclusive
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              <ToggleButton
                value="disabled"
                aria-label="records-of-eminence-disabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Disabled
              </ToggleButton>
              <ToggleButton
                value="enabled"
                aria-label="records-of-eminence-enabled"
                className="py-0"
                sx={{ width: '50%' }}
              >
                Enabled
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box className="flex min-w-full justify-end pt-2">
              <Tooltip title="Sort" arrow disableInteractive placement="top">
                <IconButton
                // onClick={() => {
                //   setSearchState(SearchStateDefaults);
                // }}
                >
                  <Sort />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Reset filters."
                arrow
                disableInteractive
                placement="top"
              >
                <IconButton
                  onClick={() => {
                    if (location.pathname === '/') {
                      window.history.replaceState({}, '', '/');
                    }
                    setSearchState(SearchStateDefaults);
                  }}
                >
                  <RestartAlt />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
