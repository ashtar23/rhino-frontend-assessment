import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "rounded-full border px-4 py-2 text-sm font-medium transition",
  {
    variants: {
      variant: {
        inverse:
          "border-zinc-700 text-white hover:border-brand-accent hover:bg-brand-accent/10",
        primary:
          "border-zinc-200 text-zinc-900 hover:border-brand-accent hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type SharedButtonProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  className?: string;
};

type ButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

type LinkButtonProps = SharedButtonProps & {
  href: string;
};

export const Button = ({
  children,
  className,
  href,
  variant,
  ...props
}: ButtonProps | LinkButtonProps) => {
  const resolvedClassName = buttonVariants({ className, variant });

  if (href) {
    return (
      <Link href={href} className={resolvedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={resolvedClassName} {...props}>
      {children}
    </button>
  );
};
