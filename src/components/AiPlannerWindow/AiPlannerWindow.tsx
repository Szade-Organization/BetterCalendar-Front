import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from '../../styles/AiPlannerWindow.module.css';
import { ChooseDayButton } from './ChooseDayButton/ChooseDayButton.js';
import { ChooseWeekButton } from './ChooseWeekButton/ChooseWeekButton.js';
import { DropdownBox2 } from './DropdownBox2/DropdownBox2.js';
import { DropdownBox } from './DropdownBox/DropdownBox.js';
import { Header } from './Header/Header.js';

interface Props {
  className?: string;
}
/* @figmaId 33:19 */
export const AiPlannerWindow: FC<Props> = memo(function AiPlannerWindow(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.options}>
        <div className={classes.planMyDay}>
          <ChooseDayButton />
          <DropdownBox />
        </div>
        <div className={classes.or}>or...</div>
        <div className={classes.planMyWeek}>
          <ChooseWeekButton />
          <DropdownBox2 />
        </div>
      </div>
      <Header />
    </div>
  );
});
