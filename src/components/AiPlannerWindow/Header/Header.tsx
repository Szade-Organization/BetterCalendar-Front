import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { CloseIcon } from './CloseIcon.js';
import classes from './Header.module.css';

interface Props {
  className?: string;
}
/* @figmaId 120:12 */
export const Header: FC<Props> = memo(function Header(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.turboAIPlannerGPT}>Turbo AI Planner GPT</div>
      <div className={classes.close}>
        <CloseIcon className={classes.icon} />
      </div>
    </div>
  );
});
