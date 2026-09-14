import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectPassing from "./pages/work/ProjectPassing";
import About from "./pages/about/About";

// Without this, navigating to a new page keeps whatever scroll position the
// previous page was left at (e.g. clicking the 패싱 card from the middle of
// Home's project row would land partway down ProjectPassing instead of at
// its Hero). A route with a hash (like "/#work") is left alone so Home's
// own scrollIntoView effect can handle jumping to that section.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works/project-passing" element={<ProjectPassing />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
