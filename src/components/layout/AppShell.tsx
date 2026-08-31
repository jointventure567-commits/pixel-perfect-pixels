import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  ClipboardPlus,
  LayoutDashboard,
  Menu,
  Send,
  Settings,
  Stethoscope,
  Users,
  Waves,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/new-screening", label: "New Screening", icon: ClipboardPlus },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/movement-assessment", label: "Movement Assessment", icon: Waves },
  { to: "/results", label: "Screening Results", icon: Stethoscope },
  { to: "/referrals", label: "Referrals", icon: Send },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="space-y-1">
      {nav.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon
              className={cn(
                "size-4.5 transition-colors",
                active ? "text-primary" : "text-muted-foreground group-hover:text-primary",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-1 pt-2">
        <Logo />
      </div>
      <NavList onNavigate={onNavigate} />
      <div className="mt-auto rounded-xl border border-border gradient-surface p-4">
        <p className="text-xs font-semibold">AI-assisted screening</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          OrthoSense supports clinical decisions. It does not provide a diagnosis.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-68 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarInner />
      </aside>

      <div className="lg:pl-68">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SidebarInner onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="lg:hidden">
              <Logo compact />
            </div>

            <p className="hidden text-sm font-medium text-muted-foreground lg:block">
              Smarter screening. Earlier action.
            </p>

            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground sm:flex">
                <Activity className="size-3.5 text-teal" />
                Decision support · not diagnosis
              </span>
              <Button asChild size="sm">
                <Link to="/new-screening">New screening</Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
