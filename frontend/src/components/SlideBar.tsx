import { ArrowRight, ArrowRightLeft, CircleChevronRight, CircleUserRound, Flag, Layers, Lightbulb, Mail, Notebook, NotebookPen, Shield, ToggleRight, UserCog, Users, UsersRound } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";

const SlideBar = () => {
  const location = useLocation();
  const username = window.localStorage.getItem("username");

  return (
    <div className="w-75 min-h-screen border border-gray-200">
      <div className="h-170 pr-3 flex flex-col gap-2 mt-8 pl-4">

        <div className="flex flex-col gap-2">

          <Link to="/projects/2">
            <Button
              variant={location.pathname === "/projects/2" ? "secondary" : "ghost"}
              className="w-full justify-start rounded-sm"
            >
              <div className="flex items-center justify-center gap-2"> <ToggleRight /> Flags </div>
            </Button>
          </Link>

          <Link to="/projects/2/segments">
            <Button
              variant={
                location.pathname === "/projects/2/segments"
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start rounded-sm"
            >
              <Layers /> Segments
            </Button>
          </Link>

          <Link to="/projects/2/guardrails">
            <Button
              variant={
                location.pathname === "/projects/2/guardrails"
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start rounded-sm"
            >
              <Shield /> Guardrails
            </Button>
          </Link>

          <Link to="/projects/2/members">
            <Button
              variant={
                location.pathname === "/projects/2/members"
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start rounded-sm"
            >
              <UsersRound /> Collaborate
            </Button>
          </Link>


          <Button variant="ghost" className="w-full justify-start rounded-sm">
            <div className="flex items-center justify-center gap-2"><ArrowRightLeft /> Activity </div>
          </Button>
        </div>

        <div className="mt-auto bg-gray-100">
          <div>
            <Link to="/invitations">
              <Button
                variant={location.pathname === "/invitations" ? "secondary" :
                  "ghost"
                }
                className="w-full justify-start rounded-sm"
              >
                <div className="py-1 flex items-center gap-2"> <Mail /> Invitations </div>
              </Button>
            </Link>
          </div>
          <Separator />
          <div className=" flex items-center text-sm justify-between mt-2  rounded-xs px-2 py-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-gray-700 font-semibold"> <CircleUserRound strokeWidth={1.5} className="size-5 text-indigo-700" /> {username} </div>
            <div className="text-white rounded-full px-2 bg-indigo-700 text-xs py-1 flex gap-1 items-center pl-3 cursor-pointer"> Logout <ArrowRight strokeWidth={1.5} className="size-3"  /> </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SlideBar;