
import { motion, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';
import { useIsMobile } from './ui/use-mobile';

interface WindowProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  layoutId: string; // For shared element transitions
}

export const WindowComponent: React.FC<WindowProps> = ({ children, title, isOpen, onClose, layoutId }) => {
  const dragControls = useDragControls();
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <motion.div
      layoutId={layoutId}
      drag={!isMobile}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      className="absolute bg-cyber-dark-surface border border-cyber-border rounded-lg shadow-lg"
    >
      <div
        onPointerDown={(event) => !isMobile && dragControls.start(event)}
        className={`p-2 bg-cyber-surface rounded-t-lg flex justify-between items-center ${!isMobile ? 'cursor-move' : ''}`}>
        <h3 className="font-bold text-sm">{title}</h3>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="p-1">
          <X className="w-4 h-4" />
        </motion.button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};
