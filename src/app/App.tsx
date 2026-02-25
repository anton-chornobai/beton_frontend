import "../../stylescss/main.css";
import Header from "../layout/header/Header";
import Main from "../layout/main/Main";
import Footer from "../layout/footer/Footer";
import AuthPopUp from "../shared/AuthPopUp";
import { Outlet, useLocation } from "react-router";

function App() {
  const location = useLocation();
  const authLocation = location.pathname === "auth";

  return (
    <>
      <div className="wrappper">
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
        {authLocation && <AuthPopUp />}
      </div>
    </>
  );
}

export default App;
