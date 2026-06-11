"use client";

import Link from "next/link";
import {
  useGetUserPointsQuery,
  useGetUserQuery,
} from "@/redux/features/profile/profileApi";
import { Shield, Crown } from "lucide-react";

export default function Profile() {
  const { data: userData, isLoading, error } = useGetUserQuery();
  const { data: pointsData } = useGetUserPointsQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-500">
        Error loading profile
      </div>
    );

  const user = userData?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-fit">
          {/* Top gradient */}

          {/* Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-gray-700 border-4 border-white">
                {user?.fName?.[0]?.toUpperCase() || "U"}
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.fullName}
              </h2>
              <p className="text-gray-500">{user?.email}</p>

              {/* Role badge */}
              <div className="flex justify-center mt-3">
                {user?.role === "admin" ? (
                  <span className="flex items-center gap-1 text-xs bg-black text-white px-3 py-1 rounded-full">
                    <Crown className="w-3 h-3" />
                    Admin
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    <Shield className="w-3 h-3" />
                    User
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Country</p>
                <p className="font-semibold text-gray-800">{user?.country}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Gender</p>
                <p className="font-semibold text-gray-800">{user?.gender}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Balance</p>
                <p className="font-semibold text-gray-800">
                  ${user?.balance || 0}
                </p>
              </div>
            </div>

            {/* Points */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center text-white mb-6 shadow-lg">
              <p className="text-sm opacity-80">Total Points</p>
              <p className="text-4xl font-bold mt-1">{user?.points || 0}</p>
            </div>

            {/* Admin Button */}
            {user?.role === "admin" && (
              <Link href="/admin">
                <button className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
                  Go to Admin Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
