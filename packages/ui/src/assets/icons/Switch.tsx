import * as React from "react";
import type { SVGProps } from "react";
const SvgSwitch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    className="switch_svg__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="m668.562 596.697 34.692-77a459.5 459.5 0 0 0-152.306-38.922 241.997 241.997 0 1 0-78.691 0A532.225 532.225 0 0 0 5.185 1024h84.614a443.38 443.38 0 0 1 423.073-462.841 389.2 389.2 0 0 1 155.69 35.538m-313.92-355.38a156.537 156.537 0 1 1 158.23 156.536 156.537 156.537 0 0 1-158.23-156.537"
    />
    <path
      fill="currentColor"
      d="m836.945 599.235-59.23 60.923 28.769 27.923h-313.92v84.614h522.072zm181.921 236.92H496.795l174.306 169.23 59.23-60.923-25.384-23.692h313.92z"
    />
  </svg>
);
export default SvgSwitch;
