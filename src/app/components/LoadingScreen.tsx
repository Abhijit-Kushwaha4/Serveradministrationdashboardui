import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'var(--cyber-obsidian)',
      }}
    >
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <motion.div
          className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber))',
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(0, 255, 136, 0.3)',
              '0 0 60px rgba(0, 255, 136, 0.6)',
              '0 0 20px rgba(0, 255, 136, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-16 h-16 rounded-xl"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2
            className="text-2xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Initializing System
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--cyber-green)' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div
          className="w-64 h-1 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--cyber-green), var(--cyber-amber))',
              boxShadow: '0 0 10px var(--cyber-green)',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
}
