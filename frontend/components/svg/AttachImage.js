const AttachImageSvg = (props) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    width={53}
    height={53}
    {...props}
  >
    <defs>
      <circle id="a" cx={26.5} cy={26.5} r={25.5} />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <g clipPath="url(#b)">
      <path
        fill="#AC44CF"
        d="M26.5-1.1C11.9-1.1-1.1 5.6-1.1 27.6h55.2c-.1-19-13-28.7-27.6-28.7z"
      />
      <path
        fill="#BF59CF"
        d="M53 26.5H-1.1c0 14.6 13 27.6 27.6 27.6s27.6-13 27.6-27.6H53z"
      />
      <path fill="#AC44CF" d="M17 24.5h18v9H17z" />
    </g>
    <path
      d="M18.318 18.25h16.364c.863 0 1.727.827 1.811 1.696l.007.137v12.834c0 .871-.82 1.741-1.682 1.826l-.136.007H18.318a1.83 1.83 0 0 1-1.812-1.684l-.006-.149V20.083c0-.87.82-1.741 1.682-1.826l.136-.007h16.364Zm5.081 8.22-3.781 5.044c-.269.355-.052.736.39.736h12.955c.442-.011.701-.402.421-.758l-2.682-3.449a.54.54 0 0 0-.841-.011l-2.262 2.727-3.339-4.3a.54.54 0 0 0-.861.011Zm8.351-5.22a1.75 1.75 0 1 0 .001 3.501 1.75 1.75 0 0 0-.001-3.501Z"
      fill="#F5F5F5"
    />
  </svg>
);

export default AttachImageSvg;
