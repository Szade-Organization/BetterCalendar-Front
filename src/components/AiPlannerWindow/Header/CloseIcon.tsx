import { memo, SVGProps } from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M22 38L37.2028 22.4436' stroke='white' strokeWidth={3} />
    <path d='M37 38L21.7972 22.4436' stroke='white' strokeWidth={3} />
  </svg>
);

const Memo = memo(CloseIcon);
export { Memo as CloseIcon };
