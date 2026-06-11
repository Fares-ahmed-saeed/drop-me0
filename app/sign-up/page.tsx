"use client";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthLayout from "@/components/layouts/authLayout";
import { z } from "zod";
import CustomizeTextField from "@/components/shared/CustomizeTextField";
import { getAuthErrorMessage, signUpUser } from "@/lib/auth-api";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(11, "Last name must be no more than 11 characters"),
    gender: z.enum(["male", "female"], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    country: z.string().min(1, "Country is required"),
    phoneNumber: z.string().min(8, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["admin", "user"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      dateOfBirth: "",
      country: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      await signUpUser({
        fName: data.firstName,
        lName: data.lastName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        country: data.country,
        phone: data.phoneNumber,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-serif text-primary text-center mb-8">
        Join Us
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomizeTextField
              name="firstName"
              label="First Name"
              placeholder="First Name"
              disabled={isLoading}
            />

            <CustomizeTextField
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              disabled={isLoading}
            />

            {/* Gender */}
            <div>
              <label className="text-sm mb-2 block">Gender</label>
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="male"
                    disabled={isLoading}
                    {...methods.register("gender")}
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="female"
                    disabled={isLoading}
                    {...methods.register("gender")}
                  />
                  Female
                </label>
              </div>
              {methods.formState.errors.gender && (
                <p className="text-12 text-red-400">
                  {methods.formState.errors.gender.message}
                </p>
              )}
            </div>
          </div>

          {/* Birth + Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomizeTextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              disabled={isLoading}
            />

            <div>
              <label className="text-sm mb-2 block">Country</label>
              <select
                {...methods.register("country")}
                disabled={isLoading}
                className="w-full h-10 px-3 border rounded-md bg-gray-50"
              >
                <option value="">Select Country</option>
                <option value="egypt">Egypt</option>
                <option value="saudi">Saudi Arabia</option>
                <option value="uae">UAE</option>
              </select>
              {methods.formState.errors.country && (
                <p className="text-12 text-red-400">
                  {methods.formState.errors.country.message}
                </p>
              )}
            </div>
          </div>

          {/* Auth */}
          <div className="grid grid-cols-1 gap-4">
            <CustomizeTextField
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              disabled={isLoading}
            />

            <CustomizeTextField
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              placeholder="+20 123 456 7890"
              disabled={isLoading}
            />

            <CustomizeTextField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              disabled={isLoading}
            />

            <CustomizeTextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating account..." : "Join"}
          </button>

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
