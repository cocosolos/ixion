import {
  ContentCopy,
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
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDataFromBackend, fetchDemo } from '../apiUtil';
import { AlertResponse } from '../components/Alert';
import ErrorCard from '../components/ErrorCard';
import ExpansionBar from '../components/ExpansionsBar';
import ServerSettingsDataGrid from '../components/ServerSettingsDataGrid';
import { ServerData } from '../data/ServerData';
import CopyImageIcon from '../images/copy-image.png';

export default function ServerDetails({
  setAlertInfo,
}: {
  setAlertInfo: React.Dispatch<React.SetStateAction<AlertResponse>>;
}) {
  const { url } = useParams();
  const [server, setServer] = useState<ServerData>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let data: ServerData;
    const fetchServerData = async () => {
      try {
        if (url === 'demo') {
          data = await fetchDemo();
        } else {
          data = await fetchDataFromBackend(`server/?url=${url}`);
        }
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

      setServer(data);
    };

    fetchServerData();
  }, [url, setServer, setAlertInfo, setError]);

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
    } catch (err) {
      handleClipboardTooltipOpen();
      if (err instanceof Error) {
        setClipboardTooltip(err.message);
      } else {
        setClipboardTooltip('Something went wrong!');
      }
      setTimeout(() => {
        handleClipboardTooltipClose();
        setClipboardTooltip('Copy server URL.');
      }, 3000);
    }
  };

  function formatExternalUrl(serverUrl: string): string {
    // prepend 'https://' to the URL if it's not already there
    if (!/^https?:\/\//i.test(serverUrl)) {
      return `https://${serverUrl}`;
    }
    return serverUrl;
  }

  return (
    <Box>
      {error || !server ? (
        <ErrorCard error={error} />
      ) : (
        <Card className="mb-2">
          <Box className="flex px-4">
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
                      <Tooltip
                        arrow
                        disableInteractive
                        title="Server is online."
                      >
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
                  title="Estimated server geolocation provided by MaxMind"
                >
                  <Typography
                    variant="caption"
                    component={Link}
                    to="https://www.maxmind.com/"
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
                          fontSize: (theme) =>
                            theme.typography.caption.fontSize,
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
          </Box>
          <Divider />
          <CardContent className="flex justify-between py-1">
            {server.settings && (
              <ServerSettingsDataGrid serverSettings={server.settings} />
            )}
          </CardContent>
          <Divider />
          <CardContent className="flex justify-between py-1">
            <Typography variant="caption">
              {server.active_sessions} active sessions
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
                      maxHeight: '1.5em',
                      marginLeft: '0.5em',
                      verticalAlign: 'middle',
                    }}
                    onContextMenu={(event) => event.preventDefault()}
                  />
                </Tooltip>
              )}
            </Typography>
            <Typography variant="caption">
              Updated: {new Date(server.updated).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
