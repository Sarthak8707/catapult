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


export default function FlagDialog({id, token}: {id: number, token: string}) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

    const [creating, setCreating] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCreating(true);

        try{
            const response = await axios.post(`http://localhost:3000/projects/${id}/flags`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data)
            navigate(`/flags/${response.data.flagID}`)

            setCreating(false);
            
        }
        catch(err){
            console.log(err);
        }

    }



  return (
    <Dialog>
      <DialogTrigger render={<button className='bg-blue-700 text-white px-3 py-2 font-medium text-sm rounded-sm cursor-pointer'></button>}>
       <div> Create Flag </div>
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Flag</DialogTitle>
          <DialogDescription>
            Create your feature flag here. Click on save when you are done.
          </DialogDescription>
        </DialogHeader>


        <Form className="contents" onSubmit={handleSubmit}>
          <DialogPanel className="grid gap-4">
            <Field>
              <FieldLabel>Flag Name</FieldLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input type="text" name="description" value={formData.description} onChange={handleChange} />
            </Field>
            <div> {creating && <div className="text-center"> Creating Flag... </div>} </div>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
