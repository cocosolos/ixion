import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ServerData } from '../../data/ServerData';

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

type ExpansionBarProps = { server: ServerData };

export default function ExpansionBar({ server }: ExpansionBarProps) {
  return (
    <ToggleButtonGroup
      size="small"
      value={
        server.expansions && [
          server.expansions.rotz && 'rotz',
          server.expansions.cop && 'cop',
          server.expansions.toau && 'toau',
          server.expansions.wotg && 'wotg',
          server.expansions.soa && 'soa',
        ]
      }
      sx={{ '& button': { lineHeight: 1.0 } }}
    >
      {expansions}
    </ToggleButtonGroup>
  );
}
