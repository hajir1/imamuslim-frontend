import React from "react";
<<<<<<< HEAD
import { useDarkmode } from "../../stores/TypeHooks";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollTop from "../fragments/ScrollTop";
=======
import { useDarkmode } from "../../state/TypeHooks";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollTop from "../fragment/ScrollTop";
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1

interface MainLayoutsProps {
  children: React.ReactNode;
}

<<<<<<< HEAD
/**
 * Component: MainLayouts
 * Root layout wrapper — applies dark mode class, navbar, footer, scroll-to-top.
 */
const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${darkMode ? "dark-mode" : ""} relative flex min-h-screen w-full flex-col`}
    >
      <Navbar />
      {/* Top padding accounts for fixed navbar height */}
      <main className="flex flex-1 flex-col items-center pt-20 pb-8">
        {children}
      </main>
      <ScrollTop />
=======
const MainLayouts: React.FC<MainLayoutsProps> = ({ children }) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className={`${darkMode && "dark-mode"} relative w-full flex flex-col`}>
      <Navbar />
      <div className={`mt-20 p-2 flex justify-center flex-wrap `}>{children}</div>
      <ScrollTop />
      <div className="pb-20"></div>
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
      <Footer />
    </div>
  );
};

export default MainLayouts;
