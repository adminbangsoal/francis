"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpenText, 
  Library, 
  Users, 
  PlusCircle, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Upload, 
  Activity as ActivityIcon, 
  LucideIcon 
} from "lucide-react";

interface DashboardStats {
  totalQuestions: number;
  totalSubjects: number;
  activeUsers: number;
  questionsThisMonth: number;
}

interface Activity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalQuestions: 0,
    totalSubjects: 0,
    activeUsers: 0,
    questionsThisMonth: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Mock data
        setStats({
          totalQuestions: 1247,
          totalSubjects: 4,
          activeUsers: 4521,
          questionsThisMonth: 156,
        });

        setActivities([
          {
            id: "1",
            action: "Question Added",
            description: "Admin added 5 questions to PU - Barisan Bilangan",
            timestamp: "2 hours ago",
          },
          {
            id: "2",
            action: "Subject Updated",
            description: "PKPM topics updated with new content",
            timestamp: "5 hours ago",
          },
          {
            id: "3",
            action: "New User",
            description: "User registered: budi@email.com",
            timestamp: "7 hours ago",
          },
          {
            id: "4",
            action: "Topic Added",
            description: "New topic added to PU: Spasial",
            timestamp: "1 day ago",
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpenText}
          label="Total Questions"
          value={stats.totalQuestions}
          change="+12%"
          trend="up"
        />
        <StatCard
          icon={Library}
          label="Total Subjects"
          value={stats.totalSubjects}
          change="Stable"
          trend="neutral"
        />
        <StatCard
          icon={Users}
          label="Active Users"
          value={stats.activeUsers}
          change="+8%"
          trend="up"
        />
        <StatCard
          icon={PlusCircle}
          label="This Month"
          value={stats.questionsThisMonth}
          change="+23%"
          trend="up"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start gap-3 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" size="lg">
              <Plus className="h-5 w-5" />
              Add New Question
            </Button>
            <Button className="w-full justify-start gap-3 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors" variant="outline" size="lg">
              <Upload className="h-5 w-5" />
              Upload CSV
            </Button>
            <Button className="w-full justify-start gap-3 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors" variant="outline" size="lg">
              <Library className="h-5 w-5" />
              Manage Subjects
            </Button>
            <Button className="w-full justify-start gap-3 border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors" variant="outline" size="lg">
              <Users className="h-5 w-5" />
              View Users
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  change: string;
  trend: "up" | "down" | "neutral";
}

function StatCard({ icon: Icon, label, value, change, trend }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-100">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
          <Icon className="h-6 w-6" />
        </div>
        {trend !== "neutral" ? (
          <div
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              trend === "up"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {change}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600">
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-emerald-50/50">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700">
        <ActivityIcon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{activity.action}</p>
        <p className="text-sm text-gray-500 line-clamp-1">{activity.description}</p>
      </div>
      <span className="shrink-0 pt-1 text-xs font-medium text-gray-400">
        {activity.timestamp}
      </span>
    </div>
  );
}