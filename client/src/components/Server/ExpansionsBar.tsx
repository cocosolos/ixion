import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { ServerData } from '../../data/ServerData';

const expansionButtons = [
  <ToggleButton
    key="rotz"
    value="rotz"
    aria-label="rotz-enabled"
    className="px-1 py-0"
    disabled
  >
    RotZ
  </ToggleButton>,
  <ToggleButton
    key="cop"
    value="cop"
    aria-label="cop-enabled"
    className="px-1 py-0"
    disabled
  >
    CoP
  </ToggleButton>,
  <ToggleButton
    key="toau"
    value="toau"
    aria-label="toau-enabled"
    className="px-1 py-0"
    disabled
  >
    ToAU
  </ToggleButton>,
  <ToggleButton
    key="wotg"
    value="wotg"
    aria-label="wotg-enabled"
    className="px-1 py-0"
    disabled
  >
    WotG
  </ToggleButton>,
  <ToggleButton
    key="soa"
    value="soa"
    aria-label="soa-enabled"
    className="px-1 py-0"
    disabled
  >
    SoA
  </ToggleButton>,
  <ToggleButton
    key="addons"
    value="addons"
    aria-label="addons-enabled"
    className="px-1 py-0"
    disabled
  >
    +
  </ToggleButton>,
];

type ExpansionBarProps = { server: ServerData };

export default function ExpansionBar({ server }: ExpansionBarProps) {
  const { expansions } = server;

  const addons = ['acp', 'amk', 'asa', 'abyssea', 'voidwatch', 'rov', 'tvr'];
  let enabledAddons = addons.filter((prop) => expansions[prop]);
  enabledAddons = enabledAddons.map((prop) => {
    if (prop === 'abyssea' || prop === 'voidwatch') {
      return prop.charAt(0).toUpperCase() + prop.slice(1);
    }
    return prop.toUpperCase();
  });

  return (
    <Box className="my-1 flex items-center">
      <Tooltip
        title={
          enabledAddons.length !== 0 && (
            <div style={{ whiteSpace: 'pre-line' }}>
              {enabledAddons.join('\n')}
            </div>
          )
        }
        placement="right"
        disableInteractive
        arrow
      >
        <ToggleButtonGroup
          size="small"
          value={
            expansions && [
              expansions.rotz && 'rotz',
              expansions.cop && 'cop',
              expansions.toau && 'toau',
              expansions.wotg && 'wotg',
              expansions.soa && 'soa',
              enabledAddons.length !== 0 && 'addons',
            ]
          }
          sx={{
            '& button': {
              maxHeight: '1rem',
            },
          }}
        >
          {expansionButtons}
        </ToggleButtonGroup>
      </Tooltip>
    </Box>
  );
}
