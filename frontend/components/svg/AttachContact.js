const AttachContactSvg = (props) => (
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
        fill="#0795DC"
        d="M26.5-1.1C11.9-1.1-1.1 5.6-1.1 27.6h55.2c-.1-19-13-28.7-27.6-28.7z"
      />
      <path
        fill="#0EABF4"
        d="M53 26.5H-1.1c0 14.6 13 27.6 27.6 27.6s27.6-13 27.6-27.6H53z"
      />
    </g>
    <path
      d="M26.5 26.5A4.5 4.5 0 0 0 31 22a4.5 4.5 0 0 0-4.5-4.5A4.5 4.5 0 0 0 22 22a4.5 4.5 0 0 0 4.5 4.5Zm0 2.25c-3.004 0-9 1.508-9 4.5v1.125c0 .619.506 1.125 1.125 1.125h15.75c.619 0 1.125-.506 1.125-1.125V33.25c0-2.992-5.996-4.5-9-4.5Z"
      fill="#F5F5F5"
    />
  </svg>
);

export default AttachContactSvg;
