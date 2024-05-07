import { Alert, Box, Collapse } from '@mui/material';
import { useLoadingContext } from '../context/LoadingContext';

export default function AlertComponent() {
  const { alert, showAlert } = useLoadingContext();

  return (
    <Box className="m-0">
      {alert && (
        <Collapse in>
          <Alert
            severity={alert.severity}
            onClose={() => showAlert(null)}
            variant="filled"
            className="py-0"
            square
          >
            {alert.message}
          </Alert>
        </Collapse>
      )}
    </Box>
  );
}
