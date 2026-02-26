"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserPlus,
  Search,
  Loader2,
  AlertCircle,
  Crown,
} from "lucide-react";
import { apiConfig } from "@/redux/api/config";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  subscription: "pemula" | "setia" | "ambis";
  createdAt: string;
  lastActive: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiConfig.baseUrl}/users-cms/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.data || responseData;
        setUsers(data);
        toast.success("Users loaded successfully");
        return;
      }

      // If API fails, use mock data as fallback
      console.warn("API endpoint not ready, using mock data");
      setUsingMockData(true);
      
      setUsers([
        {
          id: "1",
          name: "Budi Santoso",
          email: "budi@email.com",
          role: "user",
          subscription: "ambis",
          createdAt: "2024-01-15",
          lastActive: "2 hours ago",
        },
        {
          id: "2",
          name: "Siti Rahayu",
          email: "siti@email.com",
          role: "user",
          subscription: "pemula",
          createdAt: "2024-01-18",
          lastActive: "5 hours ago",
        },
        {
          id: "3",
          name: "Ahmad Wijaya",
          email: "ahmad@email.com",
          role: "admin",
          subscription: "ambis",
          createdAt: "2024-01-20",
          lastActive: "1 day ago",
        },
        {
          id: "4",
          name: "Dewi Putri",
          email: "dewi@email.com",
          role: "user",
          subscription: "setia",
          createdAt: "2024-01-22",
          lastActive: "3 days ago",
        },
        {
          id: "5",
          name: "Rudi Hartono",
          email: "rudi@email.com",
          role: "user",
          subscription: "pemula",
          createdAt: "2024-01-25",
          lastActive: "1 week ago",
        },
      ]);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesSub = subscriptionFilter === "all" || user.subscription === subscriptionFilter;

    return matchesSearch && matchesRole && matchesSub;
  });

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Users</h2>
          <p className="mt-1 text-sm text-gray-500">Manage platform users</p>
        </div>
        <div className="flex items-center gap-3">
          {/* NOTE: Add User functionality requires backend API implementation */}
          <Button
            disabled
            className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm opacity-50 cursor-not-allowed"
            title="Backend API not implemented yet"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 bg-white focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-4">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-white border-gray-200 focus:ring-emerald-500">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-white border-gray-200 focus:ring-emerald-500">
              <SelectValue placeholder="Subscription" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="pemula">Pemula</SelectItem>
              <SelectItem value="setia">Setia</SelectItem>
              <SelectItem value="ambis">Ambis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* API Notice Banner - Only show when using mock data */}
      {usingMockData && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-amber-900">Backend API Not Implemented</p>
            <p className="text-sm text-amber-700 mt-1">
              User management endpoints are not available in the backend yet. 
              Currently showing mock data. Once the users-cms module is implemented in the backend, this page will automatically integrate with it.
            </p>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="h-12 font-semibold text-gray-700">User</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Role</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Subscription</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Date Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        user.subscription === "ambis"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : user.subscription === "setia"
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {user.subscription === "ambis" && <Crown className="h-3 w-3" />}
                      {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                  No users found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}