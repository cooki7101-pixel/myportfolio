import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectPassing from "./pages/work/ProjectPassing";
import ProjectKakaoT from "./pages/work/ProjectKakaoT";
import ProjectHyundai from "./pages/work/ProjectHyundai";
import About from "./pages/about/About";
import LoadingScreen from "./components/LoadingScreen";
import CursorFollower from "./components/CursorFollower";

// Without this, navigating to a new page keeps whatever scroll position the
// previous page was left at (e.g. clicking the 패싱 카드 from the middle of
// Home's project row would land partway down ProjectPassing instead of at
// its Hero). A route with a hash (like "/#work") is left alone so Home's
// own scrollIntoView effect can handle jumping to that section.
//
// The app uses HashRouter, so a hard refresh doesn't reliably get the
// browser's own native scroll restoration (the URL's own "#/..." fragment
// makes browsers treat it inconsistently). So instead of leaning on that,
// this saves the scroll position for the CURRENT route to sessionStorage
// as the user scrolls, and restores it itself on the very first mount
// (app boot / refresh) — a real in-app navigation to a different page
// still resets to the top as before.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  // null = "haven't handled any route yet". Comparing against the actual
  // pathname (rather than flipping a one-shot boolean) keeps this correct
  // even though React 18 StrictMode calls this effect twice on mount in
  // dev — the second call sees the same pathname it just handled and is a
  // no-op, instead of misreading itself as "no longer the first run" and
  // forcing a scroll back to the top.
  const lastPathname = useRef(null);

  // Keep sessionStorage up to date with where the user actually is on this
  // route, so a refresh has something to restore.
  useEffect(() => {
    const key = `scrollY:${pathname}`;
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        sessionStorage.setItem(key, String(window.scrollY));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  useEffect(() => {
    if (hash) return;
    if (lastPathname.current === pathname) return;
    const isInitialLoad = lastPathname.current === null;
    lastPathname.current = pathname;

    if (isInitialLoad) {
      const saved = sessionStorage.getItem(`scrollY:${pathname}`);
      if (saved === null) return;
      const target = parseInt(saved, 10);
      // Re-applied a couple of times over ~1.5s to ride out late layout
      // shifts (web fonts / the loading screen unmounting) that would
      // otherwise nudge the restored position back up. Each retry checks
      // it's still the same route before acting, in case a real
      // navigation happens in the meantime.
      window.scrollTo(0, target);
      const timeouts = [100, 400, 1200].map((delay) =>
        setTimeout(() => {
          if (lastPathname.current === pathname) window.scrollTo(0, target);
        }, delay)
      );
      return () => timeouts.forEach(clearTimeout);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function PageTransitionRoutes({ loadingFinished }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [outgoingLocation, setOutgoingLocation] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const outgoingRef = useRef(null);
  const incomingRef = useRef(null);

  useLayoutEffect(() => {
    const isSameRoute =
      location.pathname === displayLocation.pathname &&
      location.search === displayLocation.search &&
      location.hash === displayLocation.hash;
    if (isSameRoute) return;
    setOutgoingLocation(displayLocation);
    setDisplayLocation(location);
    setIsTransitioning(true);
  }, [location.pathname, location.search, location.hash, displayLocation]);

  useLayoutEffect(() => {
    if (!isTransitioning || !outgoingRef.current || !incomingRef.current) return undefined;

    const timeline = gsap.timeline({
      onComplete: () => {
        setOutgoingLocation(null);
        setIsTransitioning(false);
      },
    });

    timeline
      .to(outgoingRef.current, {
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.6,
        ease: 'power2.inOut',
      })
      .fromTo(incomingRef.current,
        { opacity: 0, filter: 'blur(8px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.85, ease: 'power2.out' },
        0.15,
      );

    return () => timeline.kill();
  }, [isTransitioning]);

  const renderRoutes = (routeLocation) => (
    <Routes location={routeLocation}>
      <Route path="/" element={<Home loadingFinished={loadingFinished} />} />
      <Route path="/works/project-passing" element={<ProjectPassing />} />
      <Route path="/works/kakao-t" element={<ProjectKakaoT />} />
      <Route path="/works/hyundai" element={<ProjectHyundai />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {outgoingLocation && (
        <div ref={outgoingRef} style={{ position: 'absolute', inset: 0, zIndex: 2, width: '100%' }}>
          {renderRoutes(outgoingLocation)}
        </div>
      )}
      <div ref={incomingRef} style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {renderRoutes(displayLocation)}
      </div>
    </div>
  );
}

export default function App() {
  // Shown once on first load (Figma node 573:8409, "ING") — counts up to
  // 100% then fades out on its own; unmounted here for good so it never
  // reappears on later in-app navigation.
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(false);

  const handleLoadingFinish = () => {
    setShowLoadingScreen(false);
    setLoadingFinished(true);
  };

  useEffect(() => {
    const previousOverflowY = document.body.style.overflowY;
    document.body.style.overflowY = showLoadingScreen ? "hidden" : "auto";

    return () => {
      document.body.style.overflowY = previousOverflowY;
    };
  }, [showLoadingScreen]);

  return (
    <div className="site-shell">
      <CursorFollower />
      {showLoadingScreen && (
        <LoadingScreen onFinish={handleLoadingFinish} />
      )}
      <ScrollManager />
      <PageTransitionRoutes loadingFinished={loadingFinished} />
    </div>
  );
}
