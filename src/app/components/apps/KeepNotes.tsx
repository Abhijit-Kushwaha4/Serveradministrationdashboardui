import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Note {
  id: number;
  content: string;
  color: string;
}

const colors = ['#ffeb3b', '#00ffff', '#ff4081', '#76ff03'];

export function KeepNotes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'Click to edit this note', color: colors[0] },
    { id: 2, content: 'Another sticky note', color: colors[1] },
  ]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      content: 'New note',
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: number, content: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content } : note));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="h-full overflow-auto p-6">
      <button
        onClick={addNote}
        className="mb-6 px-4 py-2 rounded-lg border flex items-center gap-2 font-mono text-sm"
        style={{
          backgroundColor: 'var(--cyber-green)',
          borderColor: 'var(--cyber-green)',
          color: 'var(--cyber-obsidian)',
        }}>
        <Plus className="w-4 h-4" />
        New Note
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-lg shadow-lg"
            style={{ backgroundColor: note.color }}
            onDoubleClick={() => deleteNote(note.id)}
          >
            <textarea
              value={note.content}
              onChange={(e) => updateNote(note.id, e.target.value)}
              className="w-full h-32 bg-transparent outline-none resize-none text-black"
              style={{ color: '#000' }}
            />
            <div className="text-xs mt-2 opacity-50" style={{ color: '#000' }}>
              Double-click to delete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
