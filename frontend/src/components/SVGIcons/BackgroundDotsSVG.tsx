function BackgroundDotsSVG() {
  return (
    <svg
      fill="none"
      className="absolute w-96 h-96 text-slate-500 z-[1] top-[10%] left-[5%] opacity-80 rotate-45"
      viewBox="0 0 404 392"
    >
      <defs>
        <pattern
          id="837c3e70-6c3a-44e6-8854-cc48c737b659"
          width="20"
          height="20"
          x="0"
          y="0"
          patternUnits="userSpaceOnUse"
        >
          <path
            fill="currentColor"
            d="M0 0H4V4H0z"
            className="text-accent-500/20 dark:text-accent-800"
          ></path>
        </pattern>
      </defs>
      <path
        fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
        d="M0 0H404V392H0z"
      ></path>
    </svg>
  )
}

export default BackgroundDotsSVG
