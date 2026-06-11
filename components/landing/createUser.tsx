"use client";

import React, { useState } from "react";
import { useCreateUserMutation } from "@/redux/features/users/usersApi";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { ReusableDialog } from "../shared/ReusableDialog/reusable-dialog";
import CustomizeTextField from "../shared/CustomizeTextField";
import { Plus } from "lucide-react";
import { toast } from "sonner";
export interface ICreate {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  dateOfBirth: string;
  gender: "male" | "female";
}

function CreateUser() {
  const [open, setOpen] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const methods = useForm<ICreate>({
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      dateOfBirth: "",
      gender: "male",
    },
  });

  const onSubmit = async (data: ICreate) => {
    try {
      await createUser(data).unwrap();
      setOpen(false);
      methods.reset();
      toast.success("Create User successfully");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to Create user");
    }
  };

  return (
    <div>
      <ReusableDialog
        open={open}
        onOpenChange={setOpen}
        size="2xl"
        title="Create New User"
        description="Add new user to system"
        trigger={
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus />
            Create User
          </Button>
        }
        onSuccess={methods.handleSubmit(onSubmit)}
        onSuccessText="Create"
        onCancel={() => setOpen(false)}
        isLoading={isLoading}
      >
        <FormProvider {...methods}>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomizeTextField
              name="fName"
              label="First Name"
              placeholder="Enter first name"
            />

            <CustomizeTextField
              name="lName"
              label="Last Name"
              placeholder="Enter last name"
            />

            <CustomizeTextField
              name="email"
              label="Email"
              placeholder="Enter email"
              type="email"
            />

            <CustomizeTextField
              name="country"
              label="Country"
              placeholder="Country"
            />

            <CustomizeTextField
              name="dateOfBirth"
              label="Date of birth"
              placeholder="YYYY-MM-DD"
              type="date"
            />

            {/* gender */}
            <div className="flex flex-col gap-2">
              <label className="text-14 font-medium text-gray-700">
                Gender
              </label>
              <select
                {...methods.register("gender")}
                className="h-10 rounded-md border border-gray-200 bg-gray-50 px-3"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <CustomizeTextField
              name="password"
              label="Password"
              placeholder="Enter password"
              type="password"
            />

            <CustomizeTextField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
            />
          </form>
        </FormProvider>
      </ReusableDialog>
    </div>
  );
}

export default CreateUser;
