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
import { PathLike } from 'fs';
import { states } from '../types';
import Stageinfo from './StageInfo';

export default function SubmitJob() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const location = useLocation();
  const [curState, setCurState] = useState(states.NOTHINGDONE);
  const [outputLocation, setOutputLocation] = useState<null | string>(null);

  const handleFileSelection = async () => {
    const files = await window.electron.ipcRenderer.openFile();
    if (!files.canceled) {
      setSelectedFiles([...selectedFiles, ...files.filePaths]);
    }
  };

  const jobAssigned = async (path: PathLike) => {
    setCurState(states.JOBASSIGNED);
    setOutputLocation(path.toString());
    console.log(path);
  };

  const filesSent = async () => {
    setCurState(states.FILESSENT);
  };

  const jobDone = async () => {
    setCurState(states.JOBDONE);
  };

  const handleRunJob = async () => {
    const parts = location.pathname.split('/');
    const workerId = parts.pop();
    setCurState(states.CLICKEDRUN);
    window.electron.ipcRenderer.delegateJob(workerId as string, selectedFiles, {
      whenJobAssigned: jobAssigned,
      whenFilesSent: filesSent,
      whenJobDone: jobDone,
    });
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
                  // eslint-disable-next-line react/no-array-index-key
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
          <Stageinfo curStage={curState} />
          {outputLocation !== null ? (
            <div> Output will be Here: {outputLocation}</div>
          ) : (
            ''
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
