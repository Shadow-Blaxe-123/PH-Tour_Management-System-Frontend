import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { CalendarIcon } from "lucide-react";
import {
  useFieldArray,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { format, formatISO } from "date-fns";
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { useState } from "react";
import type { FileMetadata } from "@/hooks/use-file-upload";

function AddTour() {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [addTour] = useAddTourMutation();
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const divisionOptions = divisionData?.data?.map((item: { name: string }) => ({
    value: item.name,
    label: item.name,
  }));
  const tourTypeOptions = tourTypeData?.data?.map((item: { name: string }) => ({
    value: item.name,
    label: item.name,
  }));
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      division: "",
      tourType: "",
      startDate: "",
      endDate: "",
      included: [{ value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });
  console.log(fields);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));
    console.log(tourData);
    console.log(data);
    // try {
    //   const res = await addTour(formData).unwrap();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="w-full max-w-4xl mx-auto px-5 mt-16 flex justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Tour</CardTitle>
          <CardDescription>Add new tour to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
              id="add-tour-form"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="w-full"
                            disabled={divisionLoading}
                          >
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisionOptions?.map(
                            (
                              item: { value: string; label: string },
                              index: number
                            ) => (
                              <SelectItem value={item.value} key={index}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="w-full"
                            disabled={tourTypeLoading}
                          >
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tourTypeOptions?.map(
                            (
                              item: { value: string; label: string },
                              index: number
                            ) => (
                              <SelectItem value={item.value} key={index}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <
                              new Date(
                                new Date().setDate(new Date().getDate() - 1)
                              )
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-5 items-stretch">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="h-[250px]" />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-1 mt-6">
                  <MultipleImageUploader onChange={setImages} />
                </div>
              </div>
              <div className="border-t border-muted-foreground w-full"></div>
              <div>
                <Button type="button" onClick={() => append({ value: "" })}>
                  Add Includes
                </Button>
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    name={`included.${index}.value`}
                    key={field.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tour Title</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-row-reverse">
          <Button type="submit" form="add-tour-form">
            Create Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export default AddTour;
