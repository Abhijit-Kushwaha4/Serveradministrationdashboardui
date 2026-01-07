import { useState } from 'react';

interface Component {
  id: number;
  type: 'button';
  x: number;
  y: number;
}

export function UIDesigner() {
  const [components, setComponents] = useState<Component[]>([]);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const addButton = () => {
    setComponents([...components, {
      id: Date.now(),
      type: 'button',
      x: 100,
      y: 100,
    }]);
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDrag = (e: React.DragEvent, id: number) => {
    if (draggedId !== id) return;
    
    const canvas = e.currentTarget.parentElement;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - 50;
    const y = e.clientY - rect.top - 20;
    
    setComponents(components.map(c => 
      c.id === id ? { ...c, x, y } : c
    ));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b" style={{ borderColor: 'var(--cyber-border)' }}>
        <button
          onClick={addButton}
          className="px-4 py-2 rounded-lg border font-mono text-sm"
          style={{
            backgroundColor: 'var(--cyber-green)',
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-obsidian)',
          }}>
          Add Button
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, var(--cyber-border) 19px, var(--cyber-border) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, var(--cyber-border) 19px, var(--cyber-border) 20px)',
             backgroundColor: 'var(--cyber-dark-surface)',
           }}>
        {components.map((comp) => (
          <div
            key={comp.id}
            draggable
            onDragStart={() => handleDragStart(comp.id)}
            onDrag={(e) => handleDrag(e, comp.id)}
            className="absolute px-4 py-2 rounded border cursor-move font-mono text-sm"
            style={{
              left: comp.x,
              top: comp.y,
              backgroundColor: 'var(--cyber-green)',
              borderColor: 'var(--cyber-green)',
              color: 'var(--cyber-obsidian)',
            }}>
            Button {comp.id}
          </div>
        ))}
      </div>
    </div>
  );
}
