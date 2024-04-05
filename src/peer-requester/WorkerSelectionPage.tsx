import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { dummy_workers } from './dummy-workers';

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

  return (
    <div style={{height:'100vh', overflow:"scroll"}}>
      <h1 style={{textAlign: 'center'}}>Select the worker for you job</h1>
      <Container sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
     <List sx={{ width: '90%', bgcolor: 'background.paper'}}>
          {dummy_workers.workers.map((worker, index) => (
            <React.Fragment key={worker.name}>
              <ListItemButton
                alignItems="flex-start"
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText
                  primary={worker.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {worker.hardware.machineArch}
                      </Typography>
                      {` — RAM: ${worker.hardware.ram}GB, Cores: ${worker.hardware.numCores}`}
                    </React.Fragment>
                  }
                />
              </ListItemButton>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </div>
  );
}
