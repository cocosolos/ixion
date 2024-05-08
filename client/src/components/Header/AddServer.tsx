import { Add } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Slide,
  Tooltip,
  alpha,
  styled,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../apiUtil';
import { useLoadingContext } from '../../context/LoadingContext';
import { ServerData } from '../../data/ServerData';

const AddServerInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

type AddServerProps = {
  servers: ServerData[];
  setServers: React.Dispatch<React.SetStateAction<ServerData[]>>;
};

export default function AddServer({ servers, setServers }: AddServerProps) {
  const { showAlert } = useLoadingContext();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddServer, setShowAddServer] = useState(false);
  const toggleShowAddServer = () => {
    setShowAddServer((prev) => !prev);
  };

  const handleSubmit = async (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const inputText = inputRef.current.value;
      setIsLoading(true);
      const response = await postData(inputText);
      if (response.success) {
        showAlert({
          message: response.message,
          severity: 'success',
        });
        if (response.data && typeof response.data === 'object') {
          navigate(`/server/${encodeURIComponent(response.data.url)}`);
          setServers([response.data, ...servers]);
        }
        if (inputRef.current) {
          inputRef.current.value = '';
          toggleShowAddServer();
        }
      } else {
        showAlert({
          message: response.message || 'Failed to send data to backend.',
          severity: 'error',
        });
      }
      setIsLoading(false);
    }
  };

  const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape': {
        if (inputRef.current) {
          if (inputRef.current.value === '') {
            toggleShowAddServer();
          } else {
            inputRef.current.value = '';
          }
        }
        break;
      }
      default:
    }
  };

  return (
    <>
      <Box ref={containerRef} className="overflow-hidden pl-4">
        <Slide
          in={showAddServer}
          direction="left"
          container={containerRef.current}
        >
          <AddServerInput>
            <form onSubmit={handleSubmit}>
              <StyledInputBase
                inputRef={inputRef}
                placeholder="URL"
                autoComplete="off"
                inputProps={{
                  name: 'server-url',
                  'aria-label': 'add-server',
                }}
                onKeyUp={handleKeyUp}
                disabled={isLoading}
                endAdornment={
                  isLoading && (
                    <CircularProgress
                      size={20}
                      sx={{
                        position: 'absolute',
                        right: '10px',
                        color: (theme) => alpha(theme.palette.grey[500], 0.5),
                      }}
                    />
                  )
                }
              />
            </form>
          </AddServerInput>
        </Slide>
      </Box>
      <Tooltip title="Add a server." arrow disableInteractive>
        <IconButton
          onClick={() => {
            toggleShowAddServer();
            setTimeout(() => {
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }, 300);
          }}
        >
          <Add />
        </IconButton>
      </Tooltip>
    </>
  );
}
