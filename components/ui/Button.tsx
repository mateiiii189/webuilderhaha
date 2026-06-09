import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0B0F14]";

  const variants = {
    primary: "bg-amber-400 text-black hover:bg-amber-300",
    secondary: "border border-white/15 text-white hover:bg-white/10",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}