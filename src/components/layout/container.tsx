import * as React from "react"
import { cn } from "cn"

interface ContainerProps extends React.ComponentProps<"div"> {
  size?: "default" | "prose"
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" ? "max-w-5xl" : "max-w-[72ch]",
        className
      )}
      {...props}
    />
  )
}
