import { Server } from 'lucide-react';
import { useState, useEffect } from 'react';

// Generate 50 nodes with mostly healthy status
const generateNodes = () => {
  const nodes = [];
  for (let i = 0; i < 50; i++) {
    const random = Math.random();
    let status: 'healthy' | 'warning' | 'critical';
    
    if (random < 0.88) {
      status = 'healthy';
    } else if (random < 0.96) {
      status = 'warning';
    } else {
      status = 'critical';
    }
    
    nodes.push({
      id: `node-${i + 1}`,
      status,
      load: Math.floor(Math.random() * 100),
    });
  }
  return nodes;
};

export function NodeStatusHeatmap() {
  const [nodes, setNodes] = useState(generateNodes());

  // Simulate flickering critical nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        if (node.status === 'critical' && Math.random() > 0.5) {
          return { ...node, status: 'warning' as const };
        }
        if (node.status === 'warning' && Math.random() > 0.7) {
          return { ...node, status: 'critical' as const };
        }
        return node;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'var(--cyber-green)';
      case 'warning':
        return 'var(--cyber-amber)';
      case 'critical':
        return 'var(--cyber-red)';
      default:
        return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getNodeGlow = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'var(--cyber-green-glow)';
      case 'warning':
        return 'var(--cyber-amber-glow)';
      case 'critical':
        return 'var(--cyber-red-glow)';
      default:
        return 'none';
    }
  };

  const healthyCount = nodes.filter(n => n.status === 'healthy').length;
  const warningCount = nodes.filter(n => n.status === 'warning').length;
  const criticalCount = nodes.filter(n => n.status === 'critical').length;

  return (
    <div className="relative overflow-hidden rounded-xl border p-6"
         style={{
           backgroundColor: 'var(--cyber-dark-surface)',
           borderColor: 'var(--cyber-border)',
           backdropFilter: 'blur(20px)',
         }}>
      
      {/* Hexagonal Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
             backgroundSize: '60px 60px',
           }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Server className="w-5 h-5" style={{ color: 'var(--cyber-green)' }} />
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Node Status Heatmap
          </h3>
        </div>

        {/* Status Summary */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--cyber-green)' }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Healthy: {healthyCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--cyber-amber)' }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Warning: {warningCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm animate-pulse" style={{ backgroundColor: 'var(--cyber-red)' }} />
            <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Critical: {criticalCount}
            </span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-10 gap-2">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="aspect-square rounded border cursor-pointer transition-all hover:scale-110"
              style={{
                backgroundColor: getNodeColor(node.status),
                borderColor: 'var(--cyber-border)',
                boxShadow: node.status !== 'healthy' ? `0 0 8px ${getNodeGlow(node.status)}` : 'none',
                opacity: node.status === 'healthy' ? 0.7 : 1,
              }}
              title={`${node.id} - ${node.status} (${node.load}% load)`}
            />
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between"
             style={{ borderColor: 'var(--cyber-border)' }}>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Total Nodes: {nodes.length}
          </span>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Last updated: Just now
          </span>
        </div>
      </div>
    </div>
  );
}
