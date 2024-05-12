import { Alert, Box, Collapse } from '@mui/material';
import { useLoadingContext } from '../context/LoadingContext';
import { useThemeModeContext } from '../context/ThemeContext';

export default function AlertComponent() {
  const { alert, showAlert } = useLoadingContext();
  const { themeMode } = useThemeModeContext();

  return (
    <Box className="m-0">
      {alert && (
        <Collapse in>
          <Alert
            severity={alert.severity}
            onClose={() => showAlert(null)}
            variant="filled"
            className="py-0"
            sx={{ boxShadow: themeMode === 'light' ? 8 : 3 }}
            square
          >
            {alert.message}
          </Alert>
        </Collapse>
      )}
    </Box>
  );
}
