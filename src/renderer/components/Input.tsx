import { Slider } from '@mui/material';
import { useState } from 'react';

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

export { SlideAbleSelection };
