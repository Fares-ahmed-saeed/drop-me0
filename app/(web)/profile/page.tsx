"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { Shield, Crown } from "lucide-react";
import { getStoredToken, clearStoredToken } from "@/lib/auth-token";
import {
  fetchCurrentUser,
  fetchUserConversions,
  fetchUserPoints,
  fetchUserTransactions,
} from "@/lib/profile-api";
import {
  User,
  UserConversion,
  UserTransaction,
} from "@/types/profile";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

export default function Profile() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<UserTransaction[]>([]);
  const [conversions, setConversions] = useState<UserConversion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setToken(getStoredToken());
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (!authReady) return;

    if (!token) {
      router.replace("/login");
      return;
    }

    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userData = await fetchCurrentUser();
        setUser(userData);

        try {
          const pointsData = await fetchUserPoints();
          setPoints(pointsData.points ?? userData.points ?? 0);
          setBalance(pointsData.balance ?? userData.balance ?? 0);
        } catch {
          setPoints(userData.points ?? 0);
          setBalance(userData.balance ?? 0);
        }

        try {
          setTransactions(await fetchUserTransactions());
        } catch {
          setTransactions([]);
        }

        try {
          setConversions(await fetchUserConversions());
        } catch {
          setConversions([]);
        }
      } catch (err) {
        if (isAxiosError(err)) {
          const message =
            (err.response?.data as { message?: string })?.message ||
            err.message ||
            "Error loading profile";
          setError(message);

          if (err.response?.status === 401) {
            clearStoredToken();
            router.replace("/login");
          }
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error loading profile");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [authReady, token, router]);

  if (!authReady || isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-red-500 gap-3">
        <p>{error}</p>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-sm text-primary hover:underline"
        >
          Sign in again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        No profile data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pb-8 pt-8">
            <div className="flex justify-center mb-4">
              <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-gray-700 border-4 border-white">
                {user.fName?.[0]?.toUpperCase() || "U"}
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.fullName}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              {user.phone && (
                <p className="text-gray-500 text-sm mt-1">{user.phone}</p>
              )}

              <div className="flex justify-center mt-3">
                {user.role === "admin" ? (
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Country</p>
                <p className="font-semibold text-gray-800">{user.country}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Gender</p>
                <p className="font-semibold text-gray-800">{user.gender}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Balance</p>
                <p className="font-semibold text-gray-800">{balance} EGP</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Birth Date</p>
                <p className="font-semibold text-gray-800">
                  {formatDate(user.dateOfBirth)}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center text-white mb-6 shadow-lg">
              <p className="text-sm opacity-80">Total Points</p>
              <p className="text-4xl font-bold mt-1">{points}</p>
            </div>

            {user.role === "admin" && (
              <Link href="/admin">
                <button className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
                  Go to Admin Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transactions
          </h3>

          {transactions.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id || transaction._id}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.materialType}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-secondary">
                      +{transaction.pointsEarned} pts
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.weight} kg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Conversions
          </h3>

          {conversions.length === 0 ? (
            <p className="text-sm text-gray-500">No conversions yet</p>
          ) : (
            <div className="space-y-3">
              {conversions.map((conversion) => (
                <div
                  key={conversion.id || conversion._id}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {conversion.pointsUsed} points
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(conversion.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                      {conversion.moneyAdded} EGP
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {conversion.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
