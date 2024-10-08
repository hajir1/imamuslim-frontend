import Icon from "../../../helper/Icon";
import { IconProps } from "../../../model/Interface";

const CopyIcon = ({handler, classIcon, fill}: IconProps) => {
  return (
    <Icon
      width="1.6em"
      handler={handler
      }
      height="1.6em"
      classIcon={classIcon}
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        d="M16 20H8a3 3 0 0 1-3-3V7a1 1 0 0 0-2 0v10a5 5 0 0 0 5 5h8a1 1 0 0 0 0-2m5-11.06a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19h-.09L14.06 2H10a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM19 15a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z"
      ></path>
    </Icon>
  );
};

export default CopyIcon;
