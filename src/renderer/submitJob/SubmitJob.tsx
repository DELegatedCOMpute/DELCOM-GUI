import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

export default function SubmitJob() {
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={async () => {
          const file = await window.electron.ipcRenderer.openFile();
          if (!file.canceled) {
            setSelectedFile(file.filePaths[0]);
          }
        }}
      >
        Upload file
      </Button>
      <div>
        Current file:
        {selectedFile.split('\\')[selectedFile.split('\\').length - 1]}
      </div>
      <div>
        full path:
        {selectedFile}
      </div>
    </>
  );
}
