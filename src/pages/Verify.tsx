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
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function Verify() {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
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
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const userInfo = { email: email, otp: data.pin };
    const toastId = toast.loading("Verifying OTP...");
    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        setConfirmed(true);
        toast.success(res.message, { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirm = async () => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        setConfirmed(true);
        toast.success(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
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
                className=" space-y-6"
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
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send an OTP to <br />
              {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button className="w-[300px]" onClick={handleConfirm}>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
export default Verify;
