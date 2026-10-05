import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SlideBar from "./SlideBar";
import { AnchoredToastProvider, ToastProvider } from "./ui/toast";

export default function Layout() {
  return (
    <ToastProvider>
      <AnchoredToastProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />


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

