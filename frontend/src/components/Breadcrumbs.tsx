import { Link, NavLink } from "react-router-dom";
import { useMatches } from "react-router-dom";


export default function Breadcrumbs() {
  const matches = useMatches();
  console.log("matches", matches);


  return (
    <div className="h-15 flex items-center border">
      <div className="ml-20 text-xl font-semibold"> Catapult </div>
      <div className=" ml-20 text-foreground">
        {matches
          .filter(match => match.handle?.breadcrumb)
          .map((match: any, index) => (
            <span key={(match.pathname)} className="">
              <Link to={match.pathname}> {match.handle.breadcrumb} </Link>

              {index !== matches.length - 2 && "/"}
            </span>

          ))
        }
      </div>
    </div>
  );
}