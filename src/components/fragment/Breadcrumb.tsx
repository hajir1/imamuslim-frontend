import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Home } from "lucide-react";

type TypeBreadCrumbV1 = {
  firstRoute: string;
  firstRouteLink: string;
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
  firstRouteLink,
  setOption,
  option,
  routeOption1,
  routeOption2,
}: TypeBreadCrumbV1) => {
  return (
    <nav className={`flex gap-1 top-0 w-full p-1`} aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center ml-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to={`/`}
            className="inline-flex items-center text-sm font-medium "
          >
            <Home
              className="mx-1"
              onClick={() => (window.location.href = `/`)}
            ></Home>
            &nbsp;Home
          </Link>
        </li>
        <li className="">
          <div className="flex items-center">
            -
            <Link
              to={firstRouteLink}
              className="ms-1 text-sm font-medium md:ms-2 dark:text-gray-400 dark:hover:text-white"
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
              className="flex items-center cursor-pointer"
            >
              -
              {option === routeOption1 ? (
                <div className="relative flex items-center">
                  <p className="ms-1 text-sm font-bold md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {routeOption1}
                  </p>
                </div>
              ) : (
                <div className="relative flex items-center">
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
