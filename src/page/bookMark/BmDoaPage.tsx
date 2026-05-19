// import MainLayouts from "../../components/layouts/Main";
// import { useGetDoaById } from "../../state/Query";
// import { useParams } from "react-router-dom";
// import LoveIcon from "../../components/element/Icon/LoveIcon";
// import Border from "../../components/element/Border";
// import { useBookMarkDoa, useDarkmode } from "../../state/TypeHooks";
// import { TypeDataDoa } from "../../model/_Type";

// const BmDoaPage = () => {
//   const { id } = useParams();
//   const { data: dataDoa, isLoading: loadingDoa } = useGetDoaById(id);
//   const { bookMark: bmDoa, deleteBookMark }: any = useBookMarkDoa();
//   const { darkMode } = useDarkmode();
//   return (
//     <MainLayouts navbarType="dodz">
//       {loadingDoa ? (
//         <div className="w-full md:w-5/6 flex items-center gap-2 flex-col p-2">
//           <div className="w-full flex flex-col items-center ">
//             <div className="w-full border-b border-b-gray-300 h-auto rounded-md gap-2 p-2 animate-pulse">
//               <div className="w-full flex flex-col gap-2 relative">
//                 <div className="flex justify-start gap-2">
//                   <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                   <div className="w-44 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                 </div>
//                 <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
//                 <div className="w-full h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                 <div className="w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//                 <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div
//             className={`w-full md:w-5/6 p-2 h-svh`}
//             key={(dataDoa as TypeDataDoa)?.id}
//           >
//             <div className="flex items-center gap-2">
//               <Border number={(dataDoa as TypeDataDoa)?.id} color={"black"} />
//               <h1 className="text-xl text-center lg:text-2xl">
//                 {(dataDoa as TypeDataDoa)?.title}
//               </h1>
//             </div>
//             <div className="flex justify-end my-5 md:my-6">
//               <LoveIcon
//                 handleBookMark={() => {
//                   deleteBookMark((dataDoa as TypeDataDoa)?.id);
//                   window.location.href = "/";
//                 }}
//                 fill={
//                   bmDoa.some(
//                     (doa: any) => doa.title === (dataDoa as TypeDataDoa)?.title
//                   )
//                     ? darkMode
//                       ? "white"
//                       : "black"
//                     : darkMode
//                     ? "black"
//                     : "white"
//                 }
//               />
//             </div>
//             <h1
//               dir="rtl"
//               className="font-sans font-normal md:font-thin leading-relaxed lg:leading-normal text-4xl"
//             >
//               {(dataDoa as TypeDataDoa)?.arabic}
//             </h1>
//             <div className="mt-4">
//               <h1 className="text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2">
//                 {(dataDoa as TypeDataDoa)?.latin}
//               </h1>
//               <p className="text-left text-sm font-normal md:text-base lg:mt-2">
//                 <span className="font-semibold ">artinya : </span>
//                 {(dataDoa as TypeDataDoa)?.translation}
//               </p>
//               <p className="text-left text-sm font-normal md:text-base lg:mt-2">
//                 <span className="font-semibold ">fawaid : </span>
//                 {(dataDoa as TypeDataDoa)?.fawaid
//                   ? (dataDoa as TypeDataDoa).fawaid
//                   : ""}
//               </p>
//             </div>
//           </div>
//         </>
//       )}
//     </MainLayouts>
//   );
// };

// export default BmDoaPage;
