"use client";

import React, { useMemo, useState } from "react";
import { Search, Calendar, Filter, CheckCircle, Clock } from "lucide-react";
import {
  useGetConversionsQuery,
  useUpdateStatusMutation,
} from "@/redux/features/conversions/conversionsApi";

// أنواع الحالة
export type IStatus = "pending" | "sent" | "failed";
// أنواع الدفع
export type IPaymentMethod = "instapay" | "wallet";

export default function TransactionPage() {
  const { data, isLoading } = useGetConversionsQuery();
  const [update] = useUpdateStatusMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(val);

  // تحويل status من الباك للـ UI
  const getStatusUI = (status: IStatus | string) => {
    if (status === "sent") return "Completed";
    if (status === "pending") return "Pending";
    if (status === "failed") return "Failed";
    return status;
  };

  const handleUpdate = async (id: string, status: IStatus) => {
    try {
      await update({ id, status }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter + Search
  const filteredData = useMemo(() => {
    if (!data?.conversions) return [];
    return data.conversions.filter((tx) => {
      const searchContent =
        `${tx.userId.fullName} ${tx.userId.phone} ${tx.createdAt}`.toLowerCase();
      const matchesSearch = searchContent.includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "All" || getStatusUI(tx.status) === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterStatus]);

  // مجموع النقاط المكتملة
  const totalSettledPoints = useMemo(() => {
    if (!data?.conversions) return 0;
    return data.conversions
      .filter((t) => t.status === "sent")
      .reduce((sum, cur) => sum + cur.pointsUsed, 0);
  }, [data]);

  // مجموع النقاط المعلقة
  const totalPendingPoints = useMemo(() => {
    if (!data?.conversions) return 0;
    return data.conversions
      .filter((t) => t.status === "pending")
      .reduce((sum, cur) => sum + cur.pointsUsed, 0);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-[#0f172a] tracking-tight italic uppercase">
          Transactions Control
        </h1>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white px-6 py-5 rounded-4xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 italic">
            Total Completed Points
          </p>
          <h3 className="text-2xl font-black text-[#0f172a] tracking-tighter italic flex items-baseline gap-1">
            {totalSettledPoints}
            <span className="text-[10px] text-slate-300 not-italic">
              Points
            </span>
          </h3>
        </div>

        <div className="bg-white px-6 py-5 rounded-4xl shadow-sm border border-slate-200 border-l-4 border-l-rose-500">
          <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1 italic">
            Total Pending Points
          </p>
          <h3 className="text-2xl font-black text-[#0f172a] tracking-tighter italic flex items-baseline gap-1">
            {totalPendingPoints}
            <span className="text-[10px] text-slate-300 not-italic">
              Points
            </span>
          </h3>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl outline-none text-sm font-bold text-slate-700 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-44">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={14}
          />
          <select
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl outline-none text-xs font-black text-slate-600 appearance-none cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-4xl shadow-xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">phone</th>
                <th className="px-4 py-4 text-center">Date</th>
                <th className="px-4 py-4">Points</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4 text-center">Method</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((tx) => (
                <tr
                  key={tx.id}
                  className="transition-colors hover:bg-slate-50/50 italic"
                >
                  <td className="px-4 py-6 font-black text-[#0f172a] text-base uppercase tracking-tight">
                    {tx.userId?.fullName}
                  </td>
                  <td className="px-4 py-6 font-black text-[#0f172a] text-base uppercase tracking-tight">
                    {tx.userId?.phone}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg text-[11px] font-bold text-slate-500 border border-slate-100">
                      <Calendar size={12} className="text-blue-500" />
                      {tx.createdAt}
                    </span>
                  </td>
                  <td className="px-4 py-6">
                    <span className="font-black text-[#1e3a8a] text-xl font-mono tracking-tighter italic">
                      {tx.pointsUsed}
                    </span>
                  </td>
                  <td className="px-4 py-6 font-black text-[#0f172a] text-xl tracking-tighter italic">
                    {formatCurrency(tx.moneyAdded)}
                    <span className="text-[10px] text-slate-300 not-italic">
                      EGP
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center font-bold text-[11px] text-slate-700 uppercase">
                    {tx.method === "instapay" ? "InstaPay" : "Wallet"}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase border ${
                        tx.status === "sent"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : tx.status === "pending"
                            ? "bg-orange-50 text-orange-700 border-orange-100"
                            : "bg-rose-50 text-rose-700 border-rose-100"
                      }`}
                    >
                      {getStatusUI(tx.status)}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-right pr-6">
                    {tx.status === "pending" ? (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleUpdate(tx.id, "sent")}
                          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-[10px] font-black shadow-md transition-all uppercase active:scale-95"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdate(tx.id, "failed")}
                          className="bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 px-4 py-2 rounded-xl text-[10px] font-black border transition-all uppercase active:scale-95"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1 text-slate-300 font-black text-[10px] uppercase pr-4 tracking-widest">
                        {tx.status === "sent" ? (
                          <CheckCircle size={12} className="text-emerald-300" />
                        ) : (
                          <Clock size={12} className="text-slate-200" />
                        )}
                        {tx.status === "failed" ? "Closed" : "Settled"}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
