import BookMark from "../components/fragments/BookMark";
import RoutingPage from "../components/fragments/RoutingPage";
import MainLayouts from "../components/layouts/Main";

/**
 * Component/Function  Home Page.
 * Used to render or handle logic for HomePage.
 */
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
