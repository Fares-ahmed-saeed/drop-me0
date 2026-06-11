"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  CreditCard,
  LayoutDashboard,
  Settings,
  MessageSquareText,
  Bell,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [counts, setCounts] = useState({
    requests: 5,
    transactions: 2,
  });

  useEffect(() => {
    if (pathname === "/admin/requests") {
      setCounts((prev) => ({ ...prev, requests: 0 }));
    }
    if (pathname === "/admin/transaction") {
      setCounts((prev) => ({ ...prev, transactions: 0 }));
    }
  }, [pathname]);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
      count: 0,
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/admin/users",
      count: 0,
    },
    {
      name: "Requests",
      icon: <MessageSquareText size={20} />,
      path: "/admin/requests",
      count: counts.requests,
    },
    {
      name: "Transactions",
      icon: <CreditCard size={20} />,
      path: "/admin/transaction",
      count: counts.transactions,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <aside className="w-64 fixed inset-y-0 bg-[#0f172a] text-slate-400 p-4 flex flex-col border-r border-slate-800 z-50">
        <div className="mb-10 px-4">
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            Admin
          </h2>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-blue-400"
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm tracking-wide uppercase font-black italic">
                    {item.name}
                  </span>
                </div>

                {item.count > 0 && (
                  <span
                    className={`flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-black italic shadow-sm animate-pulse ${
                      isActive
                        ? "bg-white text-blue-600"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
