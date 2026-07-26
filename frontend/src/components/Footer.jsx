export default function Footer() {
  return (
    <footer className="border-t border-navy-900/10 bg-navy-950 text-black/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-display font-semibold text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-xs">🗳️</span>
          MSA Elections
          <span className="ml-2 font-normal text-white/40">© 2024 MSA Hanyang ERICA. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-black">Election Rules</a>
          <a href="#" className="hover:text-black">Privacy Policy</a>
          <a href="#" className="hover:text-black">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
