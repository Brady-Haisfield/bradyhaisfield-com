"use client";

import posthog from "posthog-js";
import type { ComponentPropsWithoutRef } from "react";

interface TrackedLinkProps extends ComponentPropsWithoutRef<"a"> {
  eventName: string;
  eventProperties?: Record<string, unknown>;
}

export default function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        posthog.capture(eventName, eventProperties);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
