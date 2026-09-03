import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Нүүр", to: "/home" },
  { label: "Нэр дэвшигчид", to: "/home", hash: "candidates" },
  { label: "Үр дүн", to: "/results" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const scrolledDown = currentY > lastScrollY.current;
      setHidden(scrolledDown && currentY > 80);
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(e, item) {
    if (!item.hash) return; // regular route, let Link handle it normally
    e.preventDefault();

    if (location.pathname === "/home") {
      // already on home — just scroll
      document.getElementById(item.hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // navigate home first, then scroll once it's rendered
      navigate("/home");
      setTimeout(() => {
        document.getElementById(item.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b border-navy-900/10 bg-navy-950/95 backdrop-blur text-white transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/home" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight transition-opacity duration-200 hover:opacity-80">
          <img src={logo} alt="MSA HYU ERICA" className="h-9 w-9 rounded-full object-contain" />
          MSA Elections
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNavClick(e, item)}
              className={`transition hover:text-white ${
                location.pathname === item.to && !item.hash ? "text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}