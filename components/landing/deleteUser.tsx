"use client";

import { useDeleteUserMutation } from "@/redux/features/users/usersApi";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

function DeleteUser({ id }: { id: string }) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to delete user");
    }
  };

  return (
    <DeleteDialog
      title="Delete User"
      description="Are you sure you want to delete this user? This action cannot be undone."
      onConfirm={handleDelete}
      loading={isLoading}
      trigger={
        <Button
          variant="outline"
          size="icon"
          className="text-destructive border-destructive/40 hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      }
    />
  );
}

export default DeleteUser;
