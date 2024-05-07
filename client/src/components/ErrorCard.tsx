import { Card, CardContent, Typography } from '@mui/material';
import { useThemeModeContext } from '../context/ThemeContext';

type ErrorCardProps = { error: string };

export default function ErrorCard({ error }: ErrorCardProps) {
  const { themeMode } = useThemeModeContext();
  return (
    <Card className="mb-2" raised={themeMode === 'light'}>
      <CardContent className="p-4">
        <Typography align="center" variant="h6">
          ¯\_(ツ)_/¯
        </Typography>
        <Typography align="center" variant="subtitle1">
          {error}
        </Typography>
      </CardContent>
    </Card>
  );
}
