"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  const tabs = [
    {
      id: "home",
      label: "首页",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="m11.25 9.227-5.629 5.63a1.5 1.5 0 0 0 2.122 2.12L10.5 14.47v6.28a1.5 1.5 0 0 0 3 0v-6.28l2.757 2.508a1.5 1.5 0 0 0 2.122-2.12l-5.63-5.63a1.5 1.5 0 0 0-2.12 0Z" />
          <path d="M2.25 12a9.75 9.75 0 0 1 9.75-9.75 9.75 9.75 0 0 1 6.596 2.556L16.66 6.48A7.5 7.5 0 0 0 5.25 12c0 1.732.577 3.33 1.553 4.617l1.787-1.788A5.25 5.25 0 0 1 5.25 12Z" />
        </svg>
      ),
      href: "/",
    },
    {
      id: "stocks",
      label: "股市行情",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
      ),
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      href: "/stocks",
    },
    {
      id: "products",
      label: "精选产品",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                          />
                        </svg>
      ),
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Zm3.75-1.5a.75.75 0 0 0-.75.75v2.25c0 .414.336.75.75.75h2.25a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H6Zm-2.25 9a.75.75 0 0 0-.75.75v2.25c0 .414.336.75.75.75h2.25a.75.75 0 0 0 .75-.75v-2.25a.75.75 0 0 0-.75-.75H6Zm2.25-1.5a2.25 2.25 0 0 1 2.25 2.25v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25v-2.25A2.25 2.25 0 0 1 6 13.5h2.25Zm4.5-6a.75.75 0 0 0-.75.75v2.25c0 .414.336.75.75.75H18a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75h-5.25ZM11.25 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-4.5A2.25 2.25 0 0 1 11.25 8.25V6Zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-4.5a2.25 2.25 0 0 1-2.25-2.25v-2.25Zm2.25-.75a.75.75 0 0 0-.75.75v2.25c0 .414.336.75.75.75H18a.75.75 0 0 0 .75-.75v-2.25a.75.75 0 0 0-.75-.75h-4.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      href: "/products",
    },
    {
      id: "profile",
      label: "我的",
      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
      ),
      activeIcon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clipRule="evenodd"
                          />
                        </svg>
      ),
      href: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-md mx-auto bg-white min-h-screen relative">
        {children}
      </main>

      {/* Bottom Tab Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <div className="flex justify-around items-center h-16">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className="flex flex-col items-center justify-center w-full h-full transition-colors duration-200"
                >
                  <div
                    className={`transition-all duration-200 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  >
                    {isActive ? (
                      <div className="text-pink-600">{tab.activeIcon}</div>
                    ) : (
                      <div className="text-gray-400">{tab.icon}</div>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-0.5 font-medium transition-colors duration-200 ${
                      isActive ? "text-pink-600" : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Add safe area padding for iPhone notch/home indicator */}
      <style jsx global>{`
        @supports (padding: max(0px)) {
          .safe-area-bottom {
            padding-bottom: max(0px, env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  );
}
