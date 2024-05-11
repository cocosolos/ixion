import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Typography,
  alpha,
} from '@mui/material';
import Link from '@mui/material/Link';
import { useThemeModeContext } from '../context/ThemeContext';

export default function About() {
  const { themeMode } = useThemeModeContext();

  return (
    <>
      <Card className="mb-2" raised={themeMode === 'light'}>
        <CardContent>
          <Box className="mb-3">
            <Typography align="center" variant="h6">
              What is this?
            </Typography>
            <Typography
              component="p"
              variant="body1"
              color={(theme) => alpha(theme.palette.text.primary, 0.87)}
            >
              Ixion is a catalog of Final Fantasy XI private servers running the{' '}
              <Link
                href="https://github.com/LandSandBoat/server"
                target="_blank"
              >
                LandSandBoat
              </Link>{' '}
              software (or serving their API). Servers are updated every 10
              minutes and are removed after a variable amount of
              disconnectivity. All information is gathered directly from the
              listed servers.
            </Typography>
          </Box>
          <Box className="mb-3">
            <Typography align="center" variant="h6">
              How can I add a server?
            </Typography>
            <Typography
              component="p"
              variant="body1"
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
              color={(theme) => alpha(theme.palette.text.primary, 0.87)}
            >
              Additional servers and more detailed information can be found on
              the{' '}
              <Link
                href="https://github.com/XiPrivateServers/Servers/blob/main/SERVERS.md"
                target="_blank"
              >
                XiPrivateServers GitHub
              </Link>
              . Discussion can be found on the{' '}
              <Link
                href="https://www.reddit.com/r/FFXIPrivateServers/"
                target="_blank"
              >
                subreddit
              </Link>{' '}
              or in the{' '}
              <Link href="https://discord.gg/nYF6gNv" target="_blank">
                Discord
              </Link>
              . If you want to setup your own server, check out{' '}
              <Link
                href="https://github.com/LandSandBoat/server/wiki/Quick-Start-Guide"
                target="_blank"
              >
                the guide
              </Link>{' '}
              and don&apos;t forget to enable the HTTP server and list yourself
              here!
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className="mb-2" raised={themeMode === 'light'}>
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
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
              >
                Create a new file <b>settings/api.lua</b> in your server
                directory.
                <Card className="bg-neutral-500/50">
                  <pre className="m-0 select-text p-2">
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
                </Card>
                The world server needs to be restarted after any changes to any
                of the settings. If you set <b>DO_NOT_TRACK</b> to <b>true</b>,
                your server will be removed on the next hourly update.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>
      <Card className="mb-2" raised={themeMode === 'light'}>
        <CardContent>
          <Box className="mb-3">
            <Typography align="center" variant="h6">
              Notes
            </Typography>
            <ul className="m-0 pl-4">
              <Typography
                component="li"
                variant="body2"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
                className="mb-2"
              >
                Due to the nature of private server customization, only basic
                details can be gathered from the LSB API. Ixion doesn&apos;t
                know about EXP table changes or any kind of scripting or core
                changes, just basic settings. If a server doesn&apos;t have a
                website linked, check the{' '}
                <Link
                  href="https://github.com/XiPrivateServers/Servers/blob/main/SERVERS.md"
                  target="_blank"
                >
                  XiPrivateServers GitHub
                </Link>{' '}
                and see if it&apos;s listed there. Server owners see above for
                information on how to add a Link href your website.
              </Typography>
              <Typography
                component="li"
                variant="body2"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
                className="mb-2"
              >
                The information provided by Ixion is sourced from third-party
                sources, and while we strive to ensure accuracy, we cannot
                guarantee its completeness or reliability. Users are encouraged
                to verify any information independently before making decisions
                based on it.
              </Typography>
              <Typography
                component="li"
                variant="body2"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
                className="mb-2"
              >
                Ixion may contain links to external websites operated by third
                parties. These links are provided for convenience and
                informational purposes only. We do not endorse or control the
                content of these third-party sites, and we are not responsible
                for their accuracy or content. Users access external sites at
                their own risk.
              </Typography>
              <Typography
                component="li"
                variant="body2"
                color={(theme) => alpha(theme.palette.text.primary, 0.87)}
                className="mb-2"
              >
                All names, trademarks, and copyrights mentioned on this website
                belong to their respective owners. Any use of these names,
                trademarks, and copyrights is for identification purposes only
                and does not imply endorsement, sponsorship, or affiliation with
                our website. We acknowledge the ownership of these intellectual
                properties and respect the rights of their owners.
              </Typography>
            </ul>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
