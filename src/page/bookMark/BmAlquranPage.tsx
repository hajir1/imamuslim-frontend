// import { useEffect, useRef, useState } from "react";
// import { useGetBookmarkAlquran } from "../../state/Query";
// import { TypeBookmarkQuran } from "../../model/_Type";
// import { useBookMarkAlQuran, useDarkmode } from "../../state/TypeHooks";
// import AudioMatiIcon from "../../components/element/Icon/AudioMatiIcon";
// import AudioHidupicon from "../../components/element/Icon/AudioHidupicon";
// import Terjemahicon from "../../components/element/Icon/Terjemahicon";
// import CopyIcon from "../../components/element/Icon/CopyIcon";
// import Viewicon from "../../components/element/Icon/Viewicon";
// import Icon from "../../helper/Icon";
// import MainLayouts from "../../components/layouts/Main";
// import LoveIcon from "../../components/element/Icon/LoveIcon";

// const BmAlquranPage = () => {
//   const { data: dataQuran, isLoading: loadingQuran } = useGetBookmarkAlquran();
//   const [audio, setAudio] = useState<any>(null);
//   const darkMode = useDarkmode((state) => state.darkMode);
//   const audioRefPlay = useRef<HTMLAudioElement>(null);
//   const [currentAudio, setCurrentAudio] = useState<any | null>(null);
//   const { bookMark: bmAlQuran, deleteBookMark }: any = useBookMarkAlQuran();
//   const [longTerjemah, setLongTerjemah] = useState<
//     boolean | React.Dispatch<React.SetStateAction<boolean>>
//   >(false);
//   const [terjemah, setTerjemah] = useState<
//     boolean | React.Dispatch<React.SetStateAction<boolean>>
//   >(false);

//   useEffect(() => {
//     if (audioRefPlay.current && currentAudio) {
//       audioRefPlay.current.src = currentAudio;
//       audioRefPlay.current.play();
//     }
//   }, [currentAudio]);
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const handleTerjemah = () => {
//     setTerjemah(!terjemah);

//     if (window.innerWidth < 700) {
//       window.scrollTo({
//         top: window.innerHeight - 250,
//         behavior: "smooth",
//       });
//     } else {
//       window.scrollTo({
//         top: window.innerHeight - 300,
//         behavior: "smooth",
//       });
//     }
//     setLongTerjemah(false);
//   };
//   const handleCopy = (
//     e: React.MouseEvent<SVGSVGElement>,
//     arab: any,
//     en: any,
//     arti: any
//   ) => {
//     e.preventDefault();
//     const copyText = `${arab}\n ${en} \n artinya : ${arti}`;
//     const textArea = document.createElement("textarea");
//     textArea.value = copyText;
//     textArea.style.position = "fixed";
//     textArea.style.opacity = "0";

//     document.body.appendChild(textArea);

//     textArea.select();

//     document.execCommand("copy");

//     document.body.removeChild(textArea);
//     alert("Sukses menyalin teks ke clipboard");
//   };
//   const handleAudio = (
//     e: React.MouseEvent<SVGSVGElement>,
//     audio: HTMLAudioElement
//   ) => {
//     e.preventDefault();
//     setAudio(audio);
//     setCurrentAudio(audio);
//   };

//   return (
//     <MainLayouts navbarType="quran">
//       {loadingQuran ? (
//         <div className="w-full md:w-5/6 flex gap-2 flex-col p-2">
//           <div className="w-full flex gap-2 justify-center">
//             <div className="bg-gray-300 h-5 w-72  rounded-md animate-pulse"></div>
//           </div>
//           <div className="w-full flex flex-col items-center gap-2 p-2">
//             <div className="w-full h-auto border-b-gray-300 rounded-md animate-pulse">
//               <div className="w-full flex flex-col gap-2 relative p-4 md:mt-4 lg:mt-10 lg:p-3 ">
//                 <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-300"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-300 ml-auto"></div>
//                 <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-300 ml-auto"></div>
//                 <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-300"></div>
//                 <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-3002"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="w-full min-h-svh md:w-5/6 p-2">
//             <div className="flex gap-4 justify-center my-4  ">
//               {audio !== null &&
//               audio ===
//                 (dataQuran as TypeBookmarkQuran)?.data?.audio?.primary ? (
//                 <AudioMatiIcon
//                   handler={() => setAudio(null)}
//                   fill={`${darkMode ? "white" : "black"}`}
//                 />
//               ) : (
//                 <AudioHidupicon
//                   fill={`${darkMode ? "white" : "black"}`}
//                   handler={(e: React.MouseEvent<SVGSVGElement>) =>
//                     handleAudio(
//                       e,
//                       (dataQuran as TypeBookmarkQuran)?.data?.audio?.primary
//                     )
//                   }
//                 />
//               )}
//               <Terjemahicon
//                 handler={() => handleTerjemah()}
//                 fill={`${darkMode ? "white" : "black"}`}
//               />
//               <LoveIcon
//                 fill={
//                   bmAlQuran.some(
//                     (item: any) =>
//                       item.id ===
//                       (dataQuran as TypeBookmarkQuran)?.data?.number?.inQuran
//                   )
//                     ? darkMode
//                       ? "white"
//                       : "black"
//                     : darkMode
//                     ? "black"
//                     : "white"
//                 }
//                 handleBookMark={() => {
//                   deleteBookMark(
//                     (dataQuran as TypeBookmarkQuran)?.data?.number?.inQuran
//                   );
//                   window.location.href = "/";
//                 }}
//               />
//               <CopyIcon
//                 fill={`${darkMode ? "white" : "black"}`}
//                 handler={(e: React.MouseEvent<SVGSVGElement>) =>
//                   handleCopy(
//                     e,
//                     (dataQuran as TypeBookmarkQuran)?.data?.text?.arab,
//                     (dataQuran as TypeBookmarkQuran)?.data?.text
//                       ?.transliteration?.en,
//                     (dataQuran as TypeBookmarkQuran)?.data?.translation?.id
//                   )
//                 }
//               />
//             </div>
//             <div className="md:my-5">
//               <h1
//                 dir="rtl"
//                 className={`font-sans font-normal md:font-thin leading-relaxed lg:leading-normal text-4xl`}
//               >
//                 {(dataQuran as TypeBookmarkQuran)?.data?.text?.arab}
//               </h1>
//             </div>
//             <div className="lg:mt-10">
//               <h1
//                 className={`text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2`}
//               >
//                 {
//                   (dataQuran as TypeBookmarkQuran)?.data?.text?.transliteration
//                     ?.en
//                 }
//               </h1>
//               <p className="text-left text-sm font-normal md:text-base lg:mt-2">
//                 <span className="font-semibold ">artinya : </span>
//                 {(dataQuran as TypeBookmarkQuran)?.data?.translation?.id}
//               </p>
//             </div>
//             {terjemah && (
//               <div className="relative w-full">
//                 <div className="flex justify-center w-full">
//                   {terjemah ? (
//                     <div className="flex justify-center">
//                       <Viewicon
//                         handler={() => setTerjemah(!terjemah)}
//                         fill={`${darkMode ? "white" : "black"}`}
//                       />
//                     </div>
//                   ) : (
//                     <Icon width="1em" height="1em" viewBox="0 0 24 24">
//                       <path
//                         fill=""
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.5}
//                         d="m19 15l-7-6l-7 6"
//                       ></path>{" "}
//                     </Icon>
//                   )}
//                 </div>
//                 <p className="text-center text-sm md:text-base ">
//                   {(dataQuran as TypeBookmarkQuran)?.data?.tafsir?.id?.short}
//                 </p>
//                 <div
//                   onClick={() => setLongTerjemah(!longTerjemah)}
//                   className="flex items-center w-full justify-center my-4 "
//                 >
//                   <Viewicon
//                     fill={`${darkMode ? "white" : "black"}`}
//                     classIcon={`${longTerjemah && "animate-bounce"}`}
//                   />
//                   <p
//                     className={`${
//                       darkMode ? "text-white" : "text-black"
//                     } inline-block cursor-pointer  `}
//                   >
//                     view More
//                   </p>
//                 </div>
//                 {longTerjemah ? (
//                   <p className="text-center text-sm md:text-base">
//                     {(dataQuran as TypeBookmarkQuran)?.data?.tafsir?.id?.long}
//                   </p>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             )}
//           </div>
//           {audio !== null && (
//             <audio
//               className="w-full fixed bottom-0 left-1/2 -translate-x-1/2"
//               controls
//               autoPlay
//               onEnded={() => setAudio(null)}
//               src={`${audio}`}
//               ref={audioRefPlay}
//             ></audio>
//           )}
//         </>
//       )}
//     </MainLayouts>
//   );
// };

// export default BmAlquranPage;
