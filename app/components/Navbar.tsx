"use client";

import React from "react";
import Container from "./container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
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

          {/* CTA */}
          <Link
            href="/register"
            className="hidden rounded-md bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors md:inline-flex hover:border-2 border-black
        
        "
          >
            GET DEMO
          </Link>

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
            <Button className="mt-4 w-full rounded-md bg-black text-white hover:bg-gray-800">
              GET DEMO
            </Button>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
