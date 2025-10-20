import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  title,
  subtitle,
  toolbar,
  className,
  children,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  toolbar?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("bg-card rounded-2xl shadow-card border border-border/40 p-5 md:p-6 transition-all duration-200 hover:bg-card-hover", className)}>
      {(title || toolbar) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight text-text-primary">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-text-subtle">{subtitle}</p>}
          </div>
          {toolbar}
        </div>
      )}
      {children}
    </div>
  );
}
