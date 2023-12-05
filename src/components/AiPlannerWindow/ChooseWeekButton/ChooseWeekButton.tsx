import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './ChooseWeekButton.module.css';

interface Props {
  className?: string;
}
/* @figmaId 120:15 */
export const ChooseWeekButton: FC<Props> = memo(function ChooseWeekButton(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.planMyWeek}>Plan my week</div>
    </div>
  );
});
