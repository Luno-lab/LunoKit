import * as React from "react";
import type { SVGProps } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="arrow_svg__icon"
    viewBox="0 0 1024 1024"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="m731.733 480-384-341.333c-17.066-14.934-44.8-14.934-59.733 4.266-14.933 17.067-14.933 44.8 4.267 59.734L640 512 292.267 821.333C275.2 836.267 273.067 864 288 881.067 296.533 889.6 307.2 896 320 896c10.667 0 19.2-4.267 27.733-10.667l384-341.333c8.534-8.533 14.934-19.2 14.934-32s-4.267-23.467-14.934-32"
    />
  </svg>
);
export default SvgArrow;
