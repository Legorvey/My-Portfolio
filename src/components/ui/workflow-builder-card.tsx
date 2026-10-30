"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function sanitizeUrl(url?: string): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("//")) return "#";
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:" ||
      parsed.protocol === "mailto:"
    ) {
      return trimmed;
    }
  } catch {
    return "#";
  }
  return "#";
}

// Define the types for the component props for type-safety and reusability
export interface User {
  src: string;
  fallback: string;
}

export interface Action {
  Icon: React.ElementType;
  bgColor: string;
  label?: string;
  href?: string;
}

export interface WorkflowBuilderCardProps {
  imageUrl: string;
  imagePosition?: string;
  status: "Active" | "Inactive";
  lastUpdated: string;
  title: string;
  description: string;
  tags?: readonly string[] | string[];
  users?: readonly User[] | User[];
  actions: readonly Action[] | Action[];
  bullets?: readonly string[];
  links?: readonly {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
  className?: string;
  bannerClassName?: string;
}

export const WorkflowBuilderCard = ({
  imageUrl,
  imagePosition,
  status,
  lastUpdated,
  title,
  description,
  tags = [],
  users = [],
  actions = [],
  bullets,
  links,
  className,
  bannerClassName,
}: WorkflowBuilderCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [prevImageUrl, setPrevImageUrl] = React.useState(imageUrl);
  const [imageError, setImageError] = React.useState(false);

  if (prevImageUrl !== imageUrl) {
    setPrevImageUrl(imageUrl);
    setImageError(false);
  }

  // Animation variants for the details section
  const detailVariants: Variants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "1rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      tabIndex={0}
      role="region"
      aria-label={`${title} card`}
      className={cn("w-full cursor-pointer select-none", className)}
    >
      <Card className="overflow-hidden rounded-xl border border-border bg-card shadow-md transition-shadow duration-300 hover:shadow-xl">
        {/* Card Image */}
        <div className={cn("relative h-44 sm:h-48 md:h-52 w-full overflow-hidden bg-muted/40", bannerClassName)}>
          {!imageError && imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className={cn(
                "object-cover transition-transform duration-500 hover:scale-105",
                imagePosition ?? "object-center"
              )}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-secondary/30 text-muted-foreground select-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card shadow-xs">
                <span className="font-mono text-xs font-semibold text-primary">
                  {title.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground/70">
                Awaiting Image Asset
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="p-4 sm:p-5">
          {/* Always-visible header content */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span>{lastUpdated}</span>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-sans">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      status === "Active"
                        ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                        : "bg-red-500"
                    )}
                    aria-label={status}
                  />
                  <span>{status}</span>
                </div>
              </div>
              <h3 className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-card-foreground">
                {title}
              </h3>
            </div>
            <button
              type="button"
              aria-label="Toggle details"
              onClick={(e) => {
                e.stopPropagation();
                setIsHovered((prev) => !prev);
              }}
              className="text-muted-foreground transition-colors hover:text-foreground p-0.5 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Animated description and tags section */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="details"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={detailVariants}
                className="overflow-hidden"
              >
                {description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}

                {bullets && bullets.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span className="text-foreground/85 leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {tags && tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {links && links.length > 0 && (
                  <div
                    className="mt-3 flex flex-wrap items-center gap-3 border-t border-border/50 pt-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {links.map((link) => {
                      const safeUrl = sanitizeUrl(link.href);
                      return link.isExternal ? (
                        <a
                          key={link.label}
                          href={safeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1 font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <span>{link.label.replace(/ ↗$/, "")}</span>
                          <span
                            className="text-primary transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          href={safeUrl}
                          className="group/link inline-flex items-center gap-1 font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <span>{link.label.replace(/ ↗$/, "")}</span>
                          <span
                            className="text-primary transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between border-t border-border p-4 sm:p-5">
          {users && users.length > 0 ? (
            <div className="flex -space-x-2">
              {users.map((user, index) => (
                <Avatar
                  key={index}
                  className="h-7 w-7 border-2 border-card"
                  aria-label={user.fallback}
                >
                  <AvatarImage src={user.src} />
                  <AvatarFallback className="text-[10px]">
                    {user.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center -space-x-2">
            {actions.map(({ Icon, bgColor, href, label }, index) => {
              const iconElement = (
                <div
                  key={index}
                  title={label}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 border-card text-white shadow-xs transition-transform hover:scale-110",
                    bgColor
                  )}
                >
                  <Icon size={14} />
                </div>
              );
              if (href) {
                const safeActionHref = sanitizeUrl(href);
                return (
                  <a
                    key={index}
                    href={safeActionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {iconElement}
                  </a>
                );
              }
              return iconElement;
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
