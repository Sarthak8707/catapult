import { Link, NavLink } from "react-router-dom";
import { useMatches } from "react-router-dom";


export default function Breadcrumbs() {
  const matches = useMatches();
  console.log("matches", matches);

  
  return (
    <div>
      {matches
      .filter(match => match.handle?.breadcrumb)
      .map((match: any, index) => (
        <span key={(match.pathname)}>
          <Link to = {match.pathname}> {match.handle.breadcrumb} </Link>

          {index !== matches.length - 2 && "/" }
        </span>
        
      ))
       }
    </div>
  );
}