import { Link, NavLink } from "react-router-dom";
import { useMatches } from "react-router-dom";


export default function Breadcrumbs() {
  const matches = useMatches();
  console.log("matches", matches);


  return (
    <div className="h-15 flex items-center border border-neutral-800 bg-neutral-900 text-neutral-100">
      <div className="ml-20 text-xl font-semibold"> Catapult </div>
      <div className=" ml-20 text-neutral-400">
        {matches
          .filter(match => match.handle?.breadcrumb)
          .map((match: any, index) => (
            <span key={(match.pathname)} className="">
              <Link to={match.pathname} className="hover:text-neutral-100"> {match.handle.breadcrumb} </Link>

              {index !== matches.length - 2 && "/"}
            </span>

          ))
        }
      </div>
    </div>
  );
}