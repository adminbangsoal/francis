"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpenText,
  Library,
  Users,
  Plus,
  FolderOpen,
  List,
} from "lucide-react";

const adminPages = [
  {
    title: "Questions",
    description: "Manage all questions",
    icon: BookOpenText,
    href: "/admin/questions",
    primary: true,
  },
  {
    title: "Subjects",
    description: "Manage subjects",
    icon: Library,
    href: "/admin/subjects",
  },
  {
    title: "Topics",
    description: "Manage topics",
    icon: FolderOpen,
    href: "/admin/topics",
  },
  {
    title: "Users",
    description: "Manage users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Add Question",
    description: "Create new question",
    icon: Plus,
    href: "/admin/questions/new",
    primary: true,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-500">Select a page to manage</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminPages.map((page) => (
          <Link key={page.href} href={page.href} className="w-full">
            <Button
              className={`w-full justify-start gap-3 h-auto p-6 ${
                page.primary
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
              variant={page.primary ? "default" : "outline"}
              size="lg"
            >
              <page.icon className={`h-6 w-6 ${page.primary ? "text-white" : "text-emerald-600"}`} />
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold">{page.title}</span>
                <span className={`text-xs ${page.primary ? "text-emerald-100" : "text-gray-500"}`}>
                  {page.description}
                </span>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}