import { useState, useEffect } from 'react';
import '../App.css';
import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { hardwareInfoType, Architectures } from '../types';
import SlideAbleSelection from '../components/Input';
import './peer-worker.css';

export default function WorkerPage() {
  const [hardwareInfo, setHardwareInfo] = useState<hardwareInfoType | null>(
    null,
  );
  const [userData, setUserData] = useState({
    cores: 0,
    ram: 0,
    arch: '',
    cpu: '',
  });

  useEffect(() => {
    async function fetchHardwareInfo() {
      try {
        const result = await window.electron.ipcRenderer.getHardwareInfo();
        setHardwareInfo(result);
        setUserData({
          cores: result.numCores,
          ram: Math.round(result.ram / 1024 ** 3),
          arch: result.machineArch,
          cpu: result.cores[0].model,
        });
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
        <div className="loading-div">
          <LinearProgress className="loading" />
          <div style={{ padding: '2%' }}> Scanning Hardware </div>
        </div>
      ) : (
        <div
          style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}
        >
          <div className="subtitle">Please fill out the following data:</div>

          <div style={{ margin: '20px' }}>
            NOTE: We filled some in for you already just change what is wrong
          </div>
          <SlideAbleSelection
            textAbove="# of Cores: "
            max={32}
            defaultVal={hardwareInfo.numCores}
            onChange={(value) => {
              setUserData({ ...userData, cores: value });
            }}
          />
          <SlideAbleSelection
            textAbove="Ram amount: "
            power2
            ClassName="ram-selection"
            max={Math.log2(128)}
            defaultVal={Math.log2(Math.round(hardwareInfo.ram / 1024 ** 3))}
            onChange={(value) => {
              setUserData({ ...userData, ram: value ** 2 });
            }}
            subtext={`Note: The actual ram we detected is ${(
              hardwareInfo.ram /
              1024 ** 3
            ).toFixed(2)} GB.  Some of this RAM is used by the OS`}
          />
          <FormControl className="arch-form">
            <InputLabel>Architecture</InputLabel>
            <Select
              label="Architecture"
              defaultValue={hardwareInfo.machineArch}
              onChange={(event) => {
                setUserData({ ...userData, arch: event.target.value });
              }}
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
            className="cpu-input"
            defaultValue={hardwareInfo.cores[0].model}
            onChange={(event) => {
              setUserData({ ...userData, cpu: event.target.value });
            }}
          />
          <div className="submit-button">
            <Link to="/runningjobs" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                className="button"
                onClick={() => {
                  console.log(userData);
                }}
              >
                Submit
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
