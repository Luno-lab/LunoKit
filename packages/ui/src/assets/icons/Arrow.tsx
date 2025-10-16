import type { SVGProps } from 'react';

const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="arrow_svg__icon"
    viewBox="0 0 256 256"
    width="20"
    height="20"
    fill="currentColor"
    {...props}
  >
    <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
  </svg>
);
export default SvgArrow;
