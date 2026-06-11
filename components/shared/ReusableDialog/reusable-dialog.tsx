"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, X } from "lucide-react";

const SIZE_CLASSES = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  "6xl": "sm:max-w-6xl",
  "7xl": "sm:max-w-7xl",
};

interface ReusableDialogProps {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  size?: keyof typeof SIZE_CLASSES;
  onSuccessText?: string;
  onCancelText?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ReusableDialog({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
  size = "md",
  onSuccessText,
  onCancelText,
  onSuccess,
  onCancel,
  isLoading = false,
}: ReusableDialogProps) {
  const hasActions = onSuccess || onCancel || footer;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={`sm:rounded-2xl p-0 gap-0 ${SIZE_CLASSES[size]} max-h-[90vh] flex flex-col overflow-hidden ${className}`}
      >
        <div className="p-4 pb-2 border-b">
          <div className="flex items-center justify-between px-2">
            <DialogHeader className="text-left p-0 space-y-2">
              <DialogTitle className="text-xl font-[400]">{title}</DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
            <DialogClose asChild>
              <Button variant="ghost" size={"icon"}>
                <X className="w-4 h-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 overflow-hidden">
          {children}
        </div>

        {hasActions && (
          <DialogFooter className="p-4 border-t bg-[#F8FAFB] flex flex-row justify-end relative">
            {footer ? (
              footer
            ) : (
              <>
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    size={"lg"}
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    {onCancelText || "Cancel"}
                  </Button>
                )}
                {onSuccess && (
                  <Button
                    type="button"
                    size={"lg"}
                    onClick={onSuccess}
                    disabled={isLoading}
                    className="min-w-[140px]"
                  >
                    {isLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      onSuccessText || "Save"
                    )}
                  </Button>
                )}
              </>
            )}
            {/* Bottom shadow */}
            <div className="absolute bottom-[100%] left-0 w-full h-10 bg-gradient-to-t from-black/5 pointer-events-none to-transparent"></div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface ConfirmDialogProps {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
  variant?: "default" | "destructive";
  children?: React.ReactNode;
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  open,
  onOpenChange,
  isLoading = false,
  variant = "default",
  children,
}: ConfirmDialogProps) {
  return (
    <ReusableDialog
      title={title}
      description={description}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      footer={
        <>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="button"
            variant={variant}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              confirmText
            )}
          </Button>
        </>
      }
    >
      {children}
    </ReusableDialog>
  );
}
