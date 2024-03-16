type SekeletonProps = {
  keyS?: any;
  custom: string;
};
const Sekeleton = ({ keyS, custom }: SekeletonProps) => {
  return (
    <div
      key={keyS}
      className={`${custom} w-full outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 `}
    ></div>
  );
};

export default Sekeleton;
