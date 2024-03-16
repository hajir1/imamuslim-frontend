import { useDarkmode } from "../../state/Zustand";

type BorderProps = {
  number: number | string;
  border: string;
  numberClass? : string
};
const Border = ({ number, border, numberClass }: BorderProps) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className="flex w-12 h-12 items-center justify-center ">
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[45deg]`}
      ></span>
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[90deg]`}
      ></span>
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[135deg`}
      ></span>
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[180deg`}
      ></span>
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[225deg`}
      ></span>
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[270deg`}
      ></span>
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[315deg`}
      ></span>
      <span
        className={`border ${darkMode?"border-white": border} w-8 h-8 absolute group-hover:border-2  group-hover:animate-spin-slow rotate-[360deg`}
      ></span>
      <h1 className={numberClass}>{number}</h1>
    </div>
  );
};

export default Border;
