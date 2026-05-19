const AudioMatiIcon = ({
  fill,
  ...props
}: {
  fill?: string;
} & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="1.6em"
      height="1.6em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <path d="M9 18L7 18L7 6L9 6L9 18"></path>
        <path d="M15 6L17 6L17 18L15 18L15 6"></path>
      </g>
    </svg>
  );
};

export default AudioMatiIcon;
