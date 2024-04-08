import {
  Container,
  Grid,
  Input,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import SearchState from '../data/SearchState';

export default function SearchServers({
  showSearchServer,
  searchState,
}: {
  showSearchServer: boolean;
  searchState: SearchState;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const minDistance = 0;

  useEffect(() => {
    if (showSearchServer && containerRef.current) {
      setContentHeight(containerRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [showSearchServer]);

  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchState.name.setValue(event.target.value);
  };

  const handleSearchMultibox = (
    _event: React.MouseEvent<HTMLElement>,
    newSearchMultibox: string[]
  ) => {
    searchState.multibox.setValue(newSearchMultibox);
  };

  const handleSearchTrusts = (
    _event: React.MouseEvent<HTMLElement>,
    newSearchTrusts: string[]
  ) => {
    searchState.trusts.setValue(newSearchTrusts);
  };

  const handleSearchLevelSync = (
    _event: React.MouseEvent<HTMLElement>,
    newSearchLevelSync: string[]
  ) => {
    searchState.levelSync.setValue(newSearchLevelSync);
  };

  const handleSearchMaxLevelMin = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValue = parseInt(event.target.value, 10);
    if (Number.isNaN(newValue) || newValue < 1) {
      newValue = 1;
    } else if (newValue > 99) {
      newValue = 99;
    }
    searchState.maxLevel.setValue([
      Math.min(newValue, searchState.maxLevel.value[1] - minDistance),
      searchState.maxLevel.value[1],
    ]);
  };

  const handleSearchMaxLevelMax = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newValue = parseInt(event.target.value, 10);
    if (Number.isNaN(newValue) || newValue < 1) {
      newValue = 1;
    } else if (newValue > 99) {
      newValue = 99;
    }
    searchState.maxLevel.setValue([
      searchState.maxLevel.value[0],
      Math.max(newValue, searchState.maxLevel.value[0] + minDistance),
    ]);
  };

  const handleSearchMaxLevel = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      searchState.maxLevel.setValue([
        Math.min(newValue[0], searchState.maxLevel.value[1] - minDistance),
        searchState.maxLevel.value[1],
      ]);
    } else {
      searchState.maxLevel.setValue([
        searchState.maxLevel.value[0],
        Math.max(newValue[1], searchState.maxLevel.value[0] + minDistance),
      ]);
    }
  };

  const handleSearchExpansions = (
    _event: React.MouseEvent<HTMLElement>,
    newSearchExpansions: string[]
  ) => {
    if (newSearchExpansions.length === 0) {
      searchState.expansions.setValue(null);
    } else if (
      searchState.expansions.value &&
      searchState.expansions.value.includes('none') &&
      newSearchExpansions.length > 1
    ) {
      searchState.expansions.setValue(
        newSearchExpansions.filter((item) => item !== 'none')
      );
    } else if (
      searchState.expansions.value &&
      !searchState.expansions.value.includes('none') &&
      newSearchExpansions.includes('none')
    ) {
      searchState.expansions.setValue(['none']);
    } else {
      searchState.expansions.setValue(newSearchExpansions);
    }
  };

  return (
    <Container
      ref={containerRef}
      className="overflow-hidden"
      sx={{
        transition: 'all 0.3s ease',
        maxHeight: showSearchServer ? contentHeight : 0,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .06)'
            : 'rgba(0, 0, 0, .06)',
      }}
    >
      <Grid container spacing={2} className="py-2">
        {/* Name */}
        <Grid item xs={12}>
          <TextField
            value={searchState.name.value}
            onChange={handleSearchName}
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
          <Typography id="max-level-slider" variant="caption">
            Max Level
          </Typography>
        </Grid>
        <Grid item xs={12} className="flex pt-0">
          <Input
            value={searchState.maxLevel.value[0]}
            size="small"
            onChange={handleSearchMaxLevelMin}
            // onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 99,
              type: 'number',
              'aria-labelledby': 'max-level-min',
            }}
          />
          <Slider
            aria-labelledby="max-level-slider"
            value={searchState.maxLevel.value}
            onChange={handleSearchMaxLevel}
            valueLabelDisplay="auto"
            disableSwap
            className="mx-4"
            size="small"
            min={1}
            max={99}
          />
          <Input
            value={searchState.maxLevel.value[1]}
            size="small"
            onChange={handleSearchMaxLevelMax}
            // onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 99,
              type: 'number',
              'aria-labelledby': 'max-level-max',
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
            value={searchState.expansions.value}
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
            value={searchState.multibox.value}
            onChange={handleSearchMultibox}
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
              aria-label="no multiboxing"
              className="py-0"
              sx={{ width: '33.33%' }}
            >
              None
            </ToggleButton>
            <ToggleButton
              value="limited"
              aria-label="limited multiboxing"
              className="py-0"
              sx={{ width: '33.33%' }}
            >
              Limited
            </ToggleButton>
            <ToggleButton
              value="unlimited"
              aria-label="unlimited multiboxing"
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
            value={searchState.trusts.value}
            onChange={handleSearchTrusts}
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
              aria-label="trust disabled"
              className="py-0"
              sx={{ width: '50%' }}
            >
              Disabled
            </ToggleButton>
            <ToggleButton
              value="enabled"
              aria-label="trust enabled"
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
            value={searchState.levelSync.value}
            onChange={handleSearchLevelSync}
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
      </Grid>
    </Container>
  );
}
