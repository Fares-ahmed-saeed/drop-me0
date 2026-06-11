"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  useConvertPointsMutation,
  useGetUserPointsQuery,
} from "@/redux/features/profile/profileApi";
import { toast } from "sonner";
export default function RewardsPage() {
  const { data: userData, isLoading: loadingPoints } = useGetUserPointsQuery();
  console.log("userData", userData);
  const [convertPoints, { isLoading }] = useConvertPointsMutation();

  const [selectedPoints, setSelectedPoints] = useState<number>(100);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState<"instapay" | "wallet">("instapay");

  const userPoints = userData?.points ?? 0;

  const handleSubmit = async () => {
    setError(null);

    if (!fullName || !phoneNumber) {
      setError("Please enter your name and phone number");
      toast.error("Please enter your name and phone number");
      return;
    }

    if (selectedPoints > userPoints) {
      setError("You don't have enough points");
      toast.error("You don't have enough points");
      return;
    }

    try {
      await convertPoints({
        fullName,
        phoneNumber,
        points: selectedPoints,
        method,
      }).unwrap();

      setSuccess(true);

      // ✅ success toast
      toast.success("Points converted successfully 💰");
    } catch (err) {
      setError("Conversion failed. Please try again.");

      // ❌ error toast
      toast.error("Conversion failed. Please try again");
    }
  };

  return (
    <div className="min-h-screen bg-accent/10 py-12 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-serif text-primary text-center">
          Convert Points
        </h1>

        {/* Balance Card */}
        <div className="bg-card rounded-2xl shadow-sm p-6 text-center">
          <p className="text-sm text-muted mb-1">Your Points Balance</p>
          <p className="text-4xl font-bold text-primary">
            {/* {loadingPoints ? "..." : userPoints}  */}
            {userData?.points}
          </p>
          <p className="text-sm text-muted mt-2">
            Equivalent Value: {userPoints / 10} EGP
          </p>
        </div>

        {/* Amount Selection */}
        <div className="bg-card rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Choose Amount</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 10 }, (_, i) => (i + 1) * 100).map(
              (points) => {
                const egp = points / 10;

                return (
                  <button
                    key={points}
                    onClick={() => setSelectedPoints(points)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl border text-sm font-medium transition
          ${
            selectedPoints === points
              ? "bg-primary text-white border-primary"
              : "bg-white border-border hover:bg-accent/20"
          }`}
                  >
                    <span className="font-semibold">{points} Points</span>
                    <span
                      className={`text-xs mt-1 ${
                        selectedPoints === points
                          ? "text-white/80"
                          : "text-muted"
                      }`}
                    >
                      = {egp} EGP
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Form */}
        {!success && (
          <div className="bg-card rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-center">Receiver Details</h3>

            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-border rounded-lg"
            />

            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-border rounded-lg"
            />
            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value as "instapay" | "wallet")
              }
              className="w-full px-4 py-2 border border-border rounded-lg"
            >
              <option value="instapay">Instapay</option>
              <option value="wallet">Wallet</option>
            </select>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-secondary text-white py-3 rounded-full font-medium hover:bg-secondary-light transition disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Convert Points"}
            </button>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-card rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-xl font-semibold text-secondary mb-2">
              Conversion Successful
            </p>
            <p className="text-sm text-muted">
              Your points have been converted successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
