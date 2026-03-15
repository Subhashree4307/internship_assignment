'use client'

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";
import Container from "./container";

const features = [
  {
    subtitle: "REQUEST LEAVES",
    title: "Streamlined Leave Requests",
    bullets: [
      "Easy online leave application forms",
      "Multiple leave types support (vacation, sick, personal)",
      "Mobile-friendly request submission",
    ],
    gradient: "gradient-mauve",
  },
  {
    subtitle: "MANAGE APPROVALS",
    title: "Automated Approval Workflows",
    bullets: [
      "Configurable approval hierarchies",
      "Automated notifications to managers",
      "Real-time approval status tracking",
    ],
    gradient: "gradient-blue-pink",
    reverse: true,
  },
  {
    subtitle: "TRACK BALANCES",
    title: "Leave Balance Management",
    bullets: [
      "Real-time leave balance updates",
      "Accrual calculations and carry-over rules",
      "Comprehensive leave history reports",
    ],
    gradient: "gradient-orange-red",
  },
];

const FeatureSections = () => {
  return (
    

 <Container>


    <section id="solutions" className="relative mt-20 rounded-2xl shadow-lg ">
        <div className="absolute inset-0 bg-white/70 z-0 rounded-2xl" ></div>
         <div className="relative z-10 bg-[url('/background.jpg')] rounded-2xl bg-cover bg-center bg-no-repeat">
      {features.map((feature, i) => (
        <div key={i} className={`py-10 ${i % 2 === 1 ? "bg-gray-bg" : ""}`}>
          <div
            className={`container mx-auto flex flex-col items-center gap-12 px-8 lg:flex-row ${
              feature.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text */}
            <ScrollReveal direction={feature.reverse ? "right" : "left"} className="flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {feature.subtitle}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
                {feature.title}
              </h2>
              <ul className="mt-6 space-y-4">
                {feature.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-green-500 " />
                    <span className="text-base text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
          
            </ScrollReveal>

            {/* Mockup */}
            <ScrollReveal direction={feature.reverse ? "left" : "right"} delay={0.2} className="flex-1">
              <div className={`mx-auto h-72 w-full max-w-md rounded-2xl ${feature.gradient} p-1 shadow-xl md:h-80`}>
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
                  <div className="space-y-3 px-8 w-full">
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-full rounded bg-muted" />
                    <div className="h-4 w-5/6 rounded bg-muted" />
                    <div className="h-4 w-2/3 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      ))}
      </div>
    </section>
     </Container>
    
  );
};

export default FeatureSections;