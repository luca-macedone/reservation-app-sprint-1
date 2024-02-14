import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import routes from "./routes";
import NavbarComp from "./components/NavbarComp";
import FooterComp from "./components/FooterComp";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 400,
    });
  }, []);
  return (
    <Router className="relative">
      <HeaderWrapper />
      <Routes>
        {routes.map((r) => {
          if ("children" in r) {
            return (
              <Route
                key={r.path}
                path={r.path}
                element={r.element}
              >
                {r.children.map((cr) => {
                  return (
                    <Route
                      key={cr.path}
                      path={cr.path}
                      element={cr.element}
                    />
                  );
                })}
              </Route>
            );
          }

          return (
            <Route
              key={r.path}
              path={r.path}
              element={r.element}
            />
          );
        })}
      </Routes>
      <FooterWrapper />
    </Router>
  );
}

const HeaderWrapper = () => {
  const location = useLocation();
  const isInDashboardRoutes = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isInDashboardRoutes && (
        <header className="bg-primary sticky shadow-lg left-0 top-[-1px] z-30">
          <NavbarComp />
        </header>
      )}
    </>
  );
};

const FooterWrapper = () => {
  const location = useLocation();
  const isInDashboardRoutes = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isInDashboardRoutes && (
        <footer className="bg-dark">
          <FooterComp />
        </footer>
      )}
    </>
  );
};

export default App;
