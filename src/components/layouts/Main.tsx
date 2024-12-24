import React from "react";
import { useDarkmode } from "../../state/TypeHooks";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollTop from "../fragment/ScrollTop";

interface MainLayoutsProps {
  navbarType: string ;
  children: React.ReactNode;
}

const MainLayouts: React.FC<MainLayoutsProps> = ({ children, navbarType }) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className={`${darkMode && "dark-mode"} relative w-full flex flex-col`}>
      <Navbar type={navbarType} />
      <div className={`mt-20 flex justify-center flex-wrap`}>{children}</div>
      <ScrollTop />
      <Footer />
    </div>
  );
};

export default MainLayouts;
