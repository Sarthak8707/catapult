
import { ArrowRight, ArrowRightLeft, CircleChevronRight, CircleUserRound, Flag, Layers, Lightbulb, Mail, Notebook, NotebookPen, PanelsTopLeft, Shield, ToggleRight, Unplug, UserCog, Users, UsersRound } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation, useParams } from "react-router-dom";
import { Separator } from "./ui/separator";

const SlideBar = () => {
  const location = useLocation();
  const username = window.localStorage.getItem("username");
  const { projectID } = useParams();

  return (
    <div className="w-60 min-h-screen border border-neutral-800 bg-neutral-900 text-gray-300">
      <div className="h-170 pr-3 flex flex-col gap-2 mt-8 pl-4">

        <div className="flex flex-col gap-2">

          <Link to={`projects/`}>
            <Button
              variant={(location.pathname === `/projects/` ? "secondary" : "ghost")}
              className="w-full justify-start rounded-sm"
            >
              <div className="flex items-center justify-center gap-2"> <PanelsTopLeft /> Projects </div>
            </Button>
          </Link>

          <Link to={`projects/${projectID}`}>
            <Button
              variant={(location.pathname === `/projects/${projectID}` || location.pathname.startsWith(`/projects/${projectID}/flags`)) ? "secondary" : "ghost"}
              className="w-full justify-start rounded-sm"
            >
              <div className="flex items-center justify-center gap-2"> <ToggleRight /> Flags </div>
            </Button>
          </Link>

          <Link to={`projects/${projectID}/segments`}>
            <Button
              variant={
                location.pathname.startsWith(`/projects/${projectID}/segments`)
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start rounded-sm"
            >
              <Layers /> Segments
            </Button>
          </Link>

          <Link to={`/projects/${projectID}/guardrails`}>
            <Button
              variant={
                location.pathname === `/projects/${projectID}/guardrails`
                  ? "secondary"
                  : "ghost"
              }
              className="w-full justify-start rounded-sm"
            >
              <Shield /> Guardrails
            </Button>
          </Link>

          <Link to={`projects/${projectID}/members`}>
            <Button
              variant={
                location.pathname === `/projects/${projectID}/members`
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


        <div className="mt-auto ">
          {/* <Separator className="bg-neutral-800" /> */}

          <div className="flex flex-col gap-1 mb-1 mt-1.5">

            <div className="rounded-xs border border-neutral-800">

              <Link to="/connect">

                <Button
                  variant={location.pathname === "/invitations" ? "secondary" :
                    "ghost"
                  }
                  className="w-full justify-start rounded-sm transition-colors duration-150"
                >
                  <div className="py-1 flex items-center gap-2 text-[#e6f542] "> <Unplug /> Connect </div>
                </Button>
                
              </Link>

            </div>

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

          </div>

          <Separator className="bg-neutral-800" />
          <div className=" flex items-center text-sm justify-between mt-2 rounded-xs px-2 py-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-gray-300 font-semibold"> <CircleUserRound strokeWidth={1.5} className="size-5 text-[#becf03]" /> {username} </div>
            <div className="text-black rounded-full px-2 bg-[#becf03] text-xs py-1 flex gap-1 items-center pl-3 cursor-pointer"> Logout <ArrowRight strokeWidth={1.5} className="size-3" /> </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SlideBar;
