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


export default function SegmentDialog() {

    const navigate = useNavigate();
    const {id} = useParams();
    const projectID = Number(id);
    const token = Cookies.get("token");

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
            const response = await axios.post(`http://localhost:3000/projects/${projectID}/segments`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data)
            navigate(`/segments/${response.data.id}`);

            setCreating(false);
            
        }
        catch(err){
            console.log("invite error", err);
        }

    }



  return (
    <Dialog>
      <DialogTrigger render={<button className='bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 font-medium text-sm transition-colors duration-200 rounded-sm cursor-pointer'></button>}>
       <div> Add Segment </div>
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle> Create Segment </DialogTitle>
          <DialogDescription>
            Create a new segment of users
          </DialogDescription>
        </DialogHeader>


        <Form className="contents" onSubmit={handleSubmit}>
          <DialogPanel className="grid gap-4">

            <Field>
              <FieldLabel>Segment Name</FieldLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </Field>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input type="text" name="description" value={formData.description} onChange={handleChange}/>
            </Field>

            <div> {creating && <div className="text-center"> Creating Segment... </div>} </div>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Create Segment</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
