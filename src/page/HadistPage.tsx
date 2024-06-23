import { useDarkmode, usePagination } from "../state/Zustand";
import Navbar from "../components/layouts/Navbar";
// import Hadist from "../components/layouts/Hadist";
import { Link, useParams } from "react-router-dom";
import {
  useGetHadist,
  useGetHadistById,
  useGetHadistBySlug,
} from "../state/Query";
import { HadistSlugType, HadistType, hadistSlug } from "../model/Interface";
import Border from "../components/element/Border";
import { Sekeleton } from "../components/element/Sekeleton";
import React, {  useState } from "react";
export const HadistPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data, isLoading } = useGetHadist();
  const skeletonArray: any = Array.from({ length: 5 }, (_, index) => index);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <Navbar type="hadist" />
      <div className="w-full mt-20">
        <div className="w-full">
          {isLoading ? (
            <div className="p-2 flex flex-wrap justify-evenly">
              <Sekeleton keyS={skeletonArray} custom="h-20" />
              <Sekeleton keyS={skeletonArray} custom="h-20" />
              <Sekeleton keyS={skeletonArray} custom="h-20" />
              <Sekeleton keyS={skeletonArray} custom="h-20" />
              <Sekeleton keyS={skeletonArray} custom="h-20" />
              <Sekeleton keyS={skeletonArray} custom="h-20" />
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
  const { nextPage, page, setPage, prevPage } = usePagination();
  const darkMode = useDarkmode((state) => state.darkMode);
  const data = useGetHadistBySlug(slug, page);
  const [searchHadist, setSearchHadist] = useState<
    any | React.Dispatch<React.SetStateAction<any>>
  >("");
  const dataSearch = useGetHadistById(slug, searchHadist);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <div className="w-full mt-4">
        <h1 className="text-center text-2xl">
          HR {(data?.data as HadistSlugType)?.name}
        </h1>
        <h1 className="text-center">
          halaman ke {(data?.data as HadistSlugType)?.pagination?.currentPage}
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
              className="w-1/2 outline-none border p-2 pl-3 placeholder:tracking-wider border-gray-800 rounded-md"
            />
          </div>
          <div className="w-full flex justify-center flex-wrap mt-10">
            <div
              key={(dataSearch?.data as any)?.number}
              className="p-2 lg:w-5/6"
            >
              <Border
                border="border-black"
                numberClass={`${darkMode ? "text-white" : "text-black"}`}
                number={(dataSearch?.data as any)?.number}
              />{" "}
              <h1 className="text-right text-2xl lg:text-4xl lg:tracking-wider leading-snug">
                {(dataSearch?.data as any)?.arab}
              </h1>
              <h1 className="text-sm  my-4 lg:text-base leading-relaxed">
                <span className="font-semibold">arti </span>:{" "}
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
                      ? "bg-gray-400 text-white"
                      : "border border-black"
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
              className="w-1/2 outline-none border p-2 pl-3 placeholder:tracking-wider border-gray-800 rounded-md"
            />
          </div>
          <div className="w-full flex justify-center flex-wrap mt-10">
            {(data?.data as HadistSlugType)?.items?.map(
              (hadits: hadistSlug) => (
                <div key={hadits?.number} className="p-2 lg:w-5/6">
                  <Border
                    border="border-black"
                    numberClass={`${darkMode ? "text-white" : "text-black"}`}
                    number={hadits?.number}
                  />{" "}
                  <h1 className="text-right text-2xl lg:text-4xl lg:tracking-wider leading-snug">
                    {hadits?.arab}
                  </h1>
                  <h1 className="text-sm  my-4 lg:text-base leading-relaxed">
                    <span className="font-semibold">arti </span>: {hadits?.id}
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
                      ? "bg-gray-400 text-white"
                      : "border border-black"
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
              className="bg-secondary p-1 rounded w-20 text-white"
              onClick={prevPage}
            >
              prev
            </button>
            <button
              className="bg-secondary p-1 rounded w-20 text-white"
              onClick={() =>
                nextPage((data?.data as HadistSlugType)?.pagination?.totalPages)
              }
            >
              next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
