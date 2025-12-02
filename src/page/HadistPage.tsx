import {
  useBookMarkHadist,
  useDarkmode,
  usePagination,
} from "../state/TypeHooks";
import { Link, useParams } from "react-router-dom";
import {
  useParawi,
  useGetHadistByMufassir,
  useGetHadistByNumber,
} from "../state/Query";
import {
  HadistSlugType,
  Parawis,
  ParawisMap,
  hadistSlug,
} from "../model/_Type";
import React, { useEffect, useState } from "react";
import LoveIcon from "../components/element/Icon/LoveIcon";
import MainLayouts from "../components/layouts/Main";
import Border from "../components/element/Border";
export const ParawiPage = () => {
  /** get data parawi */
  const { data: dataParawis, isLoading: loadingParawi } = useParawi();
  const skeletonArray: any = Array.from({ length: 9 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayouts>
      <div className="w-full h-screen p-2">
        {loadingParawi ? (
          <div className="w-full flex-wrap justify-evenly flex gap-2 p-2">
            {skeletonArray.map((skleton: number) => (
              <div
                key={skleton}
                className="bg-gray-200 flex justify-between items-center h-20 max-w-sm w-full rounded-md animate-pulse gap-2 p-2"
              >
                <div className="w-3/5 h-8 bg-gray-300 animate-pulse duration-200 transition-all rounded-md"></div>
                <div className="w-1/5 h-4 bg-gray-300 animate-pulse duration-200 transition-all rounded-md"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2 flex flex-wrap justify-evenly">
            {(dataParawis as Parawis)?.data.map(
              (hadist: ParawisMap, index: number) => (
                <Link
                  to={`/hadist/${hadist?.slug}`}
                  key={index}
                  className="w-full max-w-sm border rounded items-center transition-all duration-200 mt-3 p-4 flex justify-between hover:border-2"
                >
                  <h3 className={` text-2xl `}>{hadist?.name}</h3>
                  <p>{hadist?.total} hadist</p>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </MainLayouts>
  );
};

export const HadistBySlugPage=()=>{

}
// export const HadistBySlugPage = () => {
//   const { slug } = useParams();
//   const { nextPage, page, setPage, prevPage }: any = usePagination();
//   const darkMode = useDarkmode((state) => state.darkMode);
//   const { data: dataHadist, isLoading: hadistIsLoading } =
//     useGetHadistByMufassir(slug, page);
//   const skeletonArray: any = Array.from({ length: 10 }, (_, index) => index);
//   const {
//     bookMark: bmHadist,
//     addBookMark,
//     deleteBookMark,
//   }: any = useBookMarkHadist();
//   const [searchHadist, setSearchHadist] = useState<
//     any | React.Dispatch<React.SetStateAction<any>>
//   >("");
//   const { data: dataNumber, isLoading: numberIsloading } = useGetHadistByNumber(
//     slug,
//     searchHadist
//   );
//   const onHandleBookMark = (
//     id: any,
//     name: any,
//     number: any,
//     bookMark = true
//   ) => {
//     const filtered = bmHadist.some((item: any) => item.id === id);
//     if (filtered) {
//       deleteBookMark(id);
//     } else {
//       addBookMark({ id, name, number, bookMark });
//     }
//   };
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <MainLayouts>
//       <div className="flex w-full mt-2 justify-center">
//         <input
//           type="number"
//           onChange={(e: any) => {
//             setSearchHadist(e.target.value);
//           }}
//           value={searchHadist}
//           placeholder="cari hadist"
//           className={`w-52 outline-none border border-gray-300 p-2 pl-3 placeholder:tracking-wider  rounded-md lg:w-1/4  text-slate-900 shadow-md`}
//         />
//       </div>
//       {searchHadist !== "" ? (
//         numberIsloading ? (
//           <div className="w-full md:w-5/6 flex gap-2 flex-col p-2">
//             <div className="w-full flex flex-wrap flex-col gap-2 sm:flex-row sm:justify-center">
//               <div className="w-full flex flex-col gap-2 relative">
//                 <div className="flex justify-start gap-2">
//                   <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                   <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 </div>
//                 <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             {(dataNumber as HadistSlugType)?.name ? (
//               <div className="w-full flex justify-center flex-wrap mt-10">
//                 <div key={(dataNumber as any)?.number} className="p-2 lg:w-5/6">
//                   <div className="justify-between flex">
//                     <h1>{(dataNumber as any)?.number}</h1>
//                     <LoveIcon
//                       handleBookMark={() =>
//                         onHandleBookMark(
//                           `${slug}-${(dataNumber as any)?.number}`,
//                           slug,
//                           (dataNumber as any)?.number
//                         )
//                       }
//                       fill={
//                         bmHadist.some(
//                           (item: any) =>
//                             item.id === `${slug}-${(dataNumber as any)?.number}`
//                         )
//                           ? darkMode
//                             ? "white"
//                             : "black"
//                           : darkMode
//                           ? "black"
//                           : "white"
//                       }
//                     />
//                   </div>
//                   <h1
//                     dir="rtl"
//                     className="font-sans font-normal md:font-thin leading-relaxed md:leading-loose text-4xl"
//                   >
//                     {(dataNumber as any)?.arab}
//                   </h1>
//                   <p className="text-left text-sm font-normal md:text-base lg:mt-2">
//                     <span className="font-semibold ">artinya : </span>
//                     {(dataNumber as any)?.id}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <h1 className="mt-10">
//                 {slug} tidak mempunyai hadist ke {searchHadist}
//               </h1>
//             )}
//           </div>
//         )
//       ) : hadistIsLoading ? (
//         <div className="w-full md:w-5/6 flex gap-2 flex-col p-2">
//           <div className="flex-shrink-0 flex flex-col items-center gap-2">
//             <div className="bg-gray-300 h-8 w-52 rounded-md animate-pulse"></div>
//             <div className="bg-gray-300 h-5 w-48 rounded-md animate-pulse"></div>
//             <div className="w-72 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//           </div>
//           <div className="w-full flex flex-wrap flex-col gap-2 sm:flex-row sm:justify-center">
//             {skeletonArray.map((skleton: any) => (
//               <div
//                 key={skleton}
//                 className="w-full border-b border-b-gray-300 h-auto rounded-md gap-2 p-1 animate-pulse"
//               >
//                 {" "}
//                 <div className="w-full flex flex-col gap-2 relative">
//                   <div className="flex justify-start gap-2">
//                     <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                     <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                   </div>
//                   <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                   <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                   <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                   <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                   <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                   <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="w-full md:w-5/6">
//           <div className="mt-4">
//             <h1 className="text-center text-2xl">
//               HR {(dataHadist as HadistSlugType)?.name}
//             </h1>
//             <h1 className={`text-center`}>
//               halaman ke{" "}
//               {(dataHadist as HadistSlugType)?.pagination?.currentPage}
//             </h1>
//           </div>

//           <div className="w-full flex flex-wrap justify-center gap-1 mt-2">
//             {(dataHadist as HadistSlugType)?.pagination?.pages.map(
//               (pagination: any) => (
//                 <p
//                   onClick={() => setPage(pagination)}
//                   key={pagination}
//                   className={`${
//                     page === pagination && "bg-slate-900 text-white"
//                   }  w-8 h-8 grid place-content-center border border-gray-300 shadow-md cursor-pointer`}
//                 >
//                   {pagination}
//                 </p>
//               )
//             )}
//           </div>

//           <div className="w-full flex justify-center flex-wrap mt-4">
//             {(dataHadist as HadistSlugType)?.items?.map(
//               (hadits: hadistSlug) => (
//                 <div
//                   key={hadits?.number}
//                   className={`w-full p-2 gap-2 border-b md:mt-6 border-b-gray-300`}
//                 >
//                   <div className="justify-between flex">
//                     <Border number={hadits?.number}></Border>
//                     <LoveIcon
//                       handleBookMark={() =>
//                         onHandleBookMark(
//                           `${slug}-${hadits?.number}`,
//                           slug,
//                           hadits?.number
//                         )
//                       }
//                       fill={
//                         bmHadist.some(
//                           (item: any) => item.id === `${slug}-${hadits.number}`
//                         )
//                           ? darkMode
//                             ? "white"
//                             : "black"
//                           : darkMode
//                           ? "black"
//                           : "white"
//                       }
//                     />
//                   </div>
//                   <h1
//                     dir="rtl"
//                     className="font-sans font-normal md:font-thin w-full leading-relaxed md:leading-loose text-4xl md:my-6"
//                   >
//                     {hadits?.arab}
//                   </h1>
//                   <p className="text-left text-sm font-normal md:text-base lg:mt-2">
//                     <span className="font-semibold ">artinya : </span>
//                     {hadits?.id}
//                   </p>
//                 </div>
//               )
//             )}
//           </div>
//           <div className="w-full flex flex-wrap justify-center gap-1 mt-10">
//             {(dataHadist as HadistSlugType)?.pagination?.pages.map(
//               (pagination: any) => (
//                 <p
//                   onClick={() => setPage(pagination)}
//                   key={pagination}
//                   className={`${
//                     page === pagination && "bg-slate-900 text-white"
//                   } w-8 h-8 cursor-pointer grid place-content-center border border-gray-300 shadow-md`}
//                 >
//                   {pagination}
//                 </p>
//               )
//             )}
//           </div>
//           <div className="w-full justify-evenly flex gap-2 my-8">
//             {" "}
//             <button
//               className={`bg-slate-900 text-white p-1 rounded w-20 shadow-md`}
//               onClick={prevPage}
//             >
//               prev
//             </button>
//             <button
//               className={`bg-slate-900 text-white p-1 rounded w-20 shadow-md`}
//               onClick={() =>
//                 nextPage((dataHadist as HadistSlugType)?.pagination?.totalPages)
//               }
//             >
//               next
//             </button>
//           </div>
//         </div>
//       )}
//     </MainLayouts>
//   );
// };
