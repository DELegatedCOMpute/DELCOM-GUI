import { Button, LinearProgress } from '@mui/material';
import './WorkingPage.css';
import { Link } from 'react-router-dom';

export default function WorkerPage() {
  return (
    <>
      <div className="loading-div">
        <LinearProgress className="loading" />
        <div style={{ padding: '2%' }}> Waiting For Job </div>
      </div>

      <Link to="/" className="home-button" style={{ padding: '0' }}>
        <Button
          variant="contained"
          className="home-button"
          onClick={async () => {
            const workers = await window.electron.ipcRenderer.getWorkers();
            console.log(workers);
            // window.electron.ipcRenderer.leaveWorkForce();
          }}
        >
          Quit Working
        </Button>
      </Link>
    </>
  );
}
