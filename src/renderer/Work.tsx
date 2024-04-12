import { useState, useEffect } from 'react';
import './App.css';
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { hardwareInfoType, Architectures } from './types';
import SlideAbleSelection from './components/Input';

export default function WorkerPage() {
  const [hardwareInfo, setHardwareInfo] = useState<hardwareInfoType | null>(
    null,
  );

  useEffect(() => {
    async function fetchHardwareInfo() {
      try {
        const result = await window.electron.ipcRenderer.getHardwareInfo();
        setHardwareInfo(result);
      } catch (error) {
        throw new Error(`Error fetching hardware info:${error}`);
      }
    }

    fetchHardwareInfo();
  }, []);

  return (
    <>
      <div className="title">Becoming a worker</div>
      {hardwareInfo == null ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '2%',
          }}
        >
          <LinearProgress style={{ width: '50%', justifyContent: 'center' }} />{' '}
          <div style={{ padding: '2%' }}> Scanning Hardware </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="subtitle">Please fill out the following data:</div>

          <div style={{ margin: '20px' }}>
            NOTE: We filled some in for you already just change what is wrong
          </div>
          <SlideAbleSelection
            textAbove="# of Cores: "
            max={32}
            defaultVal={hardwareInfo.numCores}
          />
          <SlideAbleSelection
            textAbove="Ram amount: "
            max={128}
            defaultVal={Math.round(hardwareInfo.ram / 1024 ** 3)}
            subtext={`Note: The actual ram we detected is ${(
              hardwareInfo.ram /
              1024 ** 3
            ).toFixed(2)} GB.  Some of this RAM is used by the OS`}
          />
          <FormControl
            style={{ marginLeft: '50px', width: '200px', marginTop: '50px' }}
          >
            <InputLabel>Architecture</InputLabel>
            <Select
              label="Architecture"
              defaultValue={hardwareInfo.machineArch}
            >
              {Architectures.map((architecture) => (
                <MenuItem
                  key={`MenuItem: ${architecture}`}
                  value={architecture}
                >
                  {architecture}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="CPU model"
            variant="standard"
            style={{ width: '60%', marginLeft: '50px', marginTop: '20px' }}
            defaultValue={hardwareInfo.cores[0].model}
          />
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              marginTop: '20px',
            }}
          >
            <Button variant="contained" className="button" style={{}}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
