import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Organizations", path: "/organizations" },
  { name: "Audit Trails", path: "/audit-trails" },
  { name: "Analytics", path: "/analytics" },
  { name: "Flags", path: "/flags" },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-neutral-800 bg-neutral-800 px-8 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-violet-400">
            Catapult
          </h1>

          <div className="flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-violet-400 ${
                    isActive
                      ? "text-violet-400 font-medium"
                      : "text-neutral-300"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="p-8 bg-neutral-950">
        <Outlet />
      </main>
    </div>
  );
}