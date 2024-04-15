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
import './WorkerSelection.css';
import { workerType } from '../types';

export default function WorkerSelectionPage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [workers, setWorkers] = React.useState<workerType[] | null>(null);
  const [loadingString, setLoadingString] = React.useState('Loading Workers');
  const [minCores, selectedCores] = React.useState(0);
  const [minRam, selectedRam] = React.useState(0);
  const [minArch, selectedArch] = React.useState<string[]>([]);
  const [filteredWorkers, setFilteredWorkers] = React.useState<
    workerType[] | null
  >(null);

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
    if (workers !== null) {
      const filteredWorkersTemp = workers.filter((worker: workerType) => {
        if (worker.workerInfo.cpus.length < minCores) {
          return false;
        }

        if (Math.round(worker.workerInfo.ram / 1024 ** 3) < minRam) {
          return false;
        }

        if (
          minArch.length !== 0 &&
          !minArch.includes(worker.workerInfo.machineArch)
        ) {
          return false;
        }

        return true;
      });

      setFilteredWorkers(filteredWorkersTemp);
    }
  }, [minCores, minRam, minArch, workers]);

  useEffect(() => {
    const gtwkr = async () => {
      const rtr = await window.electron.ipcRenderer.getWorkers();
      if (rtr.res.length !== 0) {
        setWorkers(rtr.res);
      } else {
        // no current workers
        setLoadingString('No workers currently, come back later :)');
      }
    };
    gtwkr();
  }, []);

  return (
    <div>
      <div className="scrollableDiv">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Worker Requirements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <JobRequirementsForm
              setArch={selectedArch}
              setCores={selectedCores}
              setRam={selectedRam}
            />
          </AccordionDetails>
        </Accordion>

        <h1 style={{ textAlign: 'center' }}>Select the worker for you job</h1>

        {filteredWorkers == null && (
          <div className="loading-div">
            <LinearProgress className="loading" />
            <div style={{ padding: '2%' }}> {loadingString} </div>
          </div>
        )}
        {filteredWorkers && filteredWorkers.length === 0 && (
          <div className="loading-div">
            <div style={{ padding: '2%' }}> None </div>
          </div>
        )}
        {filteredWorkers && filteredWorkers.length > 0 && (
          <div>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '100px',
              }}
            >
              <List sx={{ width: '90%', bgcolor: 'background.paper' }}>
                {filteredWorkers.map((worker: workerType, index: number) => (
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
                            {` — RAM: ${Math.ceil(
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: '10px',
                height: '60px',
              }}
            >
              <Link
                to={{
                  pathname: `/submitJob/${filteredWorkers[0].workerID}`,
                }}
              >
                <Button variant="contained" className="button">
                  Next
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
