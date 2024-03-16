import Navbar from "../components/layouts/Navbar";

const DokumentasiPage = () => {
  return (
    <div className="w-full">
      <Navbar type="dokumentasi"/>
      <div className="p-4 flex items-center justify-center w-full">
        <p className="mx-5 text-2xl">Hallo Pengunjung </p>
        🖐
      </div>
      <div className="p-4">
        <div><span className="font-semibold">Pendahuluan :</span> </div>
      </div>
    </div>
  );
};

export default DokumentasiPage;
