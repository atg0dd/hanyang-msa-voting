import logo from "../assets/logo.png";
import { Instagram } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-navy-900/10 bg-navy-950 text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-display font-semibold text-white">
          <img src={logo} alt="MSA HYU ERICA" className="h-7 w-7 rounded-full object-contain" />
          MSA Election
          <span className="ml-2 font-normal text-white/40">© 2026 MSA Hanyang ERICA. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/msa_erica/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MSA ERICA Instagram"
            className="text-white/60 transition hover:text-white"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
