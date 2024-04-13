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
        <Button variant="contained" className="home-button">
          Quit Working
        </Button>
      </Link>
    </>
  );
}
