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

export default function ExpansionBar({ server }: { server: ServerData }) {
  return (
    <ToggleButtonGroup
      size="small"
      value={[
        server.customizations['LOGIN.RISE_OF_ZILART'] && 'rotz',
        server.customizations['LOGIN.CHAINS_OF_PROMATHIA'] && 'cop',
        server.customizations['LOGIN.TREASURES_OF_AHT_URGHAN'] && 'toau',
        server.customizations['LOGIN.WINGS_OF_THE_GODDESS'] && 'wotg',
        server.customizations['LOGIN.SEEKERS_OF_ADOULIN'] && 'soa',
      ]}
      sx={{ '& button': { lineHeight: 1.0 } }}
    >
      {expansions}
    </ToggleButtonGroup>
  );
}
