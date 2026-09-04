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
      className={`sticky top-4 z-40 transition-transform duration-300 ${
        hidden ? "-translate-y-24" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4">
        <Link to="/home" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-navy-900 transition-opacity duration-200 hover:opacity-70">
          <img src={logo} alt="MSA HYU ERICA" className="h-8 w-8 shrink-0 rounded-full object-contain" />
          <span className="hidden sm:inline">MSA Elections</span>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-navy-900/10 bg-white/90 px-1.5 py-1.5 text-xs font-medium text-navy-900/55 shadow-sm backdrop-blur sm:gap-1.5 sm:px-2 sm:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNavClick(e, item)}
              className={`whitespace-nowrap rounded-full px-2.5 py-1.5 transition-colors duration-200 hover:text-navy-900 sm:px-3.5 ${
                location.pathname === item.to && !item.hash ? "bg-navy-900/5 text-navy-900" : ""
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
