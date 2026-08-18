import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * Collapsible side navigation.
 * Props:
 *  - items: [{ label, icon (lucide component), href }]
 *  - activeLabel: currently active item label
 */
export default function Sidebar({
  items = [
    { label: "Dashboard", icon: LayoutDashboard, href: "#" },
    { label: "Users", icon: Users, href: "#" },
    { label: "Documents", icon: FileText, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ],
  activeLabel = "Dashboard",
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen flex-col border-r border-slate-800 bg-slate-900 transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
        {!collapsed && (
          <span className="flex items-center gap-2 text-base font-semibold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500 text-xs font-bold">
              A
            </span>
            AppName
          </span>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map(({ label, icon: Icon, href }) => {
          const isActive = label === activeLabel;
          return (
            <a
              key={label}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Footer / user */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
            U
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">User Name</p>
              <p className="truncate text-xs text-slate-400">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}