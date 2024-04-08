import React, { useState } from 'react';
import { FormGroup, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';

import { Architectures } from '../renderer/types';

const RAMOptions = [4, 8, 16, 32];
const CoreOptions = [4, 8, 16, 32];

interface FormData {
  minRAM: number;
  minNumCores: number;
  architectures: string[];
}

const JobRequirementsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    minRAM: 4,
    minNumCores: 4,
    architectures: [],
  });

  const handleRAMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, minRAM: parseInt(event.target.value) });
  };

  const handleCoresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, minNumCores: parseInt(event.target.value) });
  };

  const handleArchitectureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let newArchitectures = [...formData.architectures];
    if (event.target.checked) {
      newArchitectures.push(value);
    } else {
      newArchitectures = newArchitectures.filter(arch => arch !== value);
    }

    setFormData({ ...formData, architectures: newArchitectures });
  };

  return (
    <FormGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend">Minimum RAM</FormLabel>
        <RadioGroup row name="minRAM" value={formData.minRAM} onChange={handleRAMChange}>
          {RAMOptions.map(option => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={`${option} GB`} />
          ))}
        </RadioGroup>
      </FormControl>
      
      <FormControl component="fieldset">
        <FormLabel component="legend">Minimum Number of Cores</FormLabel>
        <RadioGroup row name="minNumCores" value={formData.minNumCores} onChange={handleCoresChange}>
          {CoreOptions.map(option => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={`${option}`} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Architectures</FormLabel>
        {Architectures.map(architecture => (
          <FormControlLabel
            key={architecture}
            control={
              <Checkbox
                checked={formData.architectures.includes(architecture)}
                onChange={handleArchitectureChange}
                value={architecture}
              />
            }
            label={architecture}
          />
        ))}
      </FormControl>
    </FormGroup>
  );
};

export default JobRequirementsForm;