import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string;
  className?: string;
  label?: string;
  format?: "horizontal" | "rectangle" | "auto";
}

/*
  AdSlot is a placeholder for future Ad network code (e.g. Google AdSense).
  Replace the wrapper with the provider snippet and map id/format accordingly.
*/
export const AdSlot = ({ id, className, label = "Publicidad", format = "auto" }: AdSlotProps) => {
  return (
    <aside
      role="complementary"
      aria-label={label}
      data-ad-slot={id}
      data-ad-format={format}
      className={cn(
        "w-full rounded-lg border border-dashed border-border bg-card/50 text-muted-foreground",
        "flex items-center justify-center",
        format === "horizontal" ? "h-24" : format === "rectangle" ? "h-64" : "h-40",
        "shadow-sm",
        className
      )}
    >
      <span className="text-xs tracking-wider uppercase">{label}</span>
    </aside>
  );
};

export default AdSlot;
