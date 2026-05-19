const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center flex-wrap">
      <h1 className="text-2xl text-center font-semibold ">
        Ups....Page Tidak Diketahui
      </h1>{" "}
      <img className="max-w-lg w-full h-64" src="/notfound.png" alt="" />
    </div>
  );
};

export default NotFoundPage;
