"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div className="h-screen bg-white" />;
  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Settings', href: '/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-white">
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">MedLog</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                pathname === item.href
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button onClick={handleLogout} variant="outline" className="w-full" size="sm">
            Logout
          </Button>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg font-semibold text-gray-900">MedLog</h1>
        <div className="w-6" />
      </div>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        >
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-900">MedLog</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <Button onClick={handleLogout} variant="outline" className="w-full" size="sm">
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}

      <main className="flex-1 md:ml-0 pt-14 md:pt-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}