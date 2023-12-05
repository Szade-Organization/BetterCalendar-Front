import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { Chevron_directionDown } from '../Chevron_directionDown/Chevron_directionDown.js';
import classes from './DropdownBox2.module.css';

interface Props {
  className?: string;
}
/* @figmaId 120:16 */
export const DropdownBox2: FC<Props> = memo(function DropdownBox2(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <select name="category" >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
});
