"use client";

import { Shield, Lock, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./container";

const HeroSection = () => {
  return (
    <Container>
      <section className="relative min-h-[85vh] bg-[linear-gradient(135deg,#FF6B4A_0%,#FFAA80_100%)] rounded-2xl mb-15 ">
        <div className="container mx-auto flex flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:py-24">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground/70">
              Backed by leading investors
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance">
              Employee Leave
              <br />Management Platform
            </h1>
            <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-primary-foreground/90 md:text-xl">
              Streamline leave requests, automate approvals, and manage employee absences efficiently — powered by intelligent automation.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              {[
                { icon: Shield, label: "Leave Tracking" },
                { icon: Lock, label: "Approval Workflow" },
                { icon: FileCheck, label: "Calendar Sync" },
              ].map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-primary-foreground/30 px-4 py-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  <Icon size={16} className="text-primary-foreground/80" />
                  <span className="text-xs font-medium text-primary-foreground/80">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 p-1 shadow-2xl backdrop-blur-sm">
              <div className="rounded-xl bg-background/90 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-warning/60" />
                  <div className="h-3 w-3 rounded-full bg-success/60" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                  <div className="mt-6 h-24 rounded-lg gradient-mauve opacity-60" />
                  <div className="h-4 w-2/3 rounded bg-muted" />
                  <div className="h-4 w-1/2 rounded bg-muted" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};

export default HeroSection;
