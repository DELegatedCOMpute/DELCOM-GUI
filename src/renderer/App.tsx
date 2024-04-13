import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './App.css';
import WorkerPage from './peer-worker/Work';
import RequesterPage from './peer-requester/WorkerSelectionPage';
import Layout from './Layout';

function MainPage() {

  return (
    <>
      <div className="title">DellComm</div>
      <div className="subtitle"> Delegated Compute </div>

      <div className="homebuttons">
        <Link
          to="/runjobs"
          style={{ marginRight: '20%', textDecoration: 'none' }}
        >
          <Button
            variant="contained"
            className="button"
            style={{ marginRight: '20%' }}
          >
            Run jobs
          </Button>
        </Link>

        <Link to="/requestjob" style={{ textDecoration: 'none' }}>
          <Button variant="contained" className="button">
            Request job
          </Button>
        </Link>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="runjobs" element={<WorkerPage />} />
          <Route path="requestjob" element={<RequesterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
