import { Button } from "@/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import z from "zod";
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state);
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <div className="grid place-content-center h-screen">
      <Card>
        <CardHeader className="text-xl">
          <CardTitle>Verify your email address</CardTitle>
          <CardDescription>
            Please enter the 6-digit code we sent to <br />
            {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="verify-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSeparator />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button form="verify-form" type="submit">
            Verify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Verify;
