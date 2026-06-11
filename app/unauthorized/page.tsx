"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="rounded-2xl bg-white p-10 shadow-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <Lock className="h-10 w-10 text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">
          Sorry, you don’t have permission to view this page.
        </p>
        <Link
          href="/"
          className="rounded-xl bg-red-500 px-6 py-2 text-white font-medium shadow hover:bg-red-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
