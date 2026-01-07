import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  column: 'todo' | 'progress' | 'done';
}

export function CollaborateApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design homepage', column: 'todo' },
    { id: 2, title: 'Build API', column: 'progress' },
    { id: 3, title: 'Setup deployment', column: 'done' },
  ]);

  const addTask = (column: 'todo' | 'progress' | 'done') => {
    const title = prompt('Enter task title:');
    if (title) {
      setTasks([...tasks, { id: Date.now(), title, column }]);
    }
  };

  const moveTask = (taskId: number, newColumn: 'todo' | 'progress' | 'done') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, column: newColumn } : task
    ));
  };

  const columns: Array<{ id: 'todo' | 'progress' | 'done'; title: string; color: string }> = [
    { id: 'todo', title: 'To Do', color: 'var(--cyber-amber)' },
    { id: 'progress', title: 'In Progress', color: '#00d4ff' },
    { id: 'done', title: 'Done', color: 'var(--cyber-green)' },
  ];

  return (
    <div className="h-full overflow-auto p-6">
      <h2 className="text-xl mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        Kanban Board
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono flex items-center gap-2"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
                {column.title}
              </h3>
              <button
                onClick={() => addTask(column.id)}
                className="p-1 rounded hover:bg-opacity-10 hover:bg-white"
              >
                <Plus className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              </button>
            </div>

            <div className="space-y-2">
              {tasks
                .filter(task => task.column === column.id)
                .map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('taskId', String(task.id))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const draggedId = Number(e.dataTransfer.getData('taskId'));
                      moveTask(draggedId, column.id);
                    }}
                    className="p-3 rounded-lg border cursor-move"
                    style={{
                      backgroundColor: 'var(--cyber-dark-surface)',
                      borderColor: 'var(--cyber-border)',
                    }}
                  >
                    <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {task.title}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
