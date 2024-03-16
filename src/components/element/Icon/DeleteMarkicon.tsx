import Icon from "../../../helper/Icon";
import { IconProps } from "../../../model/Interface";

const DeleteMarkicon = ({handler,classIcon,fill}: IconProps) => {
  return (
    <Icon
      width="1em"
      height="1em"
      classIcon={`${classIcon} mr-4`}
      handler={handler}
      viewBox="0 0 14 14"
    >
      <path
        fill={fill}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.5.5h-11a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1m-12 3h13m-4.5 7l-4-4m4 0l-4 4"
      ></path>
    </Icon>
  );
};

export default DeleteMarkicon;
