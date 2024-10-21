import { Hexagon } from "lucide-react";
import { useDarkmode } from "../../state/TypeHooks";

type BorderProps = {
  number: number | string;
  color: string;
  numberClass?: any;
  animate?: any;
};
const Border = ({ number, numberClass, animate,color }: BorderProps) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className="flex w-12 h-12 items-center justify-center ">
      <Hexagon size={48} color={color} strokeWidth={0.75} className={animate} />
      <h1 className={`${numberClass} absolute`}>{number}</h1>
    </div>
  );
};

export default Border;
