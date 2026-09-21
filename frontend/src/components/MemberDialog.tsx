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
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function MemberDialog() {

    const navigate = useNavigate();
    const {id} = useParams();
    const projectID = Number(id);
    const token = Cookies.get("token");

    const [formData, setFormData] = useState({
        invitee: ""
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
            const response = await axios.post(`http://localhost:3000/projects/${projectID}/invitations`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data)
            navigate(0);

            setInviting(false);
            
        }
        catch(err){
            console.log("invite error", err);
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
              <Input type="text" name="invitee" value={formData.invitee} onChange={handleChange}/>
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
