import React from "react";
import { useDarkmode } from "../../state/TypeHooks";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollTop from "../fragment/ScrollTop";

interface MainLayoutsProps {
  children: React.ReactNode;
}

const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className={`${darkMode && "dark-mode"} relative w-full flex flex-col`}>
      <Navbar />
      <div className={`mt-16 md:mt-20 p-2 flex justify-center flex-wrap `}>{children}</div>
      <ScrollTop />
      <div className="pb-20"></div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
