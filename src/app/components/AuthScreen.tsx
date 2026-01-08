import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, Mail, Eye, EyeOff, Cpu, Link2, Zap, Shield } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMultiEmail, setShowMultiEmail] = useState(false);
  const [additionalEmails, setAdditionalEmails] = useState(['', '', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const updateAdditionalEmail = (index: number, value: string) => {
    const newEmails = [...additionalEmails];
    newEmails[index] = value;
    setAdditionalEmails(newEmails);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: 'var(--cyber-obsidian)',
      }}
    >
      {/* Futuristic Animated Grid Background */}
      <div className="absolute inset-0">
        {/* Multiple Grid Layers */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid-main" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 255, 136, 0.3)" strokeWidth="0.5" />
              </pattern>
              <pattern id="grid-secondary" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 176, 32, 0.2)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-main)" />
            <rect width="100%" height="100%" fill="url(#grid-secondary)" />
          </svg>
        </motion.div>

        {/* Scanning Lines - Multiple Directions */}
        <motion.div
          className="absolute w-full h-1 left-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)',
            boxShadow: '0 0 30px var(--cyber-green), 0 0 60px var(--cyber-green)',
            filter: 'blur(2px)',
          }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute h-full w-1 top-0"
          style={{
            background: 'linear-gradient(180deg, transparent, var(--cyber-amber), transparent)',
            boxShadow: '0 0 30px var(--cyber-amber), 0 0 60px var(--cyber-amber)',
            filter: 'blur(2px)',
          }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }}
        />

        {/* Animated Glowing Orbs - More Dynamic */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(0, 255, 136, 0.15)' : 
                i % 3 === 1 ? 'rgba(255, 176, 32, 0.1)' : 
                'rgba(0, 212, 255, 0.12)'
              } 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: i % 3 === 0 ? 'var(--cyber-green)' : i % 3 === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)',
              boxShadow: `0 0 ${Math.random() * 20 + 10}px ${i % 3 === 0 ? 'var(--cyber-green)' : i % 3 === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)'}`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -200 - 100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Holographic Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)',
              boxShadow: '0 0 10px var(--cyber-green)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Main Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo & Title with Holographic Effect */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 relative"
            style={{
              background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber), var(--cyber-blue))',
              boxShadow: '0 0 60px var(--cyber-green-glow)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu className="w-12 h-12 text-black" />
            </motion.div>
            
            {/* Orbiting Elements */}
            {[0, 120, 240].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 6 - i, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: 'center' }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: i === 0 ? 'var(--cyber-green)' : i === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)',
                    boxShadow: `0 0 15px ${i === 0 ? 'var(--cyber-green)' : i === 1 ? 'var(--cyber-amber)' : 'var(--cyber-blue)'}`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-bold mb-3 relative"
          >
            <motion.span
              style={{
                background: 'linear-gradient(135deg, var(--cyber-green), var(--cyber-amber), var(--cyber-blue))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              H&K Workspace
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-4 h-4" style={{ color: 'var(--cyber-green)' }} />
            </motion.div>
            <span className="text-gray-400">Neural Interface System v2.0</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Zap className="w-4 h-4" style={{ color: 'var(--cyber-amber)' }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Auth Form Card with Holographic Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-3xl p-8 border-2 backdrop-blur-xl relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(26, 26, 36, 0.85)',
            borderColor: 'transparent',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 255, 136, 0.1)',
          }}
        >
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(45deg, var(--cyber-green), var(--cyber-amber), var(--cyber-blue), var(--cyber-green))',
              backgroundSize: '300% 300%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div
            className="absolute inset-[2px] rounded-3xl"
            style={{ backgroundColor: 'rgba(26, 26, 36, 0.95)' }}
          />

          <div className="relative z-10">
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6 p-1 rounded-xl backdrop-blur-sm" style={{ backgroundColor: 'rgba(10, 10, 15, 0.8)' }}>
              <motion.button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setShowMultiEmail(false);
                }}
                className="flex-1 py-3 px-4 rounded-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: isLogin ? 'var(--cyber-green)' : 'transparent',
                  color: isLogin ? 'black' : 'var(--cyber-green)',
                  fontWeight: isLogin ? '700' : '400',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin && (
                  <motion.div
                    layoutId="activeToggle"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundColor: 'var(--cyber-green)',
                      boxShadow: '0 0 30px var(--cyber-green)',
                    }}
                  />
                )}
                <span className="relative z-10">Login</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsLogin(false)}
                className="flex-1 py-3 px-4 rounded-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundColor: !isLogin ? 'var(--cyber-green)' : 'transparent',
                  color: !isLogin ? 'black' : 'var(--cyber-green)',
                  fontWeight: !isLogin ? '700' : '400',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {!isLogin && (
                  <motion.div
                    layoutId="activeToggle"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundColor: 'var(--cyber-green)',
                      boxShadow: '0 0 30px var(--cyber-green)',
                    }}
                  />
                )}
                <span className="relative z-10">Sign Up</span>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field (Sign Up only) */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--cyber-green)' }}>
                      Username
                    </label>
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                    >
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <motion.input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all relative"
                        style={{
                          backgroundColor: 'rgba(10, 10, 15, 0.6)',
                          borderColor: 'rgba(0, 255, 136, 0.2)',
                          color: 'white',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'var(--cyber-green)';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        whileFocus={{ scale: 1.02 }}
                      />
                      {/* Animated Border Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)',
                          opacity: 0,
                        }}
                        animate={{
                          x: ['-100%', '100%'],
                          opacity: [0, 0.1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field with Connect Button */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium" style={{ color: 'var(--cyber-green)' }}>
                    {!isLogin ? 'Primary Email' : 'Email'}
                  </label>
                  {!isLogin && (
                    <motion.button
                      type="button"
                      onClick={() => setShowMultiEmail(!showMultiEmail)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        backgroundColor: showMultiEmail ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 255, 136, 0.1)',
                        color: 'var(--cyber-green)',
                        border: `1px solid ${showMultiEmail ? 'var(--cyber-green)' : 'rgba(0, 255, 136, 0.3)'}`,
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      {showMultiEmail ? 'Connected' : 'Connect'}
                    </motion.button>
                  )}
                </div>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                >
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                    style={{
                      backgroundColor: 'rgba(10, 10, 15, 0.6)',
                      borderColor: 'rgba(0, 255, 136, 0.2)',
                      color: 'white',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--cyber-green)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </motion.div>
              </div>

              {/* Additional Emails Slots */}
              <AnimatePresence>
                {!isLogin && showMultiEmail && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <motion.div
                        className="h-px flex-1"
                        style={{ backgroundColor: 'rgba(0, 255, 136, 0.3)' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <span>Additional Emails (Same Password)</span>
                      <motion.div
                        className="h-px flex-1"
                        style={{ backgroundColor: 'rgba(0, 255, 136, 0.3)' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    
                    {additionalEmails.map((emailVal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                        whileHover={{ scale: 1.01 }}
                      >
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          value={emailVal}
                          onChange={(e) => updateAdditionalEmail(index, e.target.value)}
                          placeholder={`Additional email ${index + 1}`}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all text-sm"
                          style={{
                            backgroundColor: 'rgba(10, 10, 15, 0.5)',
                            borderColor: 'rgba(255, 176, 32, 0.2)',
                            color: 'white',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--cyber-amber)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 176, 32, 0.3)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 176, 32, 0.2)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                        <motion.div
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--cyber-amber)' }}
                          animate={{
                            boxShadow: ['0 0 5px var(--cyber-amber)', '0 0 15px var(--cyber-amber)', '0 0 5px var(--cyber-amber)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password Field */}
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--cyber-green)' }}>
                  Password
                </label>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.01 }}
                >
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                    style={{
                      backgroundColor: 'rgba(10, 10, 15, 0.6)',
                      borderColor: 'rgba(0, 255, 136, 0.2)',
                      color: 'white',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--cyber-green)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </motion.button>
                </motion.div>
              </div>

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    className="text-sm hover:underline transition-colors"
                    style={{ color: 'var(--cyber-green)' }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    Forgot Password?
                  </motion.button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden text-lg"
                style={{
                  backgroundColor: 'var(--cyber-green)',
                  color: 'black',
                  boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)',
                }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 0 60px rgba(0, 255, 136, 0.6)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <motion.div
                        className="w-6 h-6 border-3 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      <span>Authenticating...</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {isLogin ? '⚡ Access System' : '🚀 Create Account'}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Animated Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.button>
            </form>

            {/* Footer Text */}
            <motion.div 
              className="mt-6 text-center text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setShowMultiEmail(false);
                  }}
                  className="font-semibold hover:underline"
                  style={{ color: 'var(--cyber-green)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </motion.button>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border"
            style={{
              backgroundColor: 'rgba(0, 255, 136, 0.05)',
              borderColor: 'rgba(0, 255, 136, 0.3)',
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 255, 136, 0.2)',
                '0 0 40px rgba(0, 255, 136, 0.4)',
                '0 0 20px rgba(0, 255, 136, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Shield className="w-4 h-4" style={{ color: 'var(--cyber-green)' }} />
            </motion.div>
            <span className="text-xs" style={{ color: 'var(--cyber-green)' }}>
              Secured by Neural Encryption Protocol
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}