import {
  useBookMarkHadist,
  useDarkmode,
  usePagination,
} from "../state/Zustand";
import Navbar from "../components/layouts/Navbar";
// import Hadist from "../components/layouts/Hadist";
import { Link, useParams } from "react-router-dom";
import {
  useGetHadist,
  useGetHadistById,
  useGetHadistBySlug,
} from "../state/Query";
import { HadistSlugType, HadistType, hadistSlug } from "../model/Interface";
import { Sekeleton, SekeletonHadist } from "../components/element/Sekeleton";
import React, { useEffect, useState } from "react";
import LoveIcon from "../components/element/Icon/LoveIcon";
export const HadistPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data, isLoading } = useGetHadist();
  const skeletonArray: any = Array.from({ length: 9 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col w-full`}
    >
      <Navbar type="hadist" />
      <div className="w-full mt-20">
        <div className="w-full p-2">
          {isLoading ? (
            <div className="p-2 flex flex-wrap justify-evenly">
              {skeletonArray?.map((item: any) => (
                <Sekeleton custom="h-20 lg-w-[33%] mt-3" key={item} />
              ))}
            </div>
          ) : (
            <div className="p-2 flex flex-wrap justify-evenly">
              {data && (data as []).length > 0 ? (
                (data as []).map((hadist: HadistType, index: number) => (
                  <Link
                    to={`/hadist/${hadist?.slug}`}
                    key={index}
                    className="w-full border rounded items-center transition-all duration-200 mt-3 p-4 flex justify-between hover:border-secondary lg:w-[33%]"
                  >
                    <h3
                      className={`${
                        darkMode ? "text-white" : "text-gray-900"
                      } text-2xl `}
                    >
                      {hadist?.name}
                    </h3>
                    <p>{hadist?.total} hadist</p>
                  </Link>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export const HadistBySlugPage = () => {
  const { slug } = useParams();
  const { nextPage, page, setPage, prevPage }: any = usePagination();
  const darkMode = useDarkmode((state) => state.darkMode);
  const data = useGetHadistBySlug(slug, page);
  const { bookMark, addBookMark }: any = useBookMarkHadist();
  const [fillLove, setFillLove] = useState<[]>([]);
  const [searchHadist, setSearchHadist] = useState<
    any | React.Dispatch<React.SetStateAction<any>>
  >("");
  const dataSearch = useGetHadistById(slug, searchHadist);
  const onHandleBookMark = (
    id: number,
    arabic: string,
    translate: string,
    love = true
  ) => {
    addBookMark({ id, arabic, translate, love, slug });
  };
  useEffect(() => {
    const filtered = bookMark.filter((item: any) => item.love === true);
    setFillLove(filtered);
  }, [bookMark]);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      {data.isLoading ? (
        <SekeletonHadist />
      ) : (
        <>
          {" "}
          <div className="w-full mt-4">
            <h1 className="text-center text-2xl">
              HR {(data?.data as HadistSlugType)?.name}
            </h1>
            <h1 className={`text-center`}>
              halaman ke{" "}
              {(data?.data as HadistSlugType)?.pagination?.currentPage}
            </h1>
          </div>
          {searchHadist !== "" ? (
            <div>
              {" "}
              <div className="flex w-full mt-10 justify-center">
                {" "}
                <input
                  type="number"
                  onChange={(e: any) => {
                    setSearchHadist(e.target.value);
                  }}
                  value={searchHadist}
                  placeholder="cari hadist"
                  className={`text-black w-1/2 outline-none border p-2 pl-3 placeholder:tracking-wider border-primary rounded-md lg:w-1/4 bg-gray-100`}
                />
              </div>
              <div className="w-full flex justify-center flex-wrap mt-10">
                <div
                  key={(dataSearch?.data as any)?.number}
                  className="p-2 lg:w-5/6"
                >
                  <div className="justify-between flex">
                    <h1>{(dataSearch?.data as any)?.number}</h1>
                    <LoveIcon
                      handleBookMark={() =>
                        onHandleBookMark(
                          (dataSearch?.data as any)?.number,
                          (dataSearch?.data as any)?.arab,
                          (dataSearch?.data as any)?.id
                        )
                      }
                      fill={
                        fillLove.some(
                          (data: any) =>
                            data.arabic === (dataSearch?.data as any)?.arab
                        )
                          ? darkMode
                            ? "white"
                            : "black"
                          : darkMode
                          ? "black"
                          : "white"
                      }
                    />
                  </div>
                  <h1
                    dir="rtl"
                    className="font-sans lg:tracking-wide leading-relaxed lg:leading-loose text-3xl"
                  >
                    {(dataSearch?.data as any)?.arab}
                  </h1>
                  <h1 className="text-base font-arabic lg:tracking-wide  my-4 lg:text-base leading-relaxed">
                    <span className="font-bold font-arabic">artinya </span>:{" "}
                    {(dataSearch?.data as any)?.id}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="w-full flex flex-wrap justify-center gap-1 mt-10">
                {(data?.data as HadistSlugType)?.pagination?.pages.map(
                  (pagination: any) => (
                    <p
                      onClick={() => setPage(pagination)}
                      key={pagination}
                      className={`${
                        page === pagination
                          ? "bg-primary text-white"
                          : darkMode
                          ? "border border-white"
                          : "border border-primary"
                      }   w-8 h-8 grid place-content-center lg:w-12`}
                    >
                      {pagination}
                    </p>
                  )
                )}
              </div>
              <div className="flex w-full mt-10 justify-center">
                {" "}
                <input
                  type="number"
                  onChange={(e: any) => {
                    setSearchHadist(e.target.value);
                  }}
                  value={searchHadist}
                  placeholder="cari hadist"
                  className={`w-1/2 outline-none border p-2 pl-3 placeholder:tracking-wider border-primary rounded-md lg:w-1/4 bg-gray-100 text-black`}
                />
              </div>
              <div className="w-full flex justify-center flex-wrap mt-10 p-2">
                {(data?.data as HadistSlugType)?.items?.map(
                  (hadits: hadistSlug) => (
                    <div
                      key={hadits?.number}
                      className={`${
                        darkMode
                          ? "border-b-white "
                          : "border-b-gray-500 lg:border-b-gray-200"
                      } w-full border-b-[1px] mt-2 lg:p-3 lg:w-5/6`}
                    >
                      <div className="justify-between flex">
                        <h1>{hadits?.number}</h1>
                        <LoveIcon
                          handleBookMark={() =>
                            onHandleBookMark(
                              hadits?.number,
                              hadits?.arab,
                              hadits?.id
                            )
                          }
                          fill={
                            fillLove.some(
                              (data: any) => data.arabic === hadits.arab
                            )
                              ? darkMode
                                ? "white"
                                : "black"
                              : darkMode
                              ? "black"
                              : "white"
                          }
                        />
                      </div>
                      <h1
                        dir="rtl"
                        className="font-sans lg:tracking-wide leading-relaxed lg:leading-loose text-3xl"
                      >
                        {hadits?.arab}
                      </h1>

                      <h1 className="text-base font-arabic lg:tracking-wide  my-4 lg:text-base leading-relaxed">
                        <span className="font-bold font-arabic">artinya </span>:{" "}
                        {hadits?.id}
                      </h1>
                    </div>
                  )
                )}
              </div>
              <div className="w-full flex flex-wrap justify-center gap-1 mt-10">
                {(data?.data as HadistSlugType)?.pagination?.pages.map(
                  (pagination: any) => (
                    <p
                      onClick={() => setPage(pagination)}
                      key={pagination}
                      className={`${
                        page === pagination
                          ? "bg-primary text-white"
                          : darkMode
                          ? "border border-white"
                          : "border border-primary"
                      }   w-8 h-8 grid place-content-center lg:w-12`}
                    >
                      {pagination}
                    </p>
                  )
                )}
              </div>
              <div className="w-full justify-evenly flex gap-2 my-2">
                {" "}
                <button
                  className={`${
                    darkMode
                      ? "bg-white text-black"
                      : "bg-secondary  text-white "
                  } p-1 rounded w-20`}
                  onClick={prevPage}
                >
                  prev
                </button>
                <button
                  className={`${
                    darkMode
                      ? "bg-white text-black"
                      : "bg-secondary  text-white "
                  } p-1 rounded w-20`}
                  onClick={() =>
                    nextPage(
                      (data?.data as HadistSlugType)?.pagination?.totalPages
                    )
                  }
                >
                  next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
