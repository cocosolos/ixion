import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  ServerSetting,
  ServerSettings,
  ServerSettingsInfo,
} from '../../data/ServerData';

type KeyValueRow = {
  id: number;
  key: string;
  rawValue: string | number | boolean;
  name: string;
  value: string | number | boolean;
  description: string;
};

const columns: GridColDef[] = [
  { field: 'key', headerName: 'Key', align: 'right', flex: 4 },
  { field: 'rawValue', headerName: 'Raw Value', align: 'left' },
  { field: 'name', headerName: 'Name', align: 'right', flex: 3 },
  { field: 'value', headerName: 'Value', align: 'left' },
  { field: 'description', headerName: 'Description', flex: 6 },
];

type SettingsDataGridProps = {
  serverSettings: ServerSettings;
};

export default function SettingsDataGrid({
  serverSettings,
}: SettingsDataGridProps) {
  const transformValue = (
    v: boolean | string | number,
    setting: ServerSetting
  ): string | number | boolean => {
    return setting.transform?.(v) ?? v;
  };
  const rows: KeyValueRow[] = Object.entries(serverSettings).map(
    ([key, value], index) => ({
      id: index + 1,
      key,
      rawValue: value,
      name: ServerSettingsInfo[key]?.name || '',
      value:
        (ServerSettingsInfo[key] &&
          transformValue(value, ServerSettingsInfo[key]).toString()) ||
        '',
      description: ServerSettingsInfo[key]?.description || '',
    })
  );

  return (
    <Box className="w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        autoHeight
        density="compact"
        hideFooterSelectedRowCount
        showColumnVerticalBorder
        getRowHeight={() => 'auto'}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
          filter: {
            filterModel: {
              items: [{ field: 'name', operator: 'isNotEmpty' }],
            },
          },
          columns: {
            columnVisibilityModel: {
              key: false,
              rawValue: false,
            },
          },
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            userSelect: 'text',
            py: 1,
          },
        }}
      />
    </Box>
  );
}
