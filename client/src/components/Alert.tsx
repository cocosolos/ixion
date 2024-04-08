import { Alert, Box, Collapse } from '@mui/material';

export type AlertResponse = {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
} | null;

export default function AlertComponent({
  alertInfo,
  setAlertInfo,
}: {
  alertInfo: AlertResponse;
  setAlertInfo: React.Dispatch<React.SetStateAction<AlertResponse>>;
}) {
  return (
    <Box className="m-0">
      {alertInfo && (
        <Collapse in>
          <Alert
            severity={alertInfo.severity}
            onClose={() => setAlertInfo(null)}
            variant="filled"
            className="py-0"
            square
          >
            {alertInfo.message}
          </Alert>
        </Collapse>
      )}
    </Box>
  );
}
