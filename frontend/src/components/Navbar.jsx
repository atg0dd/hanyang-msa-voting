import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/home" },
  { label: "Candidates", to: "/home", hash: "candidates" },
  { label: "Results", to: "/results" },
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
        <Link to="/home" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500 text-sm">🗳️</span>
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
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-white/90"
        >
          Apply as Candidate
        </Link>
      </div>
    </header>
  );
}