"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Iconify from "@/components/Iconify";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { logout } from "@/redux/features/userSlice";
import { isAdminUser } from "@/lib/userUtils";

const navItems = [
  {
    href: "/admin",
    icon: "LayoutDashboard",
    label: "Dashboard",
  },
  {
    href: "/admin/questions",
    icon: "BookOpenText",
    label: "Questions",
  },
  {
    href: "/admin/subjects",
    icon: "Library",
    label: "Subjects",
  },
  {
    href: "/admin/topics",
    icon: "Layers",
    label: "Topics",
  },
  {
    href: "/admin/users",
    icon: "Users",
    label: "Users",
  },
  {
    href: "/admin/analytics",
    icon: "BarChart",
    label: "Analytics",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Check if user is authenticated and is admin
  useEffect(() => {
    if (!user.token) {
      router.push("/login");
      return;
    }

    if (user.profile && !isAdminUser(user.profile)) {
      // Redirect non-admin users to dashboard
      router.push("/dashboard");
      return;
    }
  }, [user, router]);

  // Don't render admin layout for non-authenticated or non-admin users
  if (!user.token || (user.profile && !isAdminUser(user.profile))) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-gray-200 bg-white shadow-sm">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Bangsoal</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Iconify
                    icon={item.icon}
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-green-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Back to App */}
          <div className="border-t border-gray-200 p-4">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Iconify icon="ArrowLeft" className="mr-2 h-4 w-4" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {navItems.find((item) => item.href === pathname)?.label || "Admin"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-gray-100"
              >
                <Iconify icon="Bell" className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-600 hover:bg-red-50 hover:text-red-600"
                title="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
              </Button>
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">admin@bangsoal.co.id</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}