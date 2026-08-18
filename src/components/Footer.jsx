import { Heart, Mail, Share2 } from "lucide-react";

/**
 * Site footer.
 * Props:
 *  - columns: [{ title, links: [{ label, href }] }]
 */
export default function Footer({
  columns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ],
}) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 text-lg font-semibold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500 text-sm font-bold">
                A
              </span>
              AppName
            </a>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              Building tools that help teams move faster, together.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" aria-label="GitHub" className="text-slate-400 hover:text-white">
                <Heart size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-white">
                <Mail size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-white">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} AppName. All rights reserved.
        </div>
      </div>
    </footer>
  );
}