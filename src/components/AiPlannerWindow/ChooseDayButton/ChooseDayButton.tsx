import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './ChooseDayButton.module.css';

interface Props {
  className?: string;
}
/* @figmaId 120:13 */
export const ChooseDayButton: FC<Props> = memo(function ChooseDayButton(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.planMyDay}>Plan my day</div>
    </div>
  );
});
