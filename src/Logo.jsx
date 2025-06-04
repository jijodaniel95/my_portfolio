import React from 'react'

const Logo = () => {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="512" height="512" rx="128" fill="url(#gradient)" />
      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B82F6" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <text
        x="256"
        y="320"
        fontSize="240"
        fontWeight="bold"
        fontFamily="Arial"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        JD
      </text>
    </svg>
  )
}

export default Logo 