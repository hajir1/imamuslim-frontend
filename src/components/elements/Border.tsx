import { Hexagon } from "lucide-react";
import { useDarkmode } from "../../stores/TypeHooks";

type BorderProps = {
  number: number | string;
  animate?: string | boolean;
};

/**
 * Component: Border
 * Hexagonal numbered badge used for ayat / asmaul husna numbering.
 */
const Border = ({ number, animate }: BorderProps) => {
  const darkMode = useDarkmode((s) => s.darkMode);
  return (
    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center">
      <Hexagon
        size={44}
        strokeWidth={1.2}
        className={`${typeof animate === "string" ? animate : ""} ${
          darkMode ? "stroke-emerald-400" : "stroke-emerald-600"
        }`}
      />
      <span
        className={`absolute text-xs font-bold ${
          darkMode ? "text-emerald-300" : "text-emerald-700"
        }`}
      >
        {number}
      </span>
    </div>
  );
};

export default Border;
