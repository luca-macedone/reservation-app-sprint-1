import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import NavbarComp from "./components/NavbarComp";
import FooterComp from "./components/FooterComp";

function App() {
  return (
    <Router className="relative">
      <header className="bg-primary sticky shadow-lg left-0 top-0 z-30">
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
