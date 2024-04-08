import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
  alpha,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <Card className="mb-3">
        <CardContent>
          <Box className="mb-3">
            <Typography align="center" variant="h6">
              What is this?
            </Typography>
            <Typography
              component="p"
              variant="body1"
              align="justify"
              color={(theme) => alpha(theme.palette.text.primary, 0.87)}
            >
              Ixion is a catalog of FFXI private servers running the{' '}
              <Link to="https://github.com/LandSandBoat/server">
                LandSandBoat
              </Link>{' '}
              software (or serving their API). Servers are updated every hour,
              and are automatically removed after 24 hours of failed updates.
              All information is pulled directly from the servers and Ixion
              makes no guarantees as to how current or correct the information
              is and is in no way affiliated with any listed server. Always use
              a different strong and unique password for every server (and just
              in general).
            </Typography>
          </Box>
          <Box className="mb-3">
            <Typography align="center" variant="h6">
              How can I add a server?
            </Typography>
            <Typography
              component="p"
              variant="body1"
              align="justify"
              color={(theme) => alpha(theme.palette.text.primary, 0.87)}
            >
              Click the + button at the top of the page then enter the URL you
              use to connect to the server. The server must be serving the LSB
              API at the <b>/api</b> subdirectory of their URL.
            </Typography>
          </Box>
          <Box className="mb-3">
            <Typography align="center" variant="h6">
              Other Resources
            </Typography>
            <Typography
              component="p"
              variant="body1"
              align="justify"
              color={(theme) => alpha(theme.palette.text.primary, 0.87)}
            >
              Additional servers can be found on the XiPrivateServers{' '}
              <Link to="https://github.com/XiPrivateServers/Servers/blob/main/SERVERS.md">
                GitHub
              </Link>
              . Discussion can be found on the{' '}
              <Link to="https://www.reddit.com/r/FFXIPrivateServers/">
                subreddit
              </Link>{' '}
              or in the <Link to="https://discord.gg/nYF6gNv">Discord</Link>. If
              you want to setup your own server, check out{' '}
              <Link to="https://github.com/LandSandBoat/server/wiki/Quick-Start-Guide">
                the guide
              </Link>{' '}
              and don&apos;t forget to enable the HTTP server and list yourself
              here!
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <Accordion className="my-0">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h5">For server owners:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="mb-3">
              <Typography align="center" variant="h6">
                Why can&apos;t I add my server?
              </Typography>
              <Typography
                component="p"
                variant="body1"
                align="justify"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
              >
                To be searchable, you need to enable the HTTP server on the LSB
                world server by setting <b>ENABLE_HTTP</b> in <b>network.lua</b>{' '}
                to <b>true</b> and make sure requests to the <b>/api</b>{' '}
                subdirectory of your domain reach it (e.g.
                http://play.myserver.com/api/).
              </Typography>
            </Box>
            <Box className="mb-3">
              <Typography align="center" variant="h6">
                What if my server isn&apos;t running LSB?
              </Typography>
              <Typography
                component="p"
                variant="body1"
                align="justify"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
              >
                If you&apos;re not on LSB, you could fake the API response.
                Right now the only required settings are <b>MAIN.SERVER_NAME</b>
                , <b>MAIN.MAX_LEVEL</b>, and <b>LOGIN.LOGIN_LIMIT</b>.
                You&apos;ll want to look at the LSB settings and serve whatever
                relevant changes you&apos;ve made using the LSB equivalent.
                Settings should be served at <b>/api/settings</b> and total
                active sessions should be served at <b>/api/sessions</b>.
                Enabled expansions are controlled by the LOGIN settings.
              </Typography>
            </Box>
            <Box className="mb-3">
              <Typography align="center" variant="h6">
                How can I add a link to the server website?
              </Typography>
              <Typography
                component="span"
                variant="body1"
                align="justify"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
              >
                Create a new file <b>settings/api.lua</b> in your server
                directory.
                <Paper elevation={2}>
                  <pre className="m-0 p-2">
                    <code>
                      {`xi = xi or {}
xi.settings = xi.settings or {}

xi.settings.api =
{
    WEBSITE = '',
    DO_NOT_TRACK = false,
}`}
                    </code>
                  </pre>
                </Paper>
                The world server needs to be restarted after any changes to any
                of the settings. If you set <b>DO_NOT_TRACK</b> to <b>true</b>,
                your server will be removed on the next hourly update.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>
    </>
  );
}
