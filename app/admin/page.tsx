"use client";
import React from "react";
import {
  Package,
  TrendingUp,
  History,
  Wallet,
  Activity,
  Trophy,
  Clock,
  Fingerprint,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ReorganizedDashboard() {
  // بيانات الرسم البياني
  const dailyData = [
    { day: "Mon", transactions: 5, quantity: 50 },
    { day: "Tue", transactions: 12, quantity: 180 },
    { day: "Wed", transactions: 8, quantity: 95 },
    { day: "Thu", transactions: 15, quantity: 320 },
    { day: "Fri", transactions: 20, quantity: 450 },
  ];

  // أحلى 3 مجمعين
  const top3 = [
    { id: "ID-9901", name: "Ahmed Mohamed", points: "45,200", rank: 1 },
    { id: "ID-4412", name: "Sara El-Sayed", points: "38,150", rank: 2 },
    { id: "ID-1029", name: "Hassan Ali", points: "31,900", rank: 3 },
  ];

  // آخر 5 عمليات (الجزء الرابع)
  const recentOps = [
    {
      id: "ID-9901",
      user: "Ahmed",
      qty: "12 Pcs",
      reward: "+120",
      time: "2m ago",
    },
    {
      id: "ID-5582",
      user: "User_22",
      qty: "45 Pcs",
      reward: "+450",
      time: "15m ago",
    },
    {
      id: "ID-1029",
      user: "Hassan",
      qty: "5 Pcs",
      reward: "+50",
      time: "1h ago",
    },
    {
      id: "ID-7731",
      user: "User_14",
      qty: "90 Pcs",
      reward: "+900",
      time: "3h ago",
    },
    {
      id: "ID-2210",
      user: "User_09",
      qty: "22 Pcs",
      reward: "+220",
      time: "5h ago",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 max-w-5xl mx-auto font-sans bg-slate-50/30 min-h-screen pb-20">
      {/* 1. البيانات الأساسية (العدادات) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f172a] p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
          <Package className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
          <p className="text-[10px] font-black text-blue-400 uppercase mb-2 italic">
            Machine Load
          </p>
          <h3 className="text-4xl font-black italic tracking-tighter">
            2,140 <span className="text-sm font-bold">PCS</span>
          </h3>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-lg">
          <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 italic">
            Monthly Payouts
          </p>
          <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">
            4,200 <span className="text-sm">EGP</span>
          </h3>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-lg">
          <p className="text-[10px] font-black text-amber-500 uppercase mb-2 italic">
            All-Time Total
          </p>
          <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">
            28,500 <span className="text-sm">EGP</span>
          </h3>
        </div>
      </div>

      {/* 2. الرسم البياني (بقى تحت البيانات فوراً) */}
      <div className="bg-white p-6 md:p-10 rounded-[50px] border border-slate-100 shadow-xl">
        <div className="mb-10 border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl font-black text-[#0f172a] italic uppercase flex items-center gap-3">
            <Activity className="text-blue-600" /> Daily Performance
          </h2>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dailyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: "bold" }}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "15px",
                  border: "none",
                  boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: "20px" }}
              />
              <Bar
                dataKey="transactions"
                name="Transactions"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
                barSize={25}
              />
              <Bar
                dataKey="quantity"
                name="Quantity"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. أعلى 3 مجمعين */}
      <div className="bg-white p-8 rounded-[50px] border border-slate-100 shadow-xl">
        <h2 className="text-2xl font-black text-[#0f172a] italic uppercase mb-8 flex items-center gap-2">
          <Trophy className="text-amber-500" /> Top 3 Legends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {top3.map((user, i) => (
            <div
              key={i}
              className="relative p-8 rounded-[40px] bg-slate-50 border border-slate-100"
            >
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-black text-xs">
                #{user.rank}
              </div>
              <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 uppercase italic mb-1">
                <Fingerprint size={10} /> {user.id}
              </div>
              <h4 className="text-lg font-black text-slate-900 italic uppercase truncate mb-4">
                {user.name}
              </h4>
              <span className="text-2xl font-black text-blue-600 italic">
                {user.points}{" "}
                <span className="text-[10px] text-slate-400">Pts</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. آخر 5 عمليات (ظهرت وبقوة) */}
      <div className="bg-white rounded-[50px] border border-slate-100 shadow-2xl overflow-hidden">
        <div className="p-8 bg-[#0f172a] flex justify-between items-center">
          <h2 className="text-xl font-black text-white italic uppercase flex items-center gap-3">
            <History size={22} className="text-blue-400" /> Live Feed
          </h2>
          <span className="px-4 py-1 bg-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase italic">
            Recent 5
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase italic">
                  Customer ID
                </th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase italic">
                  User
                </th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase italic">
                  Quantity
                </th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase italic text-right">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOps.map((op, i) => (
                <tr key={i} className="hover:bg-blue-50 transition-colors">
                  <td className="p-6 font-mono text-[10px] font-bold text-blue-600 tracking-tighter">
                    {op.id}
                  </td>
                  <td className="p-6 font-black text-slate-900 italic uppercase text-xs">
                    {op.user}
                  </td>
                  <td className="p-6 font-black text-emerald-500 italic text-sm">
                    {op.qty}
                  </td>
                  <td className="p-6 text-[10px] font-bold text-slate-300 text-right uppercase italic">
                    {op.time}
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
