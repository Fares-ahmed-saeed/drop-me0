"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, User } from "lucide-react";
import Image from "next/image";
import { getStoredToken } from "@/lib/auth-token";
import LogoImage from "@/public/logo.png";
import { Button } from "./ui/button";
import { useLogout } from "./Logout";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Recycle", href: "/recycle" },
  { name: "Products", href: "/products" },
  { name: "Rewards", href: "/rewards", authOnly: true },
  { name: "Contact Us", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const logout = useLogout();

  // Check token from cookies on client
  useEffect(() => {
    setToken(getStoredToken());
  }, []);

  const filteredNavItems = navItems.filter(
    (item) => !item.authOnly || (item.authOnly && token),
  );

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-1">
        {/* TOP ROW */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={LogoImage} alt="Logo" width={100} height={100} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            {filteredNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));

              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    className={`relative bg-transparent text-foreground text-lg ${
                      isActive ? "text-primary" : "hover:text-white"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Login / Profile */}
          {token ? (
            <div className="flex items-center  gap-4">
              <Link
                href="/profile"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Button
                onClick={logout}
                variant="outline"
                className="hidden  md:flex px-4 py-2 rounded-lg text-sm font-semibold border-destructive text-destructive hover:bg-destructive/10 hover:text-primary !contain-paint"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-2 py-4 border-t">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-primary text-white" : "hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {token ? (
              <div>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Button className="mt-2 w-full" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
