import Canvas from "../components/element/Canvas";
import RoutingPage from "../components/fragment/RoutingPage";

const HomePage = () => {
  return (
    <div className="bg-primary backdrop:blur-sm overflow-y-hidden h-screen">
      <div className=" w-full absolute -translate-y-1/2 flex justify-center  top-1/2">
        <RoutingPage />
      </div>
      {/* <Canvas /> */}
    </div>
  );
};

export default HomePage;
