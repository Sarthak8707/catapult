import { NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Organizations", path: "/organizations" },
  { name: "Projects", path: "/projects" },
  { name: "Audit Trails", path: "/audit-trails" },
  { name: "Analytics", path: "/analytics" },
  { name: "Flags", path: "/flags" },
  
];

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="flex h-14 items-center px-6">
        <div className="mr-8 font-semibold">
          Catapult
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path} className="">
                <NavigationMenuLink asChild>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `${navigationMenuTriggerStyle()} ${
                        isActive ? "bg-accent" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}