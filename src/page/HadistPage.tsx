import { useDarkmode } from "../state/Zustand";
import Navbar from "../components/layouts/Navbar";
import Hadist from "../components/layouts/Hadist";
import { useParams } from "react-router-dom";
import { APIgetHadistBySlug } from "../services/api_call";
import { useEffect } from "react";
import { useGetHadistBySlug } from "../state/Query";
import { HadistSlugType, hadistSlug } from "../model/Interface";
export const HadistPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <Navbar type="hadist" />
      <div className="w-full mt-20">
        <Hadist />
      </div>
    </div>
  );
};
export const HadistBySlugPage = () => {
  const { slug } = useParams();
  const data = useGetHadistBySlug(slug);

  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <div className="w-full mt-10">
        <h1 className="text-center text-2xl">
          {(data?.data as HadistSlugType)?.name}
        </h1>
      </div>
      <div className="w-full flex justify-center flex-wrap">
        {(data?.data as HadistSlugType)?.items?.map((hadits:hadistSlug)=> (
          <div key={hadits?.number} className="p-2 lg:w-5/6">
            <h1>{hadits?.number}</h1>
            <h1 className="text-right text-2xl lg:text-4xl lg:tracking-wider lg:leading-10">{hadits?.arab}</h1>
            <h1 className="text-sm  my-4 lg:text-base">{hadits?.id}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
