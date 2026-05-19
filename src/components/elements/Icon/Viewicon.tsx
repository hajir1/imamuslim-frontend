import Icon from "../../../utils/Icon";
import { IconProps } from "../../../types/index";

/**
 * Component/Function  Viewicon.
 * Used to render or handle logic for Viewicon.
 */
const Viewicon = ({ handler, classIcon, fill }: IconProps) => {
  return (
    <Icon
      width="1.4em"
      classIcon={classIcon}
      height="1.4em"
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
