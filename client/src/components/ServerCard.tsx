import {
  ContentCopy,
  ExpandMore,
  Launch,
  Public,
  PublicOff,
  Warning,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ServerData, { ServerSettingsInfo } from '../data/ServerData';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';

export default function ServerCard({ server }: { server: ServerData }) {
  const [clipboardTooltip, setClipboardTooltip] = useState('Copy server URL.');
  const [clipboardTooltipOpen, setClipboardTooltipOpen] = useState(false);
  const handleClipboardTooltipClose = () => {
    setClipboardTooltipOpen(false);
  };

  const handleClipboardTooltipOpen = () => {
    setClipboardTooltipOpen(true);
  };

  const copyServerUrlToClipboard = async (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setClipboardTooltip('Copied server URL!');
      handleClipboardTooltipOpen();
      setTimeout(() => {
        handleClipboardTooltipClose();
        setClipboardTooltip('Copy Server URL.');
      }, 3000);
    } catch (error) {
      handleClipboardTooltipOpen();
      if (error instanceof Error) {
        setClipboardTooltip(error.message);
      } else {
        setClipboardTooltip('Something went wrong!');
      }
      setTimeout(() => {
        handleClipboardTooltipClose();
        setClipboardTooltip('Copy Server URL.');
      }, 3000);
    }
  };

  function formatExternalUrl(url: string): string {
    // Check if the URL starts with a valid protocol
    if (!/^https?:\/\//i.test(url)) {
      // If not, prepend 'https://' to the URL
      return `https://${url}`;
    }
    // Otherwise, return the original URL
    return url;
  }

  const expansions = [
    <ToggleButton
      key="rotz"
      value="rotz"
      aria-label="rotz-enabled"
      className="py-0"
      disabled
    >
      RotZ
    </ToggleButton>,
    <ToggleButton
      key="cop"
      value="cop"
      aria-label="cop-enabled"
      className="py-0"
      disabled
    >
      CoP
    </ToggleButton>,
    <ToggleButton
      key="toau"
      value="toau"
      aria-label="toau-enabled"
      className="py-0"
      disabled
    >
      ToAU
    </ToggleButton>,
    <ToggleButton
      key="wotg"
      value="wotg"
      aria-label="wotg-enabled"
      className="py-0"
      disabled
    >
      WotG
    </ToggleButton>,
    <ToggleButton
      key="soa"
      value="soa"
      aria-label="soa-enabled"
      className="py-0"
      disabled
    >
      SoA
    </ToggleButton>,
  ];

  return (
    <Card className="mb-2">
      <Accordion className="my-0">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box className="flex items-center justify-center">
            {server.settings['LOGIN.MAINT_MODE'] === 1 ? (
              <Tooltip
                arrow
                disableInteractive
                title="Server is undergoing maintenance."
              >
                <Warning color="warning" />
              </Tooltip>
            ) : (
              <div>
                {server.inactivity_counter > 0 ? (
                  <Tooltip
                    arrow
                    disableInteractive
                    title={`Offline for ${server.inactivity_counter} hours.`}
                  >
                    <PublicOff color="error" />
                  </Tooltip>
                ) : (
                  <Tooltip arrow disableInteractive title="Server is online.">
                    <Public color="success" />
                  </Tooltip>
                )}
              </div>
            )}
          </Box>
          <CardContent className="grow py-1">
            <Box className="flex content-center">
              <Typography
                variant="h5"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
                sx={{ lineHeight: 1.0 }}
              >
                {server.settings['MAIN.SERVER_NAME']}
              </Typography>
              {typeof server.settings['API.WEBSITE'] === 'string' &&
                server.settings['API.WEBSITE'] !== '' && (
                  <Tooltip arrow disableInteractive title="Visit website.">
                    <IconButton
                      component={Link}
                      to={formatExternalUrl(server.settings['API.WEBSITE'])}
                      target="_blank"
                      rel="noopener"
                      size="small"
                      className="py-0"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      disableRipple
                    >
                      <Launch
                        sx={{
                          fontSize: (theme) =>
                            theme.typography.caption.fontSize,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
            </Box>
            <Box className="flex content-center">
              <Typography
                variant="subtitle2"
                color={(theme) => alpha(theme.palette.text.primary, 0.6)}
              >
                {server.url}
              </Typography>
              {window.isSecureContext && (
                <Tooltip
                  arrow
                  disableInteractive
                  title={clipboardTooltip}
                  open={
                    clipboardTooltip === 'Copied server URL!' ||
                    clipboardTooltipOpen
                  }
                  onOpen={handleClipboardTooltipOpen}
                  onClose={handleClipboardTooltipClose}
                >
                  <IconButton
                    size="small"
                    className="py-0"
                    onClick={(event) => {
                      event.stopPropagation();
                      copyServerUrlToClipboard(server.url);
                    }}
                    disableRipple
                  >
                    <ContentCopy
                      sx={{
                        fontSize: (theme) => theme.typography.caption.fontSize,
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            <ToggleButtonGroup
              size="small"
              value={[
                server.settings['LOGIN.RISE_OF_ZILART'] && 'rotz',
                server.settings['LOGIN.CHAINS_OF_PROMATHIA'] && 'cop',
                server.settings['LOGIN.TREASURES_OF_AHT_URGHAN'] && 'toau',
                server.settings['LOGIN.WINGS_OF_THE_GODDESS'] && 'wotg',
                server.settings['LOGIN.SEEKERS_OF_ADOULIN'] && 'soa',
              ]}
              sx={{ '& button': { lineHeight: 1.0 } }}
            >
              {expansions}
            </ToggleButtonGroup>
          </CardContent>
          <Box className="flex items-center justify-center">
            <Typography
              variant="h5"
              color={(theme) => theme.palette.text.secondary}
            >
              {`Lv.${server.settings['MAIN.MAX_LEVEL']}`}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails className="p-2">
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Tooltip
                      title={
                        ServerSettingsInfo['LOGIN.LOGIN_LIMIT'].description
                      }
                      arrow
                      disableInteractive
                    >
                      <Typography variant="caption" sx={{ userSelect: 'none' }}>
                        {`${ServerSettingsInfo['LOGIN.LOGIN_LIMIT'].name}: `}
                        {server.settings['LOGIN.LOGIN_LIMIT'] === 0
                          ? 'unlimited'
                          : server.settings['LOGIN.LOGIN_LIMIT']}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        ServerSettingsInfo['MAIN.ENABLE_TRUST_CASTING']
                          .description
                      }
                      arrow
                      disableInteractive
                    >
                      <Typography variant="caption" sx={{ userSelect: 'none' }}>
                        {`${ServerSettingsInfo['MAIN.ENABLE_TRUST_CASTING'].name}: `}
                        {server.settings['MAIN.ENABLE_TRUST_CASTING'] === 1
                          ? 'Enabled'
                          : 'Disabled'}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        ServerSettingsInfo['MAP.LEVEL_SYNC_ENABLE'].description
                      }
                      arrow
                      disableInteractive
                    >
                      <Typography variant="caption" sx={{ userSelect: 'none' }}>
                        {`${ServerSettingsInfo['MAP.LEVEL_SYNC_ENABLE'].name}: `}
                        {server.settings['MAP.LEVEL_SYNC_ENABLE']
                          ? 'Enabled'
                          : 'Disabled'}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell>
                    <Tooltip
                      title={ServerSettingsInfo['MAP.SPEED_MOD'].description}
                      arrow
                      disableInteractive
                    >
                      <Typography variant="caption" sx={{ userSelect: 'none' }}>
                        {`${ServerSettingsInfo['MAP.SPEED_MOD'].name}: `}
                        {typeof server.settings['MAP.SPEED_MOD'] === 'number'
                          ? (server.settings['MAP.SPEED_MOD'] < 0 ? '' : '+') +
                            ((50 + server.settings['MAP.SPEED_MOD']) / 50 - 1) *
                              100
                          : '???'}
                        %
                      </Typography>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <CardContent className="flex justify-between py-1">
        <Typography variant="caption" sx={{ userSelect: 'none' }}>
          {server.active_sessions} active sessions
        </Typography>
        <Typography variant="caption" sx={{ userSelect: 'none' }}>
          Updated: {new Date(server.updated).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
