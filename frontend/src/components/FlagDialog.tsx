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

export default function FlagDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<button className='bg-blue-700 text-white px-6 py-2 font-bold text-sm rounded-sm cursor-pointer'></button>}>
        Create Flag
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Flag</DialogTitle>
          <DialogDescription>
            Create your feature flag here. Click on save when you are done.
          </DialogDescription>
        </DialogHeader>


        <Form className="contents">
          <DialogPanel className="grid gap-4">
            <Field>
              <FieldLabel>Flag Name</FieldLabel>
              <Input type="text" />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Input type="text" />
            </Field>
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
