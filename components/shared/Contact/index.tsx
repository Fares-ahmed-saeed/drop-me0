"use client";

import { useSendContactMessageMutation } from "@/redux/features/contactUs/contactApi";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phoneNumber: z.string().min(8, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1),
  message: z.string().min(5, "Message is too short"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      country: "EGYPT",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await sendContactMessage(data).unwrap();
      toast.success("Message sent successfully ✅");
      reset();
    } catch {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 pt-12">
          <div className="bg-card rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Name / Surname
                  </label>
                  <input
                    {...register("fullName")}
                    placeholder="drew"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber")}
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    placeholder="emailexample@gmail.com"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Country
                  </label>
                  <select
                    {...register("country")}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                  >
                    <option>EGYPT</option>
                    <option>Saudi Arabia</option>
                    <option>UAE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Enter Your message..."
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background resize-none"
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-white px-12 py-3 rounded-full font-medium hover:bg-primary-dark disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
