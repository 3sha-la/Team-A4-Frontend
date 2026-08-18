import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";

/**
 * Top navigation bar.
 * Props:
 *  - links: [{ label, href }]
 *  - isAuthenticated: bool -> toggles login/profile area
 *  - onLoginClick, onLogoutClick: handlers
 */
export default function Navbar({
  links = [
    { label: "Home", href: "#" },
    { label: "Dashboard", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  isAuthenticated = false,
  onLoginClick = () => {},
  onLogoutClick = () => {},
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500 text-sm font-bold">
            A
          </span>
          <span>AppName</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth area */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {isAuthenticated ? (
            <>
              <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white">
                <User size={16} />
                Profile
              </button>
              <button
                onClick={onLogoutClick}
                className="flex items-center gap-2 rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                <LogOut size={16} />
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                Log in
              </button>
              <button className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400">
                Sign up
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3">
            {isAuthenticated ? (
              <button
                onClick={onLogoutClick}
                className="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Log out
              </button>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Log in
                </button>
                <button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}