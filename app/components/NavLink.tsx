"use client";

import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ className, ...props }, ref) => {
  return <a ref={ref} className={className} {...props} />;
});

NavLink.displayName = "NavLink";

export { NavLink };
