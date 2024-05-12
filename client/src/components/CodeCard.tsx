import { ContentCopy } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';

type CodeCardProps = {
  title: string;
  file?: string;
  content?: string;
  copy?: boolean;
};

export default function CodeCard({
  title,
  file,
  content,
  copy,
}: CodeCardProps) {
  const [fileContent, setFileContent] = useState<string>('');
  const [clipboardTooltip, setClipboardTooltip] = useState('Copy contents.');
  const [clipboardTooltipOpen, setClipboardTooltipOpen] = useState(false);
  const handleClipboardTooltipClose = () => {
    setClipboardTooltipOpen(false);
  };
  const handleClipboardTooltipOpen = () => {
    setClipboardTooltipOpen(true);
  };
  useEffect(() => {
    if (file) {
      fetch(file)
        .then((response) => response.text())
        .then((text) => setFileContent(text))
        .catch((error) => setFileContent(error.toString()));
    }
  }, [file]);

  const copyContentsToClipboard = async (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setClipboardTooltip('Copied contents!');
      handleClipboardTooltipOpen();
      setTimeout(() => {
        handleClipboardTooltipClose();
        setClipboardTooltip('Copy contents.');
      }, 3000);
    } catch (error) {
      handleClipboardTooltipOpen();
      if (error instanceof Error) {
        setClipboardTooltip(error.message);
      } else {
        setClipboardTooltip('Something went wrong!');
      }
      setTimeout(() => {
        handleClipboardTooltipClose();
        setClipboardTooltip('Copy contents.');
      }, 3000);
    }
  };

  return (
    <Card raised className="m-1">
      <CardHeader
        disableTypography
        title={title}
        action={
          copy &&
          window.isSecureContext && (
            <Tooltip
              arrow
              disableInteractive
              title={clipboardTooltip}
              open={
                clipboardTooltip === 'Copied contents!' || clipboardTooltipOpen
              }
              onOpen={handleClipboardTooltipOpen}
              onClose={handleClipboardTooltipClose}
            >
              <IconButton
                // size="small"
                // className="py-0"
                onClick={(event) => {
                  event.stopPropagation();
                  copyContentsToClipboard(content || fileContent);
                }}
                disableRipple
              >
                <ContentCopy
                  sx={{
                    fontSize: (theme) => theme.typography.subtitle1.fontSize,
                  }}
                />
              </IconButton>
            </Tooltip>
          )
        }
        className="py-0"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
      />
      <CardContent
        className="px-2 py-0"
        sx={{
          backgroundColor: 'rgba(18, 18, 18, 0.12)',
        }}
      >
        {file ? (
          <pre className="m-0 select-text">
            <code>{fileContent}</code>
          </pre>
        ) : (
          <pre className="m-0 select-text p-2">
            <code>{content}</code>
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

CodeCard.defaultProps = {
  file: '',
  content: '',
  copy: true,
};
