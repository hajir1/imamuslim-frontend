const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={handleScrollTop}
      className={`bottom-20 fixed right-5 grid place-content-center rounded-full bg-gray-500 h-10 w-10 z-50`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.4em"
        height="1.4em"
        viewBox="0 0 24 24"
      >
        <path
          fill="white"
          fillRule="evenodd"
          d="M12 20.75a.75.75 0 0 0 .75-.75v-9.25h-1.5V20c0 .414.336.75.75.75"
          clipRule="evenodd"
          opacity="0.5"
        />
        <path
          fill="white"
          d="M6 10.75a.75.75 0 0 1-.53-1.28l6-6a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1-.53 1.28z"
        />
      </svg>
    </div>
  );
};

export default ScrollTop;
