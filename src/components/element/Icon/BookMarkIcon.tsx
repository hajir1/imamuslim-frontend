import Icon from "../../../helper/Icon";
import { IconProps } from "../../../model/Interface";

const BookMarkIcon = ({ handler, fill, classIcon }: IconProps) => {
  return (
    <Icon width="1.6em" handler={handler} classIcon={classIcon} height="1.6em" viewBox="0 0 32 32">
      <path
        fill={fill}
        d="M24 16v10.752l-7.096-3.59l-.904-.457l-.9.456L8 26.748V4h10V2H8a2 2 0 0 0-2 2v26l10-5.054L26 30V16Z"
      ></path>
      <path fill={fill} d="M26 6V2h-2v4h-4v2h4v4h2V8h4V6z"></path>
    </Icon>
  );
};

export default BookMarkIcon;
