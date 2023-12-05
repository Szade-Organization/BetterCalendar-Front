import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { Chevron_directionDown } from '../Chevron_directionDown/Chevron_directionDown.js';
import classes from './DropdownBox.module.css';

interface Props {
  className?: string;
}
/* @figmaId 120:14 */
export const DropdownBox: FC<Props> = memo(function DropdownBox(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <select name="category" >
        <option value="option1">Monday</option>
        <option value="option2">Tuesday</option>
        <option value="option3">Wednesday</option>
        <option value="option4">Thursday</option>
        <option value="option5">Friday</option>
        <option value="option6">Saturday</option>
        <option value="option7">Sunday</option>
      </select>
    </div>
  );
});
