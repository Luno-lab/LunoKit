import type { SVGProps } from 'react';
import * as React from 'react';

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="copy_svg__icon"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z"></path>
  </svg>
);
export default SvgCopy;
