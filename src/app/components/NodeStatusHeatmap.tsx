import { Server } from 'lucide-react';
import { useState, useEffect } from 'react';

const NODE_COUNT = 50;

// Generate 50 nodes with a more realistic distribution
const generateNodes = () => {
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const load = Math.random() * 100;
    let status: 'healthy' | 'warning' | 'critical';

    if (load > 95) {
      status = 'critical';
    } else if (load > 80) {
      status = 'warning';
    } else {
      status = 'healthy';
    }

    return {
      id: `node-${i + 1}`,
      status,
      load,
      // Add a random delay for staggered animations
      animationDelay: `${Math.random() * 2}s`,
    };
  });
};

export function NodeStatusHeatmap() {
  const [nodes, setNodes] = useState(generateNodes());

  // Simulate more realistic load changes and status transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes => prevNodes.map(node => {
        let newLoad = node.load + (Math.random() - 0.5) * 15;
        newLoad = Math.max(0, Math.min(100, newLoad));

        let newStatus: 'healthy' | 'warning' | 'critical';
        if (newLoad > 95) {
          newStatus = 'critical';
        } else if (newLoad > 80) {
          newStatus = 'warning';
        } else {
          newStatus = 'healthy';
        }

        return { ...node, load: newLoad, status: newStatus };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'hsla(150, 100%, 40%, 0.7)';
      case 'warning': return 'hsla(45, 100%, 50%, 0.8)';
      case 'critical': return 'hsla(0, 100%, 50%, 0.9)';
      default: return 'hsla(0, 0%, 100%, 0.1)';
    }
  };

  const getNodeGlow = (status: string) => {
    switch (status) {
      case 'warning': return '0 0 10px hsla(45, 100%, 60%, 0.7)';
      case 'critical': return '0 0 12px hsla(0, 100%, 60%, 0.8)';
      default: return 'none';
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

        <div className="flex items-center gap-6 mb-4">
          {/* Status Summaries */}
        </div>

        <div className="grid grid-cols-10 gap-2">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="aspect-square rounded border cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: getNodeColor(node.status),
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: getNodeGlow(node.status),
                animation: node.status === 'critical' ? `pulse 1s infinite alternate` : 'none',
              }}
              title={`${node.id} - ${node.status} (${node.load.toFixed(0)}% load)`}
            />
          ))}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between"
             style={{ borderColor: 'var(--cyber-border)' }}>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Total Nodes: {NODE_COUNT}
          </span>
          <span className="text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Updating in real-time...
          </span>
        </div>
      </div>
       <style jsx>{`
        @keyframes pulse {
          from { box-shadow: ${getNodeGlow('critical')}; }
          to { box-shadow: 0 0 20px hsla(0, 100%, 50%, 1), 0 0 30px hsla(0, 100%, 50%, 0.7); }
        }
      `}</style>
    </div>
  );
}
