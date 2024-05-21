import { Box } from '@mui/material';
import { useOnMount } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFromBackend, fetchDemo } from '../apiUtil';
import ErrorCard from '../components/ErrorCard';
import ServerCard from '../components/Server/ServerCard';
import SettingsDataGrid from '../components/Server/SettingsDataGrid';
import { useLoadingContext } from '../context/LoadingContext';
import { ServerData } from '../data/ServerData';

export default function ServerDetails() {
  const { url } = useParams();
  const [server, setServer] = useState<ServerData | null>();
  const { setProgress, showAlert } = useLoadingContext();

  const fetchServerData = useCallback(async () => {
    let data: ServerData | null = null;
    try {
      setProgress(25);
      if (url === 'demo') {
        data = await fetchDemo();
      } else {
        data = await fetchDataFromBackend(`server/?url=${url}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        showAlert({
          message: err.message,
          severity: 'error',
        });
      } else {
        showAlert({
          message: 'An unknown error occurred.',
          severity: 'error',
        });
      }
    }
    setServer(data);
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
    }, 500);
  }, [url, showAlert, setServer, setProgress]);

  useOnMount(() => {
    fetchServerData();
  });

  return (
    <Box>
      {!server ? (
        <ErrorCard error="" />
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
