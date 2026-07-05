import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SlideBar from "./SlideBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />


      <div className="flex">
      <SlideBar />
      <main className="container mx-auto">
        <Outlet />
      </main>
      </div>


    </div>
  );
}