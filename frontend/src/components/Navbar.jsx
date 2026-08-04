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
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-navy-950/95 backdrop-blur text-white">
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

        <Link
          to="/apply"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0"
        >
          Нэр дэвшигчээр бүртгүүлэх
        </Link>
      </div>
    </header>
  );
}