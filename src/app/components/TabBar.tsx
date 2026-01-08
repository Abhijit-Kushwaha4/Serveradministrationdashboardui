import { motion } from 'motion/react';
import { X } from 'lucide-react';

export interface Tab {
  id: string;
  name: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string | null;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export function TabBar({ tabs, activeTab, onTabChange, onTabClose }: TabBarProps) {
  if (tabs.length === 0) return null;

  return (
    <div
      className="flex items-center gap-1 px-2 md:px-4 py-1.5 md:py-2 border-b overflow-x-auto backdrop-blur-sm relative scrollbar-thin"
      style={{
        backgroundColor: 'rgba(19, 19, 26, 0.95)',
        borderColor: 'var(--cyber-border)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(0, 255, 136, 0.05)',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--cyber-border) transparent',
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(90deg, var(--cyber-green), var(--cyber-amber), var(--cyber-blue), var(--cyber-green))',
          backgroundSize: '300% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab;
        return (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-t-xl cursor-pointer group relative min-w-fit transition-all"
            style={{
              backgroundColor: isActive ? 'rgba(26, 26, 36, 0.9)' : 'transparent',
              borderTop: isActive ? '2px solid var(--cyber-green)' : '2px solid transparent',
            }}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active Indicator with Enhanced Glow */}
            {isActive && (
              <>
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    backgroundColor: 'rgba(0, 255, 136, 0.08)',
                    border: '1px solid var(--cyber-green)',
                    borderBottom: 'none',
                    boxShadow: '0 0 30px rgba(0, 255, 136, 0.3), inset 0 0 30px rgba(0, 255, 136, 0.1)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
                
                {/* Pulsing Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    background: 'radial-gradient(circle at center top, rgba(0, 255, 136, 0.2), transparent)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </>
            )}

            {/* Tab Content */}
            <span
              className="relative z-10 text-sm whitespace-nowrap transition-colors"
              style={{
                color: isActive ? 'var(--cyber-green)' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {tab.name}
            </span>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="relative z-10 p-1 rounded hover:bg-opacity-20 transition-all opacity-0 group-hover:opacity-100"
              style={{
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 23, 68, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X className="w-3 h-3" style={{ color: 'var(--cyber-red)' }} />
            </button>

            {/* Glow Effect on Active */}
            {isActive && (
              <div
                className="absolute -bottom-1 left-0 right-0 h-1 blur-sm"
                style={{
                  backgroundColor: 'var(--cyber-green)',
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}