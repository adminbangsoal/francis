"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Activity,
  CheckCircle2,
  Crown,
  Download,
  BookOpenText,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h2>
          <p className="mt-1 text-sm text-gray-500">Track your platform performance</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] bg-white border-gray-200 focus:ring-emerald-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100/50">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-xs font-medium text-emerald-600">+12.5%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100/50">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">892</p>
                <p className="text-xs font-medium text-emerald-600">+8.3%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 border border-purple-100/50">
              <CheckCircle2 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Questions Solved</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">12,456</p>
                <p className="text-xs font-medium text-emerald-600">+23.1%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-100/50">
              <Crown className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Premium Users</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">456</p>
                <p className="text-xs font-medium text-emerald-600">+15.7%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="h-64 flex items-end justify-between gap-3">
            {[
              { day: "Mon", value: 40 },
              { day: "Tue", value: 65 },
              { day: "Wed", value: 55 },
              { day: "Thu", value: 80 },
              { day: "Fri", value: 70 },
              { day: "Sat", value: 95 },
              { day: "Sun", value: 85 },
            ].map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2 group">
                <div className="relative w-full flex justify-center h-full items-end">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded">
                    {item.value}%
                  </div>
                  <div
                    className="w-full rounded-t-md bg-emerald-100 transition-all duration-300 group-hover:bg-emerald-500"
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Daily Activity</h3>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="space-y-6 mt-2">
            {[
              { label: "Questions Solved", value: 456, total: 500, color: "bg-emerald-500" },
              { label: "Flashcards Created", value: 234, total: 300, color: "bg-blue-500" },
              { label: "Tests Taken", value: 89, total: 100, color: "bg-purple-500" },
              { label: "Study Time (hours)", value: 45, total: 50, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.value} <span className="text-gray-400 font-normal">/ {item.total}</span></span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Subject Performance</h3>
          <p className="mt-1 text-sm text-gray-500">User engagement distribution by subject</p>
        </div>
        <div className="space-y-6">
          {[
            { subject: "Potensi Utama (PU)", engagement: 85, questions: "3,456" },
            { subject: "Bahasa Indonesia", engagement: 78, questions: "2,341" },
            { subject: "Pengetahuan Kuantitatif", engagement: 72, questions: "2,134" },
            { subject: "Bahasa Inggris", engagement: 68, questions: "1,876" },
          ].map((item) => (
            <div key={item.subject} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex w-full sm:w-64 items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100/50">
                  <BookOpenText className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.subject}</p>
                  <p className="text-xs text-gray-500">{item.questions} questions solved</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div className="h-2.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${item.engagement}%` }}
                  />
                </div>
                <div className="w-12 text-right font-bold text-gray-900">
                  {item.engagement}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <p className="mt-1 text-sm text-gray-500">Latest user actions across the platform</p>
        </div>
        <div className="space-y-5">
          {[
            {
              user: "Budi Santoso",
              action: "Completed 50 questions",
              time: "2 minutes ago",
              avatar: "B",
            },
            {
              user: "Siti Rahayu",
              action: "Upgraded to Premium",
              time: "15 minutes ago",
              avatar: "S",
            },
            {
              user: "Ahmad Wijaya",
              action: "Started a new test",
              time: "1 hour ago",
              avatar: "A",
            },
            {
              user: "Dewi Putri",
              action: "Created 10 flashcards",
              time: "2 hours ago",
              avatar: "D",
            },
            {
              user: "Rudi Hartono",
              action: "Achieved 30-day streak",
              time: "3 hours ago",
              avatar: "R",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-gray-50 pb-5 last:border-0 last:pb-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {activity.avatar}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-semibold">{activity.user}</span> <span className="text-gray-500">— {activity.action}</span>
                </p>
                <p className="mt-0.5 text-xs font-medium text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}