import "../../stylescss/main.css";
import Header from "../layout/header/Header";
import Main from "../layout/main/Main";
import Footer from "../layout/footer/Footer";
import { Outlet, useLocation } from "react-router";
import "../styles/main.scss"

function App() {
  const location = useLocation();
  const authLocation = location.pathname === "auth"; 

  return (
    <>
      <div className="wrapper">
        <Header />
        <Main >
          <Outlet />
        </Main>
        <Footer />
      </div>
    </>
  );
}

export default App;
