import {
  ArrowCircleUp,
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
  Divider,
  IconButton,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import {
  Children,
  ElementType,
  ReactNode,
  isValidElement,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useThemeModeContext } from '../../context/ThemeContext';
import { ServerData } from '../../data/ServerData';
import CopyImageIcon from '../../images/copy-image.png';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../Themed/Accordion';
import ExpansionBar from './ExpansionsBar';
import SettingsDataGrid from './SettingsDataGrid';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

type ServerCardProps = {
  server: ServerData;
  children: ReactNode;
};

export default function ServerCard({ server, children }: ServerCardProps) {
  const { themeMode } = useThemeModeContext();
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

  // Check if this is a detailed server card with a data grid
  const hasSpecificComponent = (
    childrenProps: ReactNode,
    componentType: ElementType
  ): boolean => {
    const childrenArray = Children.toArray(childrenProps);
    return childrenArray.some(
      (child) => isValidElement(child) && child.type === componentType
    );
  };
  const isSettingsDataGridChild = hasSpecificComponent(
    children,
    SettingsDataGrid
  );
  // Manually handle the accordion state to disable closing when detailed view
  const [expand, setExpand] = useState(isSettingsDataGridChild);
  const toggleAcordion = () => {
    if (!isSettingsDataGridChild) {
      setExpand((prev) => !prev);
    }
  };

  return (
    <Card className="mb-2" raised={themeMode === 'light'}>
      <Accordion
        className="my-0"
        defaultExpanded={isSettingsDataGridChild}
        expanded={expand}
      >
        <AccordionSummary
          expandIcon={!isSettingsDataGridChild && <ExpandMore />}
          onClick={toggleAcordion}
        >
          <Box className="flex flex-col items-center justify-center">
            <Box className="flex content-center">
              {server.settings_summary['LOGIN.MAINT_MODE'] === 1 ? (
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
                title="Estimated server geolocation provided by MaxMind."
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
              {typeof server.settings_summary['API.WEBSITE'] === 'string' &&
                server.settings_summary['API.WEBSITE'] !== '' && (
                  <Tooltip arrow disableInteractive title="Visit website.">
                    <IconButton
                      component={Link}
                      to={formatExternalUrl(
                        server.settings_summary['API.WEBSITE']
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
          {server.settings_summary['MAIN.SERVER_MESSAGE'] && (
            <>
              <Box className="flex justify-center">
                <Typography variant="body2">
                  {server.settings_summary['MAIN.SERVER_MESSAGE']}
                </Typography>
              </Box>
              <Divider sx={{ marginY: 1 }} />
            </>
          )}
          {children}
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
          <Tooltip
            title={
              isSettingsDataGridChild ? 'Scroll to top.' : 'View full settings.'
            }
            arrow
            disableInteractive
          >
            <IconButton
              component={Link}
              to={`/server/${encodeURIComponent(server.url)}`}
              onClick={scrollToTop}
              className="p-0"
              disableRipple
            >
              {isSettingsDataGridChild ? (
                <ArrowCircleUp className="p-1" />
              ) : (
                <Info className="p-1" />
              )}
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