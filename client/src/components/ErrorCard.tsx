import { Card, CardContent, Typography } from '@mui/material';

type ErrorCardProps = { error: string };

export default function ErrorCard({ error }: ErrorCardProps) {
  return (
    <Card className="mb-2">
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
