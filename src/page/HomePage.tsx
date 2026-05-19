import BookMark from "../components/fragment/BookMark";
import RoutingPage from "../components/fragment/RoutingPage";
import MainLayouts from "../components/layouts/Main";

const HomePage = () => {
  return (
    <MainLayouts>
      <RoutingPage />

      {/* all bookmark here... */}
      <BookMark />
    </MainLayouts>
  );
};

export default HomePage;
