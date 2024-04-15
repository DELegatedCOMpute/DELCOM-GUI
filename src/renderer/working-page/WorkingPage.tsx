import {
  Button,
  LinearProgress,
  Container,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import './WorkingPage.css';

export default function WorkerPage() {
  return (
    <Grid
  container
  spacing={0}
  direction="column"
  justifyContent="center"
  sx={{ minHeight: '100vh' }}
  >
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" paddingBottom={10}>You've successfully joined the DELCOM workforce!</Typography>
        <LinearProgress style={{ width: '100%' }} />
        <Typography variant="h6" paddingBottom={5}>Waiting For Job</Typography>
        <Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={async () => {
              window.electron.ipcRenderer.leaveWorkForce();
            }}
          >
            Quit Working
          </Button>
        </Link>
      </Box>
    </Container>
    </Grid>
  );
}
