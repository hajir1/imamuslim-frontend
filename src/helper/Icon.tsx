import React from "react";

type PropsIcon = {
  handler?: (e: any) => void;
  handle2?: (e: any) => void;
  children: React.ReactNode;
  width: string;
  height: string;
  viewBox: string;
  classIcon?: any;
};

const Icon = ({
  handler,
  children,
  width,
  height,
  viewBox,
  classIcon,handle2
}: PropsIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onCopy={handle2}
      onClick={handler}
      className={`${classIcon} cursor-pointer`}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
};

export default Icon;
