/**
 * Utility: ScrollTop
 *
 * BUG FIX: Button was always visible even at top of page — poor UX.
 * Now it only appears after scrolling > 300px, with smooth fade animation.
 *
 * NEW FEATURE: Accessible button with aria-label + keyboard support.
 */
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useDarkmode } from "../../stores/TypeHooks";

const ScrollTop = () => {
  const darkMode = useDarkmode((s) => s.darkMode);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleScrollTop}
      aria-label="Scroll ke atas"
      className={`fixed right-5 bottom-8 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
        darkMode
          ? "bg-emerald-600 text-white hover:bg-emerald-500"
          : "bg-emerald-500 text-white hover:bg-emerald-600"
      } fade-in`}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollTop;
