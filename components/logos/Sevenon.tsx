// components/logos/Logo.tsx
import React from "react";

const Sevenon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="red"
      strokeWidth="5"
    />
  </svg>
);

export default Sevenon;
