import { motion } from 'motion/react';
import { Shield, Lock, Key, Settings, Code, Globe, Search, Wifi, Bug } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onToolClick: (tool: string) => void;
}

export function TopBar({ onToolClick }: TopBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [vpnActive, setVpnActive] = useState(false);
  const [firewallActive, setFirewallActive] = useState(true);
  const [encryptionActive, setEncryptionActive] = useState(true);

  const developerTools = [
    { id: 'vpn', icon: Wifi, label: 'VPN', active: vpnActive, toggle: () => setVpnActive(!vpnActive) },
    { id: 'firewall', icon: Shield, label: 'Firewall', active: firewallActive, toggle: () => setFirewallActive(!firewallActive) },
    { id: 'encryption', icon: Lock, label: 'Encryption', active: encryptionActive, toggle: () => setEncryptionActive(!encryptionActive) },
    { id: 'settings', icon: Settings, label: 'Settings', active: false },
    { id: 'inspect', icon: Code, label: 'Code Inspect', active: false },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onToolClick('browser');
      // In a real app, you would pass the search query to the browser
    }
  };

  return (
    <div
      className="h-14 md:h-16 flex items-center justify-between px-3 md:px-6 border-b backdrop-blur-xl relative overflow-hidden"
      style={{
        backgroundColor: 'rgba(19, 19, 26, 0.95)',
        borderColor: 'var(--cyber-border)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 -1px 0 rgba(0, 255, 136, 0.05)',
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'linear-gradient(90deg, var(--cyber-green), var(--cyber-amber), var(--cyber-blue), var(--cyber-green))',
          backgroundSize: '400% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Left Section - Developer Tools */}
      <div className="flex items-center gap-2 md:gap-3 relative z-10">
        <div className="hidden md:flex items-center gap-2 mr-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--cyber-green)' }}
            animate={{
              boxShadow: [
                '0 0 10px var(--cyber-green)',
                '0 0 20px var(--cyber-green)',
                '0 0 10px var(--cyber-green)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-semibold" style={{ color: 'var(--cyber-green)' }}>
            DEV TOOLS
          </span>
        </div>

        {developerTools.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.active !== undefined ? tool.active : false;
          
          return (
            <motion.button
              key={tool.id}
              onClick={() => {
                if (tool.toggle) {
                  tool.toggle();
                } else {
                  onToolClick(tool.id);
                }
              }}
              className="group relative p-2 md:p-2.5 rounded-lg transition-all"
              style={{
                backgroundColor: isActive ? 'rgba(0, 255, 136, 0.15)' : 'rgba(26, 26, 36, 0.8)',
                border: `1px solid ${isActive ? 'var(--cyber-green)' : 'rgba(0, 255, 136, 0.2)'}`,
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: isActive ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 255, 136, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                className="w-4 h-4 md:w-5 md:h-5" 
                style={{ 
                  color: isActive ? 'var(--cyber-green)' : 'var(--cyber-blue)' 
                }} 
              />
              
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--cyber-green)' }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              {/* Tooltip */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-xs font-medium"
                   style={{
                     backgroundColor: 'rgba(26, 26, 36, 0.95)',
                     border: '1px solid var(--cyber-green)',
                     color: 'var(--cyber-green)',
                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                   }}>
                {tool.label}
                {tool.active !== undefined && (
                  <span className="ml-2 text-[10px]">
                    ({isActive ? 'ON' : 'OFF'})
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Center/Right Section - Search Browser */}
      <div className="flex-1 max-w-md md:max-w-2xl ml-2 md:ml-6 relative z-10">
        <form onSubmit={handleSearch} className="relative">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search or enter URL..."
                className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-2.5 rounded-xl border-2 focus:outline-none transition-all text-sm md:text-base"
                style={{
                  backgroundColor: 'rgba(10, 10, 15, 0.8)',
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                  color: 'white',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--cyber-blue)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <motion.button
                type="button"
                onClick={() => onToolClick('browser')}
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-lg"
                style={{
                  backgroundColor: 'rgba(0, 212, 255, 0.15)',
                  border: '1px solid var(--cyber-blue)',
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'rgba(0, 212, 255, 0.25)',
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Globe className="w-3 h-3 md:w-4 md:h-4" style={{ color: 'var(--cyber-blue)' }} />
              </motion.button>

              {/* Animated Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, var(--cyber-blue), transparent)',
                  opacity: 0,
                }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </div>
          </motion.div>
        </form>
      </div>

      {/* Right Section - System Status (Mobile: Hidden or Compact) */}
      <div className="hidden lg:flex items-center gap-3 ml-4 relative z-10">
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
          }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 255, 136, 0.2)',
              '0 0 20px rgba(0, 255, 136, 0.3)',
              '0 0 10px rgba(0, 255, 136, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--cyber-green)' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-semibold" style={{ color: 'var(--cyber-green)' }}>
            SECURE
          </span>
        </motion.div>
      </div>
    </div>
  );
}
