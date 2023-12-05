import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Chevron_directionDown.module.css';
import { Vector2Icon } from './Vector2Icon.js';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 30:29 */
export const Chevron_directionDown: FC<Props> = memo(function Chevron_directionDown(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.vector2}>
        <Vector2Icon className={classes.icon} />
      </div>
    </div>
  );
});
