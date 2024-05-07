import { Info } from '@mui/icons-material';
import { Card, IconButton, Tooltip, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { fetchDataFromBackend } from '../apiUtil';
import { ServerData } from '../data/ServerData';
import ServerSettingsDataGrid from './ServerSettingsDataGrid';

export default function ServerDetailsModal({ id }: { id: number }) {
  const [server, setServer] = useState<ServerData>();
  const [error, setError] = useState<string>('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    let data: ServerData;
    const fetchServerData = async () => {
      try {
        data = await fetchDataFromBackend(`server/${id}`);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
      setServer(data);
    };
    fetchServerData();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Tooltip title="View full settings." arrow disableInteractive>
        <IconButton className="p-0" disableRipple onClick={handleOpen}>
          <Info className="p-1" />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: 'absolute' as const,
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            overflow: 'hidden',
            overflowX: 'hidden',
            boxShadow: 24,
          }}
        >
          <Card
            sx={{
              position: 'absolute' as const,
              width: '100%',
              height: '100%',
              overflow: 'scroll',
              overflowX: 'hidden',
            }}
          >
            {!server || !server.settings ? (
              <Typography align="center" variant="subtitle1">
                {error}
              </Typography>
            ) : (
              <ServerSettingsDataGrid serverSettings={server.settings} />
            )}
          </Card>
        </Card>
      </Modal>
    </div>
  );
}
