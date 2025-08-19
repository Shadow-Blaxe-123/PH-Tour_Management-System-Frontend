import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import divisionZodSchema from "./divisionSchema";
import { Textarea } from "@/components/ui/textarea";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useState } from "react";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";

function AddDivisionModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [addDivision] = useAddDivisionMutation();
  const form = useForm<z.infer<typeof divisionZodSchema>>({
    resolver: zodResolver(divisionZodSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (data: z.infer<typeof divisionZodSchema>) => {
    const toastId = toast.loading("Adding Division...");
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);
    try {
      const res = await addDivision(formData).unwrap();
      if (res.success) {
        setOpen(false);
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Division Name" {...field} type="text" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your division name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader onChange={setImage} />
        </Form>
        <DialogDescription>Create a division</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-tour-type">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default AddDivisionModal;
