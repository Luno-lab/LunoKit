import * as React from "react";
import type { SVGProps } from "react";
const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    width="1em"
    height="1em"
    {...props}
  >
    <g clipPath="url(#back_svg__a)">
      <path
        fill="currentColor"
        d="M9-10.5A19.5 19.5 0 1 0 28.5 9 19.52 19.52 0 0 0 9-10.5m0 36A16.5 16.5 0 1 1 25.5 9 16.52 16.52 0 0 1 9 25.5M18 9a1.5 1.5 0 0 1-1.5 1.5H5.12l3.441 3.439A1.502 1.502 0 0 1 6.44 16.06l-6-6a1.5 1.5 0 0 1 0-2.122l6-6A1.5 1.5 0 0 1 8.56 4.06L5.121 7.5H16.5A1.5 1.5 0 0 1 18 9"
      />
    </g>
    <defs>
      <clipPath id="back_svg__a">
        <path fill="currentColor" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBack;
