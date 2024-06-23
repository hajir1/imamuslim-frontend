import { useGetHadist } from "../../state/Query";
import { HadistType } from "../../model/Interface";
import { Sekeleton } from "../element/Sekeleton";
import { Link } from "react-router-dom";

const Hadist = () => {
  const { data, isLoading } = useGetHadist();
  const skeletonArray: any = Array.from({ length: 5 }, (_, index) => index);
  return (
    <div className="w-full">
      {isLoading ? (
        <Sekeleton keyS={skeletonArray} custom="" />
      ) : (
        <div className="p-2 flex flex-wrap justify-evenly">
          {data && (data as []).length > 0 ? (
            (data as []).map((hadist: HadistType, index: number) => (
              <Link
              to={`/hadist/${hadist?.slug}`}
                key={index}
                className="w-full border rounded items-center transition-all duration-200 mt-3 p-4 flex justify-between hover:border-secondary lg:w-[33%]"
              >
                <h3 className="text-2xl text-gray-900">{hadist?.name}</h3>
                <p>{hadist?.total} hadist</p>
              </Link>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hadist;
