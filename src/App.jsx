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

// 이게 없으면 새 페이지로 이동해도 이전 페이지에 있던 스크롤 위치가
// 그대로 유지됨(예: Home의 프로젝트 목록 중간에서 패싱 카드를 클릭하면
// ProjectPassing의 Hero가 아니라 중간 어딘가에서 시작하게 됨). 해시가
// 있는 경로(예: "/#work")는 건드리지 않아서 Home 자체의 scrollIntoView
// 효과가 그 섹션으로 이동하는 걸 처리하도록 둠.
//
// 예전엔 새로고침했을 때 새로고침 직전 스크롤 위치를 sessionStorage에서
// 복원해줬는데, 그러다보니 WORK 리스트쯤에서 새로고침하면 계속 거기서
// 시작해버려서 "새로고침하면 항상 hero부터 시작해야 한다"는 기대와
// 어긋났습니다 — 그래서 복원 로직은 완전히 빼고, 해시가 없는 한 항상
// 맨 위(hero)에서 시작하게 합니다.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  // null = "아직 어떤 경로도 처리한 적 없음". 불리언 플래그를 한 번
  // 뒤집는 방식이 아니라 실제 pathname과 비교하는 방식이라, React 18
  // StrictMode가 dev에서 이 effect를 마운트 시 두 번 호출해도 문제없음 —
  // 두 번째 호출은 방금 처리한 것과 같은 pathname을 보게 되므로 아무 것도
  // 하지 않고 넘어가며, "이제 첫 실행이 아니구나"로 잘못 판단해서 맨 위로
  // 강제 스크롤하는 일이 없음.
  const lastPathname = useRef(null);

  useEffect(() => {
    if (hash) return;
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  // GA4는 첫 로드 때의 page_view는 자동으로 보내주지만, 이 사이트처럼
  // react-router로 화면을 바꾸는(SPA) 경우 그 이후 이동은 GA4가 감지하지
  // 못해서 각 프로젝트/About 페이지별 체류시간이 따로 안 잡힙니다 — 경로가
  // 바뀔 때마다 직접 page_view를 한 번 더 보내줍니다.
  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + hash,
    });
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
        // filter가 인라인 스타일로 남아있으면(예: blur(0px)) 그 div가
        // position: fixed 자식(Header)의 containing block이 되어버려서
        // 헤더가 스크롤 시 화면에 고정되지 않는 버그가 생김 — 애니메이션이
        // 끝나면 filter를 완전히 제거해줘야 함.
        gsap.set(incomingRef.current, { clearProps: 'filter' });
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
  // 최초 로드 시 한 번 표시됨(Figma node 573:8409, "ING") — 100%까지
  // 카운트한 뒤 스스로 페이드아웃됨. 이후 인앱 내비게이션에서 다시
  // 나타나지 않도록 여기서 완전히 언마운트함.
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(false);

  const handleLoadingFinish = () => {
    setShowLoadingScreen(false);
    setLoadingFinished(true);
  };

  useEffect(() => {
    const previousOverflowY = document.body.style.overflowY;
    if (showLoadingScreen) {
      document.body.style.overflowY = "hidden";
    } else {
      // "auto"로 명시적으로 지정해두면, 실제로는 <html>이 스크롤 중인데도
      // 브라우저가 <body>를 스크롤 컨테이너로 취급하게 됩니다(overflow-y가
      // visible이 아닌 값이 되면 overflow-x도 자동으로 auto로 강제되는
      // 스펙 규칙 때문). 그러면 body 안의 모든 position:sticky 요소가
      // (WORK 리스트 등) body 기준으로 스크롤 위치를 계산하려다가, body
      // 자체는 실제로 스크롤되지 않아서 전혀 고정되지 않는 버그가
      // 생깁니다 — "auto"로 다시 지정하지 말고 아예 인라인 스타일을
      // 제거해서 원래 CSS(visible)로 되돌립니다.
      document.body.style.removeProperty("overflow-y");
    }

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
