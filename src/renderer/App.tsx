import React from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Box
} from '@mui/material';
import './App.css';
import RequesterPage from './peer-requester/WorkerSelectionPage';
import Layout from './Layout';
import WorkingPage from './working-page/WorkingPage';
import SubmitJob from './submitJob/SubmitJob';

function MainPage() {
  return (
    <Grid
  container
  spacing={0}
  direction="column"
  justifyContent="center"
  sx={{ minHeight: '100vh' }}
  >
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom align="center" className="title">
        DELCOM
      </Typography>
      <Typography variant="h5" gutterBottom align="center" className="subtitle" pb={6}>
        Delegated Compute
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" align="center">
                Run other people&apos;s jobs
              </Typography>
              <Link to="/runningjobs" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={async () => {
                    await window.electron.ipcRenderer.joinWorkforce();
                  }}
                >
                  Run jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" align="center">
                Request a job to be run
              </Typography>
              <Link to="/requestjob" style={{ textDecoration: 'none' }}>
                <Button variant="contained" fullWidth>
                  Request job
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </Grid>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="requestjob" element={<RequesterPage />} />
          <Route path="submitJob/*" element={<SubmitJob />} />
        </Route>
        <Route path="runningjobs" element={<WorkingPage />} />
      </Routes>
    </Router>
  );
}
