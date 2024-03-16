import Icon from "../../../helper/Icon";
import { IconProps } from "../../../model/Interface";


const HomeIcon = ({handler, classIcon, fill} : IconProps) => {
  return (
    <Icon
      width="1.4em"
      height="1.4em"
      handler={handler}
      classIcon={classIcon}
      viewBox="0 0 32 32"
    >
      <path
        fill={fill}
        d="m16 2.594l-.719.687l-13 13L3.72 17.72L5 16.437V28h9V18h4v10h9V16.437l1.281 1.282l1.438-1.438l-13-13zm0 2.844l9 9V26h-5V16h-8v10H7V14.437z"
      ></path>
    </Icon>
  );
};

export default HomeIcon;
