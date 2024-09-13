// components/Sidebar.tsx
'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Community", href: "/dashboard/community" },
  { name: "My Program", href: "/my-program" },
  { name: "Wellness Tools", href: "/wellness-tools" },
  { name: "Subscription", href: "/subscription" },
];

const bottomNavigation = [
  { name: "Talk to us", href: "/talk-to-us" },
  { name: "Profile", href: "/profile" },
  { name: "Logout", href: "/logout" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div>
        {/* Brand Logo */}
        <div className="p-4 text-xl font-bold">
          <Link href="/">Brand Logo</Link>
        </div>

        {/* Top Navigation */}
        <nav className="mt-8">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`block px-4 py-2 mt-2 text-sm font-medium rounded-lg
                  ${
                    pathname === item.href ? "bg-gray-900" : "hover:bg-gray-700"
                  }`}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="mb-4">
        {bottomNavigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className={`block px-4 py-2 mt-2 text-sm font-medium rounded-lg
                ${
                  pathname === item.href ? "bg-gray-900" : "hover:bg-gray-700"
                }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
