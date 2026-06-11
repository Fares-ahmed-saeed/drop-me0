"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { handleReqWithToaster } from "@/lib/handle-req-with-toaster";

interface DeleteDialogProps {
  title: string;
  description?: string;
  onConfirm: any;
  trigger?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  loading?: boolean;
}

export function DeleteDialog({
  title,
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  trigger,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDestructive = true,
  loading = false,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    handleReqWithToaster("Please wait...", async () => {
      await onConfirm();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            className="text-destructive border-destructive/40 hover:bg-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-destructive">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
