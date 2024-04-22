import {
  Check,
  Close,
  ContentCopy,
  ExpandMore,
  Info,
  Launch,
  Public,
  PublicOff,
  Warning,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ServerData, {
  ServerSetting,
  ServerSettingsInfo,
} from '../data/ServerData';
import CopyImageIcon from '../images/copy-image.png';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import ExpansionBar from './ExpansionsBar';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
        setClipboardTooltip('Copy server URL.');
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
        setClipboardTooltip('Copy server URL.');
      }, 3000);
    }
  };

  function formatExternalUrl(url: string): string {
    // prepend 'https://' to the URL if it's not already there
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  }

  const renderSettingsChip = ([key, value]: [
    string,
    boolean | string | number,
  ]) => {
    if (!ServerSettingsInfo[key]) return null;

    const transformValue = (
      v: boolean | string | number,
      setting: ServerSetting
    ): string | number | boolean => {
      return setting.transform?.(v) ?? v;
    };

    let chipValue: string | number | boolean | JSX.Element = transformValue(
      value,
      ServerSettingsInfo[key]
    );
    if (typeof chipValue === 'boolean') {
      chipValue = chipValue ? (
        <Check color="success" />
      ) : (
        <Close color="error" />
      );
    }

    return (
      <Tooltip
        key={key}
        arrow
        disableInteractive
        title={ServerSettingsInfo[key].description}
      >
        <Chip
          label={`${ServerSettingsInfo[key].name === '' ? key : ServerSettingsInfo[key].name}`}
          avatar={
            typeof chipValue === 'object' ? undefined : (
              <Chip label={chipValue} size="small" />
            )
          }
          icon={typeof chipValue === 'object' ? chipValue : undefined}
          size="small"
          className="m-1 pr-1"
          sx={{
            '& .MuiChip-avatar': {
              width: 'auto',
              marginX: 0,
              order: 2,
            },
            '& .MuiChip-icon': {
              marginX: 0,
              order: 2,
            },
            '&> .MuiChip-label': {
              paddingRight: 0.5,
            },
            boxShadow: '0px 3px 3px rgba(0, 0, 0, .25)',
          }}
        />
      </Tooltip>
    );
  };

  return (
    <Card className="mb-2">
      <Accordion className="my-0">
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box className="flex flex-col items-center justify-center">
            <Box className="flex content-center">
              {server.customizations['LOGIN.MAINT_MODE'] === 1 ? (
                <Tooltip
                  arrow
                  disableInteractive
                  title="Server is undergoing maintenance."
                >
                  <Warning color="warning" />
                </Tooltip>
              ) : (
                <div>
                  {!server.up ? (
                    <Tooltip
                      arrow
                      disableInteractive
                      title="Server is offline."
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
            <Box className="flex content-center">
              <Tooltip
                arrow
                disableInteractive
                title="Estimated server geolocation provided by DB-IP."
              >
                <Typography
                  variant="caption"
                  component={Link}
                  to="https://db-ip.com"
                  target="_blank"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  sx={{
                    textDecoration: 'none',
                  }}
                  color={(theme) => alpha(theme.palette.text.primary, 0.5)}
                >
                  {server.location}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
          <CardContent className="grow py-1">
            <Box className="flex content-center">
              <Typography
                variant="h5"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
                sx={{ lineHeight: 1.0 }}
              >
                {server.name}
              </Typography>
              {typeof server.customizations['API.WEBSITE'] === 'string' &&
                server.customizations['API.WEBSITE'] !== '' && (
                  <Tooltip arrow disableInteractive title="Visit website.">
                    <IconButton
                      component={Link}
                      to={formatExternalUrl(
                        server.customizations['API.WEBSITE']
                      )}
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
            <ExpansionBar server={server} />
          </CardContent>
          <Box className="flex items-center justify-center">
            <Typography
              variant="h5"
              color={(theme) => theme.palette.text.secondary}
            >
              {`Lv.${server.max_level}`}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails className="p-2">
          {server.customizations['MAIN.SERVER_MESSAGE'] && (
            <>
              <Box className="flex justify-center">
                <Typography variant="body2">
                  {server.customizations['MAIN.SERVER_MESSAGE']}
                </Typography>
              </Box>
              <Divider sx={{ marginY: 1 }} />
            </>
          )}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '100%',
            }}
          >
            {Object.entries(server.customizations).map(renderSettingsChip)}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <CardContent className="flex flex-wrap justify-between py-0">
        <Box className="flex items-center whitespace-nowrap">
          <Typography variant="caption">
            {server.active_sessions} active sessions
          </Typography>
          {server.login_limit !== 1 && (
            <Tooltip
              title={`Server allows ${server.login_limit === 0 ? 'unlimited' : server.login_limit} simultaneous game sessions per IP.`}
              arrow
              disableInteractive
            >
              <img
                src={CopyImageIcon}
                alt=""
                style={{
                  maxHeight: '1em',
                  marginLeft: '0.5em',
                }}
                onContextMenu={(event) => event.preventDefault()}
              />
            </Tooltip>
          )}
        </Box>
        <Box className="flex items-center whitespace-nowrap">
          {/* <ServerDetailsModal id={server.id} /> */}
          <Tooltip title="View full settings." arrow disableInteractive>
            <IconButton
              component={Link}
              to={`/server/${server.id}`}
              onClick={scrollToTop}
              className="p-0"
              disableRipple
            >
              <Info className="p-1" />
            </IconButton>
          </Tooltip>
          <Typography variant="caption">
            Updated: {new Date(server.updated).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
