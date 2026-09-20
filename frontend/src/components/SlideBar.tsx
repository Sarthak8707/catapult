import { ArrowRightLeft, Flag, Layers, Lightbulb, Mail, Notebook, NotebookPen,  Shield, ToggleRight, UserCog, Users, UsersRound } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const SlideBar = () => {
  const location = useLocation();

  return (
    <div className="w-75 min-h-screen border border-gray-200">
      <div className="h-170 pr-3 flex flex-col gap-2 mt-8 pl-4">

        <div className="flex flex-col gap-2">

          <Link to="/projects/2">
          <Button
            variant={location.pathname === "/projects/2" ? "secondary" : "ghost"}
            className="w-full justify-start rounded-sm"
          >
            <div className="flex items-center justify-center gap-2"> <ToggleRight/> Flags </div>
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

        <div className="mt-auto">
          <Link to="/invitations">
          <Button
            variant={ location.pathname === "/invitations" ? "secondary" : 
              "ghost"
            }
            className="w-full justify-start rounded-sm"
          >
            <Mail /> Invitations
          </Button>
        </Link>
        </div>

      </div>
    </div>
  );
};

export default SlideBar;