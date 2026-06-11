"use client";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomizeTextField from "@/components/shared/CustomizeTextField";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layouts/authLayout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  extractAuthToken,
  getAuthErrorMessage,
  loginUser,
} from "@/lib/auth-api";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "user"]),
});

type FormData = z.infer<typeof LoginSchema>;

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const methods = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      const token = extractAuthToken(response);

      if (!token) {
        throw new Error(response.message || "Login failed. No token received.");
      }

      dispatch(
        setUser({
          token,
          role: response.role === "admin" ? "admin" : "user",
        }),
      );

      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-4">
            <CustomizeTextField
              name="email"
              as="input"
              disabled={isLoading}
              type="text"
              label="Email Address"
              placeholder="you@example.com"
            />
            <CustomizeTextField
              name="phoneNumber"
              as="input"
              disabled={isLoading}
              type="tel"
              label="Phone Number"
              placeholder="+20 123 456 7890"
            />
            <CustomizeTextField
              name="password"
              as="input"
              disabled={isLoading}
              type="password"
              label="Password"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 h-10 font-medium"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-primary hover:text-primary/90 font-semibold transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
export default LoginPage;
