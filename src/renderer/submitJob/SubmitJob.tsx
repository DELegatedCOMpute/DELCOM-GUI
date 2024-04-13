import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SubmitJob() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const location = useLocation();

  const handleFileSelection = async () => {
    const files = await window.electron.ipcRenderer.openFile();
    if (!files.canceled) {
      setSelectedFiles([...selectedFiles, ...files.filePaths]);
    }
  };

  const handleRunJob = async () => {
    const parts = location.pathname.split('/');
    const workerId = parts.pop();
    console.log(selectedFiles);
    window.electron.ipcRenderer.delegateJob(workerId as string, selectedFiles);
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={handleFileSelection}
      >
        Upload file
      </Button>
      {selectedFiles.map((file, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>{`File ${index + 1}: ${file.split('\\').pop()}`}</div>
      ))}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        onClick={handleRunJob}
      >
        Run Job
      </Button>
    </>
  );
}
