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
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center justify-between rounded-full border border-navy-900/10 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur">
          <Link to="/home" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-navy-900 transition-opacity duration-200 hover:opacity-70">
            <img src={logo} alt="MSA HYU ERICA" className="h-7 w-7 rounded-full object-contain" />
            MSA Elections
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-navy-900/55 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={(e) => handleNavClick(e, item)}
                className={`transition-colors duration-200 hover:text-navy-900 ${
                  location.pathname === item.to && !item.hash ? "text-navy-900" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
