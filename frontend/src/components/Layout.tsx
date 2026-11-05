import { Outlet } from "react-router-dom";
import SlideBar from "./SlideBar";
import { AnchoredToastProvider, ToastProvider } from "./ui/toast";
import Breadcrumbs from "./Breadcrumbs";

export default function Layout() {
  return (
    <ToastProvider>
      <AnchoredToastProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Breadcrumbs />


          <div className="flex">
            <SlideBar />
            <main className="container mx-auto">
              <Outlet />
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

