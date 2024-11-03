// components/ui/separator.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const separatorVariants = cva(
  "block h-[1px] bg-border transition-colors",
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "h-full w-[1px]",
      },
      color: {
        default: "bg-gray-200 dark:bg-gray-700", // You can adjust the colors here
        accent: "bg-blue-500 dark:bg-blue-300", // Example accent color
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      color: "default",
    },
  }
);

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
  orientation?: "horizontal" | "vertical";
  color?: "default" | "accent";
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, color, ...props }, ref) => {
    return (
      <div
        className={cn(separatorVariants({ orientation, color, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator, separatorVariants };
