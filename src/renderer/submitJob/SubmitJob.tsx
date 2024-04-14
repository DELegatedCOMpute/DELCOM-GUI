import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  Typography,
  Grid,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    window.electron.ipcRenderer.delegateJob(workerId as string, selectedFiles);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upload Files
            </Typography>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleFileSelection}
              fullWidth
            >
              Select Files
            </Button>
            {selectedFiles.length > 0 && (
              <List>
                {selectedFiles.map((file, index) => (
                  <ListItem key={index}>
                    {`File ${index + 1}: ${file.split('\\').pop()}`}
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRunJob}
              fullWidth
              disabled={selectedFiles.length === 0}
            >
              Run Job
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
