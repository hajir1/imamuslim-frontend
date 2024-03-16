import Icon from "../../../helper/Icon";
import { IconProps } from "../../../model/Interface";

const AudioMatiIcon = ({handler, fill, classIcon}: IconProps) => {
  return (
    <Icon
      width="1.6em"
      height="1.6em"
      viewBox="0 0 24 24"
      handler={handler}
      classIcon={classIcon}
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
    </Icon>
  );
};

export default AudioMatiIcon;
