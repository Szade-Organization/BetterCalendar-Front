import { memo, SVGProps } from 'react';

const Vector2Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 0L4 4L8 0' stroke='#404040' />
  </svg>
);

const Memo = memo(Vector2Icon);
export { Memo as Vector2Icon };
