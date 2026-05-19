import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Home } from "lucide-react";

type TypeBreadCrumb = {
  firstRoute: string;
  firstRouteLink: string;
  secondRoute?: string;
  thirdRoute?: string;
  option?: string | Dispatch<SetStateAction<string>>;
  setOption?: (param: string | undefined) => void;
  routeStatus1?: string;
  routeStatus2?: string;
};
// tanpa darkmode
export const BreadCrumb = ({
  firstRoute,
  firstRouteLink,
  setOption,
  option,
  routeStatus1,
  routeStatus2,
}: TypeBreadCrumb) => {
  return (
    <nav className={`flex gap-1 w-full p-1`} aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center ml-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to={`/`}
            className="inline-flex items-center text-sm font-medium "
          >
            <Home
              className="mx-1 "
              onClick={() => (window.location.href = `/`)}
            ></Home>
            &nbsp;Home
          </Link>
        </li>
        <li className="">
          {/* first dynamic route */}
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
            {/* set new status here... */}
            {/* indication when user clicks route1, then change to route2 */}
            <div
              onClick={() => {
                if (option === routeStatus1) {
                  /** handle if setOption is used */
                  setOption && setOption(routeStatus2);
                } else {
                  setOption && setOption(routeStatus1);
                }
              }}
              className="flex items-center cursor-pointer"
            >
              -{/* show current status */}
              {option === routeStatus1 ? (
                <div className="relative flex items-center">
                  <p className="ms-1 text-sm font-bold md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {routeStatus1}
                  </p>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <p className="ms-1 text-sm font-bold  md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {routeStatus2}
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
