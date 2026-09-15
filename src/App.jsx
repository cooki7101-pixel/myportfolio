import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectPassing from "./pages/work/ProjectPassing";
import ProjectKakaoT from "./pages/work/ProjectKakaoT";
import About from "./pages/about/About";
import LoadingScreen from "./components/LoadingScreen";

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
  // Shown once on first load (Figma node 573:8409, "ING") — counts up to
  // 100% then fades out on its own; unmounted here for good so it never
  // reappears on later in-app navigation.
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  return (
    <div className="site-shell">
      {showLoadingScreen && (
        <LoadingScreen onFinish={() => setShowLoadingScreen(false)} />
      )}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works/project-passing" element={<ProjectPassing />} />
        <Route path="/works/kakao-t" element={<ProjectKakaoT />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
