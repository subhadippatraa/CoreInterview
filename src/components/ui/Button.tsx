import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'ghost';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 cursor-pointer";
  const variants = {
    primary: "bg-[var(--color-accent)] text-white hover:bg-opacity-90 px-6 py-3",
    ghost: "bg-transparent border border-[var(--color-border2)] text-[var(--color-text)] hover:bg-[var(--color-bg3)] px-6 py-3"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
