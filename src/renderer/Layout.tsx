import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { Button } from '@mui/material';

function Layout() {
  return (
    <div>
      <Link to="/" className="home-button" style={{ padding: '0' }}>
        <Button variant="contained" className="home-button">
          Home
        </Button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Layout;
