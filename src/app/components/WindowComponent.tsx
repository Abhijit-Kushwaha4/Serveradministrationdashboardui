
import { motion, useAnimation } from 'framer-motion';
import { useSmoothAnimation } from '../hooks/useSmoothAnimation';
import { Skeleton } from './ui/skeleton';
import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface WindowProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  layoutId: string; // For shared element transitions
}

export const WindowComponent: React.FC<WindowProps> = ({ children, title, isOpen, onClose, layoutId }) => {
  const controls = useAnimation();
  const animationProps = useSmoothAnimation();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading content
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      layoutId={layoutId}
      drag
      dragConstraints={{ left: 0, right: 800, top: 0, bottom: 500 }} // Example constraints
      dragMomentum={false}
      animate={controls}
      {...animationProps}
      className="absolute bg-cyber-dark-surface border border-cyber-border rounded-lg shadow-lg"
      style={{ willChange: 'transform' }} // GPU Offloading
    >
      <div className="p-2 bg-cyber-surface rounded-t-lg flex justify-between items-center cursor-move">
        <h3 className="font-bold text-sm">{title}</h3>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="p-1">
          <X className="w-4 h-4" />
        </motion.button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="w-full h-8 rounded-lg" />
            <Skeleton className="w-full h-24 rounded-lg" />
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
};
