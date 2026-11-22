import { Button } from './ui/button'
import { Unplug } from 'lucide-react'

// export const Connect = () => {
//     return (
//         <div>

//             <div className="rounded-xs border border-neutral-800">

//                 <Button
//                     variant={location.pathname === "/invitations" ? "secondary" :
//                         "ghost"
//                     }
//                     className="w-full justify-start rounded-sm"
//                 >
//                     <div className="py-1 flex items-center gap-2 text-[#e6f542] "> <Unplug /> Connect </div>
//                 </Button>

//             </div>

//         </div>
//     )
// }

// export default Connect


import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { Label } from './ui/label'
import { Input } from './ui/input'

export const Connect = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>

                <div>

                    <div className="rounded-xs border border-neutral-800">

                        <Button
                            variant={location.pathname === "/invitations" ? "secondary" :
                                "ghost"
                            }
                            className="w-full justify-start rounded-sm"
                        >
                            <div className="py-1 flex items-center gap-2 text-[#e6f542] "> <Unplug /> Connect </div>
                        </Button>

                    </div>

                </div>

            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Name</Label>
                        <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Username</Label>
                        <Input id="sheet-demo-username" defaultValue="@peduarte" />
                    </div>
                </div>
                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Connect
