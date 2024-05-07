import { Check, Close } from '@mui/icons-material';
import { Box, Chip, Tooltip } from '@mui/material';
import {
  ServerData,
  ServerSetting,
  ServerSettingsInfo,
} from '../../data/ServerData';

type SettingsChipCloudProps = { server: ServerData };

export default function SettingsChipCloud({ server }: SettingsChipCloudProps) {
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
            boxShadow: 1,
          }}
        />
      </Tooltip>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '100%',
      }}
    >
      {Object.entries(server.settings_summary).map(renderSettingsChip)}
    </Box>
  );
}
