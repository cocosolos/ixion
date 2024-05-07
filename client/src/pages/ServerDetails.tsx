import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromBackend, fetchDemo } from '../apiUtil';
import { AlertResponse } from '../components/Alert';
import ErrorCard from '../components/ErrorCard';
import SettingsDataGrid from '../components/Server/SettingsDataGrid';
import ServerCard from '../components/ServerCard';
import { ServerData } from '../data/ServerData';

export default function ServerDetails({
  setAlertInfo,
}: {
  setAlertInfo: React.Dispatch<React.SetStateAction<AlertResponse>>;
}) {
  const { url } = useParams();
  const [server, setServer] = useState<ServerData>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let data: ServerData;
    const fetchServerData = async () => {
      try {
        if (url === 'demo') {
          data = await fetchDemo();
        } else {
          data = await fetchDataFromBackend(`server/?url=${url}`);
        }
      } catch (err) {
        if (err instanceof Error) {
          setAlertInfo({
            message: err.message,
            severity: 'error',
          });
        } else {
          setError('An unknown error occurred.');
        }
      }

      setServer(data);
    };

    fetchServerData();
  }, [url, setServer, setAlertInfo, setError]);

  return (
    <Box>
      {error || !server ? (
        <ErrorCard error={error} />
      ) : (
        <ServerCard server={server}>
          {server.settings && (
            <SettingsDataGrid serverSettings={server.settings} />
          )}
        </ServerCard>
      )}
    </Box>
  );
}
