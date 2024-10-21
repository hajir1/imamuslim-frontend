import { TypeDataSurahById } from "../../model/Interface";
import { Link } from "react-router-dom";
import HomeIcon from "../element/Icon/Homeicon";
import { Dispatch, SetStateAction } from "react";
import { useDarkmode } from "../../state/TypeHooks";

type TypeBreadCrumbV1 = {
  response: TypeDataSurahById | string | any;
  firstRoute: string;
  secondRoute?: string;
  thirdRoute?: string;
  option?: string | Dispatch<SetStateAction<string>>;
  setOption?: any;
  opsi1?: string;
  opsi2?: string;
  type: string;
};
// tanpa darkmode
export const BreadCrumbV1 = ({
  response,
  firstRoute,
  secondRoute,
  thirdRoute,
  setOption,
  option,
  opsi1,
  opsi2,
  type,
}: TypeBreadCrumbV1) => {
  const { darkMode }: any = useDarkmode((state) => state.darkMode);
  return (
    <nav className="flex gap-1 top-0 w-full p-4" aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse lg:ml-10">
        <li className="inline-flex items-center">
          <Link
            to={`/`}
            className="inline-flex items-center text-sm font-medium underline   dark:text-gray-400 dark:hover:text-white"
          >
            <HomeIcon
              handler={() => (window.location.href = `/`)}
              fill={`${darkMode ? "white" : "black"}`}
            />
            &nbsp;Home
          </Link>
        </li>
        <li className="">
          <div className="flex items-center">
            &raquo;
            <Link
              to={`/quran`}
              className="ms-1 text-sm font-medium underline  md:ms-2 dark:text-gray-400 dark:hover:text-white"
            >
              {firstRoute}
            </Link>
          </div>
        </li>
        <li className={`${type === "" && "hidden"}`}>
          <div className="flex items-center">
            &raquo;
            <p className="ms-1 text-sm font-medium  md:ms-2 dark:text-gray-400 dark:hover:text-white">
              {secondRoute}
            </p>
          </div>
        </li>
        <li className={`${type === "" && "hidden"}`}>
          <div className="flex items-center">
            &raquo;
            <p className="ms-1 text-sm font-medium  md:ms-2 dark:text-gray-400 dark:hover:text-white">
              {type === "surahById" &&
                (response.data as TypeDataSurahById)?.data?.name
                  ?.transliteration?.id}
              {type === "juzById" && thirdRoute}
            </p>
          </div>
        </li>
        {option && (
          <li className="">
            <div
              onClick={() => {
                if (option === opsi1) {
                  setOption(opsi2);
                } else {
                  setOption(opsi1);
                }
              }}
              className="flex items-center"
            >
              &raquo;
              {option === opsi1 ? (
                <div className="relative flex items-center underline">
                  {/* <TerjemahbtnIcon /> */}
                  <p className="ms-1 text-sm font-bold md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {opsi1}
                  </p>
                </div>
              ) : (
                <div className="relative flex items-center underline">
                  {/* <BacaIcon width="1.4rem" height="1.4rem" /> */}
                  <p className="ms-1 text-sm font-bold  md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {opsi2}
                  </p>
                </div>
              )}
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};
