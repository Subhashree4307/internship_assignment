import { Shield, Lock, FileCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Container from "./container";

const columns = [
  { title: "Platform", links: ["Compose", "Guard", "Command", "Integrations", "API"] },
  { title: "Solutions", links: ["Leave Requests", "Approval Management", "Balance Tracking", "Reports", "Calendar"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"] },
];

const Footer = () => {
  return (
    <Container>
    <footer className="border-t bg-white py-16 mt-10 rounded-2xl mb-5">
      <ScrollReveal>
        <div className="container mx-auto px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-hero">
                  <span className="text-sm font-bold text-primary-foreground">CA</span>
                </div>
                <span className="font-display text-lg font-bold text-foreground">LeaveManager</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                AI-powered leave management and employee absence tracking for modern businesses.
              </p>
              <div className="mt-6 flex gap-3">
                {[Shield, Lock, FileCheck].map((Icon, i) => (
                  <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40">
                    <Icon size={16} className="text-accent" />
                  </div>
                ))}
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-accent">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">© 2026 LeaveManager. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-accent">Privacy Policy</a>
              <a href="mailto:hello@leavemanager.com" className="text-xs text-muted-foreground hover:text-accent">
                hello@leavemanager.com
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
    </Container>
  );
};

export default Footer;