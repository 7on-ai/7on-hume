import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={250}
    height={250}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#a)">
      <path
        d="M208 124.816a83.003 83.003 0 0 1-51.237 76.682 83.003 83.003 0 0 1-108.445-44.919A83.001 83.001 0 1 1 208 124.816Z"
        fill="#F8F8F8"
        stroke="#F44336"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <path
      d="m168.691 87.42 6.48 11.268-71.009-.124-3.472-.001 1.728 3.006 20.174 35.061-5.916 10.219L82.62 87.625l.166-.289 85.905.083Zm8.283 15.279-43.837 75.636-13.758-.024 36.295-62.616 1.744-3.006-3.472-.001-40.541-.066-5.781-10.045 69.35.122Zm-26.513 13.991-35.255 60.824-42.17-73.338 7.266-12.547 34.626 60.224 1.733 3.012 1.74-3.01 20.381-35.18 11.679.015Z"
      fill="#FF6B5B"
    />
    <path
      d="m176.974 102.699-43.837 75.636-13.758-.024 36.295-62.616 1.744-3.006-3.472-.001-40.541-.066-5.781-10.045 69.35.122Z"
      fill="#F44336"
    />
    <defs>
      <filter
        id="a"
        x={0.5}
        y={0.316}
        width={249}
        height={249}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={20} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.415686 0 0 0 0 0.301961 0 0 0 0.2 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_0_1"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend in2="shape" result="effect2_innerShadow_0_1" />
      </filter>
    </defs>
  </svg>
)

export default SvgComponent
