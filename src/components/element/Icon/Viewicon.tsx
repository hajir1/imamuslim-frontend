import Icon from "../../../helper/Icon";
import { IconProps } from "../../../model/Interface";

const Viewicon = ({handler, classIcon, fill}:IconProps) => {
  return (
    <Icon
      width="1.6em"
      classIcon={classIcon}
      height="1.6em"
      handler={handler}
      viewBox="0 0 24 24"
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

export default Viewicon;
