"use client";
import React from "react";
import { Mail, Phone, MessageSquare, User, Clock, Trash2 } from "lucide-react";
import { useGetContactUsQuery } from "@/redux/features/contactUs/contactApi";

export default function ContactRequests() {
  const { data: ContactUs } = useGetContactUsQuery();

  const requests = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+20123456789",
      message: "I want to inquire about the machine prices.",
      date: "2026/01/30",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.s@mail.com",
      phone: "+20109876543",
      message: "The machine at Giza branch is out of service.",
      date: "2026/01/29",
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 w-full min-h-screen">
      <header>
        <h2 className="text-3xl font-black italic uppercase text-[#0f172a] tracking-tight">
          Contact Requests
        </h2>
        <p className="text-[10px] font-bold text-slate-400 italic uppercase">
          Internal View - No External Connection
        </p>
      </header>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-50 text-[9px] font-black uppercase text-slate-400 italic tracking-widest">
            <tr>
              <th className="p-6">Client Identity</th>
              <th className="p-6">Contact Details</th>
              <th className="p-6">Message Body</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ContactUs?.contacts.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-blue-50/10 transition-all group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-blue-500" />
                    <span className="font-black text-[#0f172a] italic uppercase text-xs">
                      {req.fullName}
                    </span>
                  </div>
                </td>
                <td className="p-6 space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <Mail size={12} /> {req.email}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <Phone size={12} /> {req.phoneNumber}
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-start gap-2 max-w-xs">
                    <MessageSquare
                      size={14}
                      className="text-slate-300 mt-0.5"
                    />
                    <p className="text-[10px] text-slate-400 italic font-bold">
                      {req.message}
                    </p>
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
