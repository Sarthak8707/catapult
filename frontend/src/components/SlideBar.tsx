import { Lightbulb, Notebook, NotebookPen, UserCog, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"



const SlideBar = () => {
  return (
    <div className='w-75 min-h-screen border border-gray-200'>
        <div className=" pr-3 border-amber-900 flex flex-col gap-2 mt-8 pl-4">
          <Link to ={`/projects/2`}>  <Button variant="ghost" className="w-full justify-start rounded-sm"> <Notebook /> Flags </Button> </Link>
          <Link to={`/projects/2/segments`}>  <Button variant="ghost" className="w-full justify-start rounded-sm"> <Users />  Segments  </Button> </Link>
          <Link to={`/projects/2/guardrails`}>  <Button variant="secondary" className="w-full justify-start rounded-sm"> <NotebookPen /> Guardrails </Button> </Link>
          <Link to={`projects/2/members`}> <Button variant="ghost" className="w-full justify-start rounded-sm"> <UserCog /> Members</Button> </Link>
            <Button variant="ghost" className="w-full justify-start rounded-sm"> <Lightbulb /> Audit Trails</Button>
            
        </div>
       
    </div>
  )
}

export default SlideBar