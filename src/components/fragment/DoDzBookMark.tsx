import DeleteMarkicon from "../element/Icon/DeleteMarkicon";
import { useDarkmode } from "../../state/TypeHooks";
import LoveIcon from "../element/Icon/LoveIcon";

type DoDzBookMarkType = {
  datas: [];
  handleDelete: (param: any) => void;
  pesan: string;
  type: string;
};

const DoDzBookMark = ({
  datas,
  handleDelete,
  pesan,
  type,
}: DoDzBookMarkType) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className="w-full ">
      {" "}
      <div className="flex justify-evenly gap-2 flex-wrap lg:justify-start">
        {" "}
        {datas?.length > 0 ? (
          datas?.map((data: any) => (
            <div
              key={Math.floor(Math.random() * 13267)}
              className={`${
                darkMode ? "border-b-white" : "border-b-black"
              } border-b-[1px] mt-2 w-[90%] rounded-md flex flex-col lg:my-4 lg:w-full`}
            >
              <div className="flex flex-col justify-around w-full ">
                <div className="flex justify-end">
                  <DeleteMarkicon
                    fill={`${darkMode ? "black" : "white"}`}
                    handler={() => {
                      type === "" && handleDelete(data?.id);
                      type === "hadist" && handleDelete(data?.arabic);
                    }}
                  />
                </div>
                <div className="w-full mt-2">
                  {type === "" && (
                    <h1 className="font-semibold uppercase text-base lg:text-xl">
                      {data?.title}
                    </h1>
                  )}
                  {type === "hadist" && (
                    <h1 className="font-semibold uppercase text-base lg:text-xl">
                      hr {data?.slug} hadist ke &nbsp; {data?.id}
                    </h1>
                  )}
                </div>
                <p
                  dir="rtl"
                  className={`${
                    darkMode ? "text-white" : "text-gray-700"
                  }font-sans lg:tracking-wide mt-2 leading-relaxed lg:leading-loose text-3xl`}
                >
                  {data?.arabic}
                </p>

                <p
                  className={`${
                    darkMode ? "text-white" : "text-gray-800"
                  } text-left text-lg my-2 lg:text-xl`}
                >
                  {data?.latin}
                </p>
                <p
                  className={`${
                    darkMode ? "text-white" : "text-gray-800"
                  } text-left text-base my-2 md:text-base`}
                >
                  <span className="font-semibold">artinya </span>:{" "}
                  {data?.translate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex text-sm justify-center gap-2 p-2">
            <p className="">klik icon</p> <LoveIcon fill={`white`} />
            <p className="">untuk bookmark {pesan}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoDzBookMark;
