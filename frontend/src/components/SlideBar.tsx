import { Button } from "./ui/button"



const SlideBar = () => {
  return (
    <div className='w-75 min-h-screen border border-gray-200'>
        <div className=" border-amber-900 flex flex-col gap-2 mt-8 pl-4">
            <Button variant="ghost" className="w-full justify-start">Projects</Button>
            <Button variant="ghost" className="w-full justify-start">Users</Button>
            <Button variant="secondary" className="w-full justify-start">Audit</Button>
            <Button variant="ghost" className="w-full justify-start">Organization Settings</Button>
            <Button variant="ghost" className="w-full justify-start">Projects</Button>
            
        </div>
       
    </div>
  )
}

export default SlideBar