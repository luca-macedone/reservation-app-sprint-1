import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <header className="bg-primary sticky shadow-lg left-0 top-[-1px] z-30">
        <NavbarComp />
      </header>
      <Routes>
        {routes.map((r) => {
          return (
            <Route
              key={r.path}
              path={r.path}
              element={r.element}
            />
          );
        })}
      </Routes>
      <footer className="bg-dark">
        <FooterComp />
      </footer>
    </Router>
  );
}

export default App;
