import { Outlet } from "react-router-dom";
import SlideBar from "./SlideBar";
import { AnchoredToastProvider, ToastProvider } from "./ui/toast";
import Breadcrumbs from "./Breadcrumbs";

export default function Layout() {
  return (
    <ToastProvider>
      <AnchoredToastProvider>
        <div className="h-screen overflow-hidden bg-background text-foreground flex flex-col">
          {/* Fixed at the top */}
          <Breadcrumbs />

          {/* Takes remaining screen height */}
          <div className="flex flex-1 min-h-0">
            {/* Fixed sidebar */}
            <SlideBar />

            {/* Only this area scrolls */}
            <main className="flex-1 min-w-0 overflow-y-auto">
              <div className="container mx-auto">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </AnchoredToastProvider>
    </ToastProvider>
  );
}

export const FullLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Outlet />
    </div>
  )
}

