import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";


export default function MemberDialog({id, token}: {id: number, token: string}) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: ""
    })

    const [inviting, setInviting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInviting(true);

        try{
            const response = await axios.post(`http://localhost:3000/projects/${id}/flags`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data)
            navigate(`/flags/${response.data.flagID}`)

            setInviting(false);
            
        }
        catch(err){
            console.log(err);
        }

    }



  return (
    <Dialog>
      <DialogTrigger render={<button className='bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 font-medium text-sm transition-colors duration-200 rounded-sm cursor-pointer'></button>}>
       <div> Add Member </div>
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle> Invite Member </DialogTitle>
          <DialogDescription>
            Invite new member here by username.
          </DialogDescription>
        </DialogHeader>


        <Form className="contents" onSubmit={handleSubmit}>
          <DialogPanel className="grid gap-4">

            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input type="text" name="username" value={formData.username} onChange={handleChange}/>
            </Field>

            <div> {inviting && <div className="text-center"> Sending Invite... </div>} </div>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
