/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import './App.css';
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Slider,
  TextField,
} from '@mui/material';
import { hardwareInfoType } from './types';

const Architectures = [
  'arm',
  'arm64',
  'aarch64',
  'mpis',
  'mpis64',
  'ppc64',
  'ppc64le',
  's390',
  's390x',
  'i386',
  'i686',
  'x86_64',
  'sparc',
];

function SlideAbleSelection({
  textAbove,
  max,
  defaultVal,
  ClassName,
  subtext,
}: {
  textAbove: string;
  max: number;
  defaultVal: number;
  ClassName?: string | undefined;
  subtext?: string | undefined;
}) {
  const [val, setVal] = useState(defaultVal);

  return (
    <div
      className={ClassName}
      style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}
    >
      <div>
        {textAbove}
        {val}
      </div>
      <Slider
        defaultValue={defaultVal}
        step={1}
        min={1}
        max={max}
        onChange={(event, newVal) => {
          setVal(newVal as number);
        }}
        valueLabelDisplay="auto"
      />
      {subtext === undefined ? '' : <div>{subtext}</div>}
    </div>
  );
}

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
        console.error('Error fetching hardware info:', error);
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
            <InputLabel style={{ color: 'white' }}>Architecture</InputLabel>
            <Select
              label="Architecture"
              defaultValue={hardwareInfo.machineArch}
              style={{ color: 'white' }}
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
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
          />
        </div>
      )}
    </>
  );
}
