"use client";
import React, { useState } from "react";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  Fingerprint,
  UserCircle,
  Activity,
  Edit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllUserQuery } from "@/redux/features/users/usersApi";
import CreateUser from "@/components/landing/createUser";
import DeleteUser from "@/components/landing/deleteUser";

export default function UsersRegistry() {
  const { data: getAllUser } = useGetAllUserQuery();

  const [searchTerm, setSearchTerm] = useState("");

  const initialUsers = [
    {
      id: "9901",
      name: "AHMED ALI",
      email: "ahmed@example.com",
      phone: "01288334455",
      gender: "MALE",
      transferred: "15,400.00",
      date: "2026/01/15",
    },
    {
      id: "4412",
      name: "SARA MAHMOUD",
      email: "sara@example.com",
      phone: "01023456789",
      gender: "FEMALE",
      transferred: "8,200.50",
      date: "2026/01/20",
    },
    {
      id: "1029",
      name: "MOHAMED HASSAN",
      email: "mo@example.com",
      phone: "01122334455",
      gender: "MALE",
      transferred: "3,150.75",
      date: "2026/01/25",
    },
  ];

  const filteredUsers = initialUsers.filter((user) =>
    Object.values(user).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="p-4 md:p-8 space-y-8 w-full">
      <h2 className="text-3xl font-black italic uppercase text-[#0f172a] tracking-tight">
        Users Registry
      </h2>

      <div className="relative ">
        <div className="flex items-center justify-between">
          <div>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search all records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-[20px] border-none shadow-xl shadow-slate-200/50 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <CreateUser />
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-50">
            <tr className="text-[9px] font-black uppercase text-slate-400 italic tracking-widest">
              <th className="p-6">Fingerprint ID</th>
              <th className="p-6">User Name</th>
              <th className="p-6">Contact Details</th>
              <th className="p-6">Gender</th>
              <th className="p-6">Transferred</th>
              <th className="p-6 text-right">Registration Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {getAllUser?.users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-blue-50/20 transition-all group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Fingerprint size={14} />
                    </div>
                    <span className="font-mono text-sm font-black text-[#0f172a]">
                      {user._id}
                    </span>
                  </div>
                </td>

                <td className="p-6 font-black text-[#0f172a] italic uppercase text-xs">
                  {user.fullName}
                </td>

                <td className="p-6 space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <Mail size={12} /> {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <Phone size={12} /> {user.phone}
                  </div>
                </td>

                <td className="p-6">
                  <span className="text-[10px] font-black text-slate-500 italic uppercase">
                    {user.gender}
                  </span>
                </td>

                <td className="p-6">
                  <div className="font-black text-[#0f172a] italic text-sm">
                    {user.balance}
                    <span className="text-[9px] text-slate-300 ml-1">EGP</span>
                  </div>
                </td>

                <td className="p-6 text-right">
                  <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl text-[9px] font-black">
                    {/* <Edit className="text-yellow-300 cursor-pointer" />  */}
                    <DeleteUser id={user?._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
