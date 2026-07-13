import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonLinkProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  to?: string;
  href?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
const buttonClasses =
  "inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-center font-extrabold leading-5 transition duration-150 hover:-translate-y-px focus-visible:outline-cyan";

export function ButtonLink({
  children,
  variant = "primary",
  to,
  href,
  className = "",
  ...props
}: ButtonLinkProps) {
  const colorClasses =
    variant === "primary"
      ? "bg-[#71e9ee] text-[#06131f] shadow-[0_7px_0_rgb(0_0_0_/_14%)] hover:bg-[#8df0d3]"
      : "border border-white/12 bg-panel text-[#e8f6fb]";
  const classes = `${buttonClasses} ${colorClasses} ${className}`;
  return to ? (
    <Link className={classes} to={to} {...props}>
      {children}
    </Link>
  ) : (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
}
