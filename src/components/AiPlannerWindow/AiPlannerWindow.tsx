import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from '../../styles/AiPlannerWindow.module.css';
import { Chevron_directionDown } from './Chevron_directionDown/Chevron_directionDown.js';
import { CloseIcon } from './CloseIcon.js';

interface Props {
  className?: string;
}
/* @figmaId 33:19 */
export const AiPlannerWindow: FC<Props> = memo(function AiPlannerWindow(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.options}>
        <div className={classes.planMyDay}>
          <div className={classes.chooseTimeButton}>
            <div className={classes.rectangle1}></div>
            <div className={classes.planMyDay2}>Plan my day</div>
          </div>
          <div className={classes.dropdownBox}>
            <div className={classes.nextTuesday}>Next tuesday</div>
            <Chevron_directionDown className={classes.chevron} />
          </div>
        </div>
        <div className={classes.or}>or...</div>
        <div className={classes.planMyWeek}>
          <div className={classes.chooseTimeButton2}>
            <div className={classes.rectangle12}></div>
            <div className={classes.planMyWeek2}>Plan my week</div>
          </div>
          <div className={classes.dropdownBox2}>
            <div className={classes._27113411}>27.11 - 34.11</div>
            <Chevron_directionDown className={classes.chevron2} />
          </div>
        </div>
      </div>
      <div className={classes.header}>
        <div className={classes.turboAIPlannerGPT}>Turbo AI Planner GPT</div>
        <div className={classes.close}>
          <CloseIcon className={classes.icon} />
        </div>
      </div>
    </div>
  );
});
