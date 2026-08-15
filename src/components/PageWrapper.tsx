import { motion } from 'framer-motion';
import { pageVariants } from '@/lib/motionVariants';
import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * Wraps every page in a Framer Motion div for AnimatePresence transitions.
 */
export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
