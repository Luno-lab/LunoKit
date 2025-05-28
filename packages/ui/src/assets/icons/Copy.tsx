import * as React from "react";
import type { SVGProps } from "react";
const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 16"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="M3.042 12.303h1.142v.998c0 1.551.854 2.4 2.413 2.4h7.027c1.559 0 2.414-.849 2.414-2.4V6.246c0-1.552-.855-2.4-2.414-2.4h-1.141V2.843c0-1.545-.855-2.4-2.413-2.4H3.042C1.484.442.63 1.29.63 2.842v7.061c0 1.552.855 2.4 2.413 2.4m.192-1.764c-.547 0-.841-.273-.841-.854V3.06c0-.582.294-.848.84-.848h6.645c.547 0 .841.266.841.848v.786H6.597c-1.559 0-2.413.847-2.413 2.4v4.292zm3.554 3.398c-.546 0-.84-.267-.84-.848V6.458c0-.581.294-.848.84-.848h6.645c.547 0 .84.267.84.848v6.63c0 .582-.293.849-.84.849z"
    />
  </svg>
);
export default SvgCopy;
