import React from 'react';

import React from 'react';
  
  // Define props type for better TypeScript integration
  interface SevenonSvgProps extends React.SVGProps<SVGSVGElement> {
    // Add any custom props specific to this icon if needed
    // size?: number | string;
  }
  
  const SevenonSvg: React.FC<SevenonSvgProps> = (props) => (
    <svg {...props} width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_di_0_1)">
  <path d="M208 124.816C208 135.716 205.853 146.509 201.682 156.579C197.511 166.649 191.397 175.799 183.69 183.506C175.983 191.213 166.833 197.327 156.763 201.498C146.693 205.669 135.9 207.816 125 207.816C114.1 207.816 103.307 205.669 93.2373 201.498C83.1673 197.327 74.0174 191.213 66.3101 183.506C58.6029 175.799 52.4891 166.649 48.318 156.579C44.1469 146.509 42 135.716 42 124.816C42 102.803 50.7446 81.6917 66.3101 66.1262C81.8757 50.5607 102.987 41.8161 125 41.8161C147.013 41.8161 168.124 50.5607 183.69 66.1262C199.255 81.6917 208 102.803 208 124.816Z" fill="#F8F8F8" stroke="#F44336" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <path d="M168.691 87.4193L175.171 98.688L104.162 98.5635L100.69 98.5626L102.418 101.569L122.592 136.63L116.676 146.849L82.62 87.6252L82.7861 87.3363L168.691 87.4193ZM176.974 102.699L133.137 178.335L119.379 178.311L155.674 115.695L157.418 112.689L153.946 112.688L113.405 112.622L107.624 102.577L176.974 102.699ZM150.461 116.69L115.206 177.514L73.0354 104.176L80.3017 91.6288L114.928 151.853L116.661 154.865L118.401 151.855L138.782 116.675L150.461 116.69Z" fill="#FF6B5B"/>
  <path d="M176.974 102.699L133.137 178.335L119.379 178.311L155.674 115.695L157.418 112.689L153.946 112.688L113.405 112.622L107.624 102.577L176.974 102.699Z" fill="#F44336"/>
  <defs>
  <filter id="filter0_di_0_1" x="0.5" y="0.316082" width="249" height="249" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset/>
  <feGaussianBlur stdDeviation="20"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.415686 0 0 0 0 0.301961 0 0 0 0.2 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset/>
  <feGaussianBlur stdDeviation="4"/>
  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
  <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1"/>
  </filter>
  </defs>
  </svg>
  
  );
  
  export default SevenonSvg;
