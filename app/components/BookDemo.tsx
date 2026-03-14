"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import DarkVeil from "@/components/DarkVeil";
import Container from "./container";
const BookDemo = () => {
  return (
    <Container>
      <section className="relative py-20 overflow-hidden rounded-2xl mt-10">
        <div className="absolute inset-0 -z-10">
          <DarkVeil
            hueShift={0}
            noiseIntensity={0.11}
            scanlineIntensity={0}
            speed={1.9}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>

        <div className="absolute inset-0 bg-black/50 -z-10" />

        {/* Content */}
        <div className="relative container mx-auto max-w-2xl px-6 text-center text-white">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              30 Minutes. Your Content. Live Results.
            </h2>

            <p className="mt-4 text-base text-white/80">
              See how ComplianceAI transforms your compliance and cash flow
              operations — with your own data.
            </p>

            <div className="mx-auto mt-8 flex max-w-md gap-3">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 rounded-md"
              />
              <Button className="rounded-md bg-charcoal px-6 text-primary-foreground hover:bg-charcoal-light">
                Book Demo
              </Button>
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/70">
              30 min · No prep · Your data never stored · Response in 2 hours
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <blockquote className="mt-12 border-t border-white/20 pt-8">
              <p className="text-lg italic text-white/90">
                "ComplianceAI reduced our compliance review time by 80% and gave
                us real-time visibility into our cash flow for the first time."
              </p>
              <footer className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                  Head of Compliance
                </p>
                <p className="text-xs text-white/60">
                  Large MSME Financial Services
                </p>
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>
    </Container>
  );
};

export default BookDemo;
