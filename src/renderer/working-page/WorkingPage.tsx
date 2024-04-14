import {
  Button,
  LinearProgress,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './WorkingPage.css';

export default function WorkerPage() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <LinearProgress style={{ width: '100%' }} />
        <Typography variant="h6">Waiting For Job</Typography>
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
  );
}
