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
import { Spinner } from "./ui/spinner";


export default function VariantDialog({id}: {id: number}) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        param: "",
        val: ""
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
            const response = await axios.put(`http://localhost:3000/flags/${id}`, {newVariant: formData});

            console.log(formData)

            setCreating(false);
            window.location.reload()
            
        }
        catch(err){
            console.log(err);
        }

    }



  return (
    <Dialog>
      <DialogTrigger render={<button className=' bg-blue-700 mt-5 text-white w-35 px-3 py-2 font-medium text-sm rounded-sm cursor-pointer hover:bg-blue-600 transition-colors duration-200'></button>}>
       <div className='flex items-center gap-1'> <Plus className='h-4 w-4'/>  Add Variant </div>
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Variant</DialogTitle>
          <DialogDescription>
            Create your flag variant here. Click on save when you are done.
          </DialogDescription>
        </DialogHeader>


        <Form className="contents" onSubmit={handleSubmit}>
          <DialogPanel className="grid gap-4">
            <Field>
              <FieldLabel>Variant Name</FieldLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange}/>
            </Field>
            <Field>
              <FieldLabel>Paramter</FieldLabel>
              <Input type="text" name="param" value={formData.param} onChange={handleChange}/>
            </Field>
            <Field>
              <FieldLabel>Value</FieldLabel>
              <Input type="text" name="val" value={formData.val} onChange={handleChange}/>
            </Field>
            
            <div> {creating && <div className="text-center flex items-center justify-center"> <Spinner /> </div>} </div>
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
