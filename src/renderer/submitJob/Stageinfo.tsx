import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { states } from '../types';

export default function Stageinfo({ curStage }: { curStage: number }) {
  const [stageText, setStageText] = useState('');

  useEffect(() => {
    console.log(curStage);
    if (curStage === states.CLICKEDRUN) {
      setStageText('Assigning Job');
    } else if (curStage === states.JOBASSIGNED) {
      setStageText('Sending Files');
    } else if (curStage === states.FILESSENT) {
      setStageText('Running Job');
    } else if (curStage === states.JOBDONE) {
      setStageText('Job Done');
    }
  }, [curStage]);

  return (
    <div>
      {curStage > states.NOTHINGDONE ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <div>{stageText}</div>
          {curStage !== states.JOBDONE ? (
            <LinearProgress style={{ width: '100%' }} />
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
