import Icon from "../../../helper/Icon";
import { IconProps } from "../../../model/Interface";

const NotViewIcon = ({classIcon,fill,handler}: IconProps) => {
  return (
    <Icon
      width="1em"
      classIcon={classIcon}
      height="1em"
      viewBox="0 0 24 24"
      
      handler={handler
      }
    >
      {" "}
      <path
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m7 10l5 5l5-5"
      ></path>
    </Icon>
  );
};

export default NotViewIcon;
