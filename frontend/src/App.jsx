import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import HomeLandingPage from "./pages/HomeLandingPage";
import CandidatesPage from "./pages/CandidatesPage";
import ManifestoPage from "./pages/ManifestoPage";
import VotePage from "./pages/VotePage";
import ApplicationPage from "./pages/ApplicationPage";
import ManagePage from "./pages/ManagePage";
import ResultsPage from "./pages/ResultsPage";
import "./styles/transitions.css";

function Layout({ children, bare }) {
  if (bare) return <div className="min-h-screen bg-[#F7F8FC]">{children}</div>;
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FC]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState("in");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setStage("out");
    }
  }, [location, displayLocation.pathname]);

  function handleAnimationEnd() {
    if (stage === "out") {
      window.scrollTo(0, 0);
      setDisplayLocation(location);
      setStage("in");
    }
  }

  return (
    <div
      className={stage === "out" ? "page-transition-out" : "page-transition-in"}
      onAnimationEnd={handleAnimationEnd}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Layout bare><HomePage /></Layout>} />
        <Route path="/home" element={<Layout><HomeLandingPage /></Layout>} />
        <Route path="/candidates" element={<Layout><CandidatesPage /></Layout>} />
        <Route path="/team/:teamId" element={<Layout><ManifestoPage /></Layout>} />
        <Route path="/vote/:teamId" element={<Layout bare><VotePage /></Layout>} />
        <Route path="/apply" element={<Layout bare><ApplicationPage /></Layout>} />
        <Route path="/manage" element={<Layout bare><ManagePage /></Layout>} />
        <Route path="/results" element={<Layout bare><ResultsPage /></Layout>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
