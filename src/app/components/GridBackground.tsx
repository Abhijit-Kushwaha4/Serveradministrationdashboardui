import { motion } from 'framer-motion';
import { Sparkles, Zap, Cpu, Layers, Box, Globe, Database } from 'lucide-react';

export function GridBackground() {
  return (
    <div className="h-full w-full relative overflow-hidden flex items-center justify-center">
      {/* Multiple Animated Grid Layers */}
      <div className="absolute inset-0">
        {/* Primary Grid with Pulse */}
        <motion.svg 
          width="100%" 
          height="100%" 
          className="opacity-30"
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <defs>
            <pattern id="cyber-grid-1" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0, 255, 136, 0.4)" strokeWidth="0.5" />
            </pattern>
            <pattern id="cyber-grid-2" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 176, 32, 0.3)" strokeWidth="1" />
            </pattern>
            <pattern id="cyber-grid-3" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid-1)" />
          <rect width="100%" height="100%" fill="url(#cyber-grid-2)" />
          <rect width="100%" height="100%" fill="url(#cyber-grid-3)" />
        </motion.svg>

        {/* Multiple Scanning Lines */}
        <motion.div
          className="absolute w-full h-1 left-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--cyber-green), var(--cyber-green), transparent)',
            boxShadow: '0 0 30px var(--cyber-green), 0 0 60px var(--cyber-green)',
            filter: 'blur(2px)',
          }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-full h-1 left-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--cyber-amber), var(--cyber-amber), transparent)',
            boxShadow: '0 0 30px var(--cyber-amber), 0 0 60px var(--cyber-amber)',
            filter: 'blur(2px)',
          }}
          animate={{ top: ['100%', '0%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 2 }}
        />
        <motion.div
          className="absolute h-full w-1 top-0"
          style={{
            background: 'linear-gradient(180deg, transparent, var(--cyber-blue), var(--cyber-blue), transparent)',
            boxShadow: '0 0 30px var(--cyber-blue), 0 0 60px var(--cyber-blue)',
            filter: 'blur(2px)',
          }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </div>

      {/* Floating Particles - Enhanced */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            backgroundColor: 
              i % 4 === 0 ? 'var(--cyber-green)' : 
              i % 4 === 1 ? 'var(--cyber-amber)' : 
              i % 4 === 2 ? 'var(--cyber-red)' :
              'var(--cyber-blue)',
            boxShadow: `0 0 ${Math.random() * 20 + 10}px ${
              i % 4 === 0 ? 'var(--cyber-green)' : 
              i % 4 === 1 ? 'var(--cyber-amber)' : 
              i % 4 === 2 ? 'var(--cyber-red)' :
              'var(--cyber-blue)'
            }`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -200 - 100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Floating Holographic Lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`holo-${i}`}
          className="absolute h-px"
          style={{
            width: `${Math.random() * 400 + 200}px`,
            background: `linear-gradient(90deg, transparent, ${
              i % 3 === 0 ? 'var(--cyber-green)' : i % 3 === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)'
            }, transparent)`,
            boxShadow: `0 0 15px ${
              i % 3 === 0 ? 'var(--cyber-green)' : i % 3 === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)'
            }`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.6,
          }}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Pulsing Energy Orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            background: `radial-gradient(circle, ${
              i % 3 === 0 ? 'rgba(0, 255, 136, 0.1)' : 
              i % 3 === 1 ? 'rgba(255, 176, 32, 0.08)' : 
              'rgba(0, 212, 255, 0.09)'
            } 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Center Content */}
      <div className="relative z-10 text-center space-y-10 max-w-4xl px-8">
        {/* Animated Icon Complex */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Main Center Icon */}
            <div
              className="relative inline-flex items-center justify-center w-40 h-40 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber), var(--cyber-blue))',
                boxShadow: '0 0 80px rgba(0, 255, 136, 0.5), 0 0 120px rgba(255, 176, 32, 0.3)',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <Cpu className="w-20 h-20 text-black" />
              </motion.div>

              {/* Animated Rings */}
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-3xl border-2"
                  style={{
                    borderColor: ring === 0 ? 'var(--cyber-green)' : ring === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)',
                    borderStyle: 'dashed',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: ring * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Orbiting Icons */}
            {[
              { Icon: Sparkles, color: 'var(--cyber-green)', angle: 0 },
              { Icon: Zap, color: 'var(--cyber-amber)', angle: 60 },
              { Icon: Layers, color: 'var(--cyber-blue)', angle: 120 },
              { Icon: Box, color: 'var(--cyber-green)', angle: 180 },
              { Icon: Globe, color: 'var(--cyber-amber)', angle: 240 },
              { Icon: Database, color: 'var(--cyber-blue)', angle: 300 },
            ].map(({ Icon, color, angle }, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: '280px',
                  height: '280px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-140px',
                  marginTop: '-140px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12 - i * 0.5, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(26, 26, 36, 0.9)',
                    border: `2px solid ${color}`,
                    boxShadow: `0 0 30px ${color}`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${color}`,
                      `0 0 40px ${color}`,
                      `0 0 20px ${color}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-6xl font-bold"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              background: 'linear-gradient(90deg, var(--cyber-green), var(--cyber-amber), var(--cyber-blue), var(--cyber-green))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to H&K Workspace
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu className="w-6 h-6" style={{ color: 'var(--cyber-green)' }} />
            </motion.div>
            <p className="text-2xl font-semibold" style={{ color: 'var(--cyber-green)' }}>
              Neural Interface System v2.0
            </p>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6" style={{ color: 'var(--cyber-amber)' }} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Instruction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center"
        >
          <motion.div
            className="px-8 py-5 rounded-2xl border-2 backdrop-blur-xl relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(0, 255, 136, 0.05)',
              borderColor: 'var(--cyber-green)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 60px rgba(0, 255, 136, 0.4)',
            }}
            animate={{
              boxShadow: [
                '0 0 30px rgba(0, 255, 136, 0.2)',
                '0 0 50px rgba(0, 255, 136, 0.4)',
                '0 0 30px rgba(0, 255, 136, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <p className="text-xl font-semibold relative z-10" style={{ color: 'var(--cyber-green)' }}>
              ← Select a tool from the sidebar to begin your journey
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Grid with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-3 gap-8 mt-12 max-w-3xl mx-auto"
        >
          {[
            { value: '25', label: 'Tools Available', color: 'var(--cyber-green)', delay: 0 },
            { value: '4', label: 'Suites', color: 'var(--cyber-amber)', delay: 0.2 },
            { value: '∞', label: 'Possibilities', color: 'var(--cyber-red)', delay: 0.4 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden"
              style={{
                backgroundColor: 'rgba(26, 26, 36, 0.6)',
                borderColor: stat.color,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + stat.delay }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 0 40px ${stat.color}`,
              }}
            >
              <motion.div
                className="text-5xl font-bold mb-2"
                style={{ color: stat.color }}
                animate={{
                  textShadow: [
                    `0 0 10px ${stat.color}`,
                    `0 0 30px ${stat.color}`,
                    `0 0 10px ${stat.color}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: stat.delay }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: stat.color }} />
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: stat.color }} />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: stat.color }} />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: stat.color }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          {[
            { name: 'AI Suite', color: 'var(--cyber-green)' },
            { name: 'Office Suite', color: 'var(--cyber-amber)' },
            { name: 'Creative Suite', color: 'var(--cyber-blue)' },
            { name: 'Dev & Utilities', color: 'var(--cyber-red)' },
          ].map((tag, i) => (
            <motion.div
              key={tag.name}
              className="px-6 py-3 rounded-full text-sm font-semibold border-2 backdrop-blur-sm relative overflow-hidden"
              style={{
                backgroundColor: 'rgba(26, 26, 36, 0.7)',
                borderColor: tag.color,
                color: tag.color,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7 + i * 0.1, type: 'spring' }}
              whileHover={{
                scale: 1.15,
                boxShadow: `0 0 30px ${tag.color}`,
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: `linear-gradient(90deg, transparent, ${tag.color}, transparent)`, opacity: 0.2 }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10">{tag.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Corner Decorations with Animation */}
      {[
        { pos: 'top-0 left-0', border: 'border-l-2 border-t-2', color: 'var(--cyber-green)' },
        { pos: 'top-0 right-0', border: 'border-r-2 border-t-2', color: 'var(--cyber-amber)' },
        { pos: 'bottom-0 left-0', border: 'border-l-2 border-b-2', color: 'var(--cyber-amber)' },
        { pos: 'bottom-0 right-0', border: 'border-r-2 border-b-2', color: 'var(--cyber-red)' },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.pos} w-40 h-40 ${corner.border}`}
          style={{ borderColor: corner.color }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: 1,
          }}
          transition={{ 
            opacity: { duration: 2, repeat: Infinity, delay: i * 0.3 },
            scale: { delay: 0.5 + i * 0.2 }
          }}
        />
      ))}

      {/* Glowing Corner Dots */}
      {[
        { pos: 'top-4 left-4', color: 'var(--cyber-green)' },
        { pos: 'top-4 right-4', color: 'var(--cyber-amber)' },
        { pos: 'bottom-4 left-4', color: 'var(--cyber-amber)' },
        { pos: 'bottom-4 right-4', color: 'var(--cyber-red)' },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className={`absolute ${dot.pos} w-3 h-3 rounded-full`}
          style={{ backgroundColor: dot.color }}
          animate={{
            boxShadow: [
              `0 0 10px ${dot.color}`,
              `0 0 30px ${dot.color}`,
              `0 0 10px ${dot.color}`,
            ],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}
