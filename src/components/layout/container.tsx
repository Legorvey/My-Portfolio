import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.ComponentProps<"div"> {
  size?: "wide" | "default" | "narrow" | "prose"
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    wide: "max-w-7xl px-4 sm:px-8 lg:px-12",
    default: "max-w-7xl px-4 sm:px-8 lg:px-12",
    narrow: "max-w-5xl px-4 sm:px-6 lg:px-8",
    prose: "max-w-[72ch] px-4 sm:px-6",
  }

  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size] ?? sizeClasses.default,
        className
      )}
      {...props}
    />
  )
}
