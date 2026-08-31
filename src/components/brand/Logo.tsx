import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="gradient-brand flex size-9 items-center justify-center rounded-xl shadow-soft">
        <Activity className="size-5 text-primary-foreground" strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="font-display block text-base font-semibold tracking-tight">
            Ortho<span className="text-gradient-brand">Sense</span>
          </span>
          <span className="block text-[11px] font-medium text-muted-foreground">
            by Joint Ventures
          </span>
        </span>
      )}
    </div>
  );
}
