import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import { Button, LinearProgress } from '@mui/material';
import JobRequirementsForm from './JobRequirementsForm';

export default function WorkerSelectionPage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [workers, setWorkers] = React.useState(null);
  const [loadingString, setLoadingString] = React.useState('Loading Workers');

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    if (selectedIndex === index) {
      setSelectedIndex(-1);
    } else {
      setSelectedIndex(index);
    }
  };

  useEffect(() => {
    const gtwkr = async () => {
      const rtr = await window.electron.ipcRenderer.getWorkers();
      if (rtr.res.length !== 0) {
        setWorkers(rtr);
      } else {
        //no current workers
        setLoadingString('No workers currently, come back later :)');
      }

      console.log(rtr);
    };
    gtwkr();
  }, []);

  return (
    <div>
      {workers == null ? (
        <div className="loading-div">
          <LinearProgress className="loading" />
          <div style={{ padding: '2%' }}> {loadingString} </div>
        </div>
      ) : (
        <div style={{ height: '100vh', overflow: 'scroll' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Worker Requirements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <JobRequirementsForm />
            </AccordionDetails>
          </Accordion>

          <h1 style={{ textAlign: 'center' }}>Select the worker for you job</h1>
          <Container
            sx={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
              {workers.res.map((worker, index) => (
                <React.Fragment key={worker.workerID}>
                  <ListItemButton
                    alignItems="flex-start"
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                  >
                    <ListItemText
                      primary={`workerID: ${worker.workerID}`}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {worker.workerInfo.machineArch}
                          </Typography>
                          {` — RAM: ${Math.round(
                            worker.workerInfo.ram / 1024 ** 3,
                          )} GB, Cores: ${
                            worker.workerInfo.cpus.length
                          }, CPU: ${worker.workerInfo.cpus[0].model}`}
                        </>
                      }
                    />
                  </ListItemButton>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Container>
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              marginTop: '20px',
            }}
          >
            <Link
              to={{
                pathname: `/submitJob/${workers.res[0].workerID}`,
              }}
              style={{ padding: '0' }}
            >
              <Button
                variant="contained"
                className="button"
                style={{ position: 'fixed', bottom: '10px' }}
              >
                Next
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
