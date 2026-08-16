import { Lightbulb, Notebook, NotebookPen, UserCog, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"



const SlideBar = () => {
  return (
    <div className='w-75 min-h-screen border border-gray-200'>
        <div className=" pr-3 border-amber-900 flex flex-col gap-2 mt-8 pl-4">
            <Button variant="ghost" className="w-full justify-start rounded-sm"> <Notebook /> <Link to ={`/projects/2`}>Flags</Link> </Button>
            <Button variant="ghost" className="w-full justify-start rounded-sm"> <Users /> <Link to={`/projects/2/segments`}> Segments </Link> </Button>
            <Button variant="secondary" className="w-full justify-start rounded-sm"> <NotebookPen /> <Link to = {`/projects/2/guardrails`}>Guardrails</Link> </Button>
            <Button variant="ghost" className="w-full justify-start rounded-sm"> <UserCog /> Members</Button>
            <Button variant="ghost" className="w-full justify-start rounded-sm"> <Lightbulb /> Audit Trails</Button>
            
        </div>
       
    </div>
  )
}

export default SlideBar