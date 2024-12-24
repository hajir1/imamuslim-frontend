import { TypeDataSurahById } from "../../model/Interface";
import { Link } from "react-router-dom";
import HomeIcon from "../element/Icon/Homeicon";
import { Dispatch, SetStateAction } from "react";
import { useDarkmode } from "../../state/TypeHooks";

type TypeBreadCrumbV1 = {
  firstRoute: string;
  secondRoute?: string;
  thirdRoute?: string;
  option?: string | Dispatch<SetStateAction<string>>;
  setOption?: any;
  routeOption1?: string;
  routeOption2?: string;
};
// tanpa darkmode
export const BreadCrumbV1 = ({
  firstRoute,
  setOption,
  option,
  routeOption1,
  routeOption2,
}: TypeBreadCrumbV1) => {
  const { darkMode }: any = useDarkmode((state) => state.darkMode);
  return (
    <nav className={`flex gap-1 top-0 w-full p-1`} aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center ml-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to={`/`}
            className="inline-flex items-center text-sm font-medium underline  "
          >
            <HomeIcon
              handler={() => (window.location.href = `/`)}
              fill={darkMode ? "white" : "black"}
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
        {option && (
          <li className="">
            <div
              onClick={() => {
                if (option === routeOption1) {
                  setOption(routeOption2);
                } else {
                  setOption(routeOption1);
                }
              }}
              className="flex items-center"
            >
              &raquo;
              {option === routeOption1 ? (
                <div className="relative flex items-center underline">
                  {/* <TerjemahbtnIcon /> */}
                  <p className="ms-1 text-sm font-bold md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {routeOption1}
                  </p>
                </div>
              ) : (
                <div className="relative flex items-center underline">
                  {/* <BacaIcon width="1.4rem" height="1.4rem" /> */}
                  <p className="ms-1 text-sm font-bold  md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {routeOption2}
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
