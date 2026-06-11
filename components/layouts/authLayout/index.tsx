import React from "react";
import UI_IMG from "@/public/people-recycling-together.jpg";
import Image from "next/image";
type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="flex h-screen overflow-hidden bg-background">
      {/* Left */}
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Scroll container */}
        <div className="flex-1 overflow-y-auto px-6 md:px-16 flex justify-center">
          <div className="w-full max-w-sm py-12">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                DROP
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Manage your recycling journey
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6">{children}</div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground text-xs text-center">
                By continuing, you agree to our terms of service
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:block relative w-1/2 h-full">
        <Image
          src={UI_IMG}
          alt="People recycling together"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </section>
  );
}

export default AuthLayout;
