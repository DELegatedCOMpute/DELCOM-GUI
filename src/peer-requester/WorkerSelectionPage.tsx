import React from 'react';
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

import JobRequirementsForm from './JobRequirementsForm';

import { dummyWorkers } from './dummy-workers';
import { Button } from '@mui/material';

export default function WorkerSelectionPage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Instead functionality should be:
  // 1. if selected present a modal with delailed view of the worker. Modal has button "Book worker" that leads to the BookingPage
  // 2. clicking outside of modal or on "Cancel" button should close the modal and deselect the list item
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

  // const filtered_workers = dummy_workers.workers.filter(item => formData.architectures.includes(item.architecture));

  return (
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
          {dummyWorkers.workers.map((worker, index) => (
            <React.Fragment key={worker.name}>
              <ListItemButton
                alignItems="flex-start"
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText
                  primary={worker.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {worker.hardware.machineArch}
                      </Typography>
                      {` — RAM: ${worker.hardware.ram}GB, Cores: ${worker.hardware.numCores}`}
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
        <Button
          variant="contained"
          className="button"
          style={{ position: 'fixed', bottom: '10px' }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
