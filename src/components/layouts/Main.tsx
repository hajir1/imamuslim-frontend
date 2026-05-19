import React from "react";
import { useDarkmode } from "../../stores/TypeHooks";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollTop from "../fragments/ScrollTop";

interface MainLayoutsProps {
  children: React.ReactNode;
}

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
      <Footer />
    </div>
  );
};

export default MainLayouts;
