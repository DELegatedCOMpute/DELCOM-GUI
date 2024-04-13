import React, { useState } from 'react';
import {
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Chip,
  Box,
  SelectChangeEvent,
} from '@mui/material';

import { Architectures } from '../types';

const RAMOptions = [0, 2, 4, 8, 16, 32, 64];
const CoreOptions = [0, 4, 8, 16, 32];

interface FormData {
  minRAM: number;
  minNumCores: number;
  architectures: string[];
}

export default function JobRequirementsForm() {
  const [formData, setFormData] = useState<FormData>({
    minRAM: 0,
    minNumCores: 0,
    architectures: [],
  });

  const handleRAMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, minRAM: parseInt(event.target.value, 10) });
  };

  const handleCoresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, minNumCores: parseInt(event.target.value, 10) });
  };

  const handleArchitectureChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;

    setFormData({ ...formData, architectures: value as string[] });
  };

  return (
    <FormGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend">Minimum RAM</FormLabel>
        <RadioGroup
          row
          name="minRAM"
          value={formData.minRAM}
          onChange={handleRAMChange}
        >
          {RAMOptions.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={`${option} GB`}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Minimum Number of Cores</FormLabel>
        <RadioGroup
          row
          name="minNumCores"
          value={formData.minNumCores}
          onChange={handleCoresChange}
        >
          {CoreOptions.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={`${option}`}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Architectures</InputLabel>
        <Select
          multiple
          value={formData.architectures}
          onChange={handleArchitectureChange}
          input={<OutlinedInput id="chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {Architectures.map((arch) => (
            <MenuItem key={arch} value={arch}>
              {arch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormGroup>
  );
}
