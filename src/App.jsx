import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectPassing from "./pages/projects/ProjectPassing";
import About from "./pages/about/About";

export default function App() {
  return (
    <div className="site-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works/project-passing" element={<ProjectPassing />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
