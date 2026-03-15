"use client";

import React, { useEffect, useState } from "react";
import Container from "./container";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loginEmail");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const navItems = ["Home", "Features", "Pricing", "Contact"];
  return (
    <nav>
      <Container>
        <div className="container mx-auto flex h-[72px] items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-hero">
              <span className="text-sm font-bold text-primary-foreground">
                CA
              </span>
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              ComplianceAI
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA or Profile */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              >
                <User size={16} />
                Profile
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    View Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/register"
              className="hidden rounded-md bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors md:inline-flex hover:border-2 border-black"
            >
              GET DEMO
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t bg-background px-6 pb-6 md:hidden">
            <ul className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-foreground/80"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                    </a>
                  </li>
                ))}
              </ul>
              {isLoggedIn ? (
                <div className="mt-4 space-y-2">
                  <Link
                    href="/dashboard"
                    className="block w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    View Dashboard
                  </Link>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full rounded-md bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button className="mt-4 w-full rounded-md bg-black text-white hover:bg-gray-800">
                  GET DEMO
                </Button>
              )}
            </div>
          )}
        </Container>
      </nav>
  );
};

export default Navbar;
