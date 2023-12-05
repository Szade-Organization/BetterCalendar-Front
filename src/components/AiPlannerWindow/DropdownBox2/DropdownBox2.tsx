import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './DropdownBox2.module.css';
import React from 'react';

interface Props {
  className?: string;
}
/* @figmaId 120:16 */
export const DropdownBox2: FC<Props> = memo(function DropdownBox2(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <select name="category" >
        <option value="option1">Week1</option>
        <option value="option2">Week2</option>
        <option value="option3">Week3</option>
      </select>
    </div>
  );
});
