import { Slider } from '@mui/material';
import { useState } from 'react';

function SlideAbleSelection({
  textAbove,
  max,
  defaultVal,
  power2 = false,
  ClassName,
  subtext,
  onChange,
}: {
  textAbove: string;
  max: number;
  defaultVal: number;
  power2?: boolean;
  ClassName?: string | undefined;
  subtext?: string | undefined;
  onChange?: (val: number) => void | undefined;
}) {
  const [val, setVal] = useState(defaultVal);

  const calcVal = (value: number) => {
    return 2 ** value;
  };

  return (
    <div className={`${ClassName} slider`}>
      <div>
        {textAbove}
        {power2 ? calcVal(val) : val}
      </div>
      <Slider
        defaultValue={defaultVal}
        step={1}
        min={0}
        max={max}
        scale={power2 ? calcVal : (x) => x}
        onChange={(event, newVal) => {
          setVal(newVal as number);
          if (onChange !== undefined) {
            onChange(newVal as number);
          }
        }}
        valueLabelDisplay="auto"
      />
      {subtext ? <div>{subtext}</div> : ''}
    </div>
  );
}

export default SlideAbleSelection;
