import { Video } from 'lucide-react';

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
}

const emails: Email[] = [
  { id: 1, from: 'john@example.com', subject: 'Project Update', preview: 'Here is the latest update on...' },
  { id: 2, from: 'jane@example.com', subject: 'Meeting Tomorrow', preview: 'Don\'t forget about our meeting...' },
  { id: 3, from: 'team@example.com', subject: 'Weekly Report', preview: 'This week\'s metrics show...' },
];

export function MailCallApp() {
  return (
    <div className="h-full grid grid-cols-2">
      {/* Mail Inbox */}
      <div className="border-r overflow-auto" style={{ borderColor: 'var(--cyber-border)' }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--cyber-border)' }}>
          <h3 className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Inbox</h3>
        </div>
        <div>
          {emails.map((email) => (
            <div
              key={email.id}
              className="p-4 border-b hover:bg-opacity-5 hover:bg-white cursor-pointer"
              style={{ borderColor: 'var(--cyber-border)' }}
            >
              <div className="text-sm mb-1" style={{ color: 'var(--cyber-green)' }}>
                {email.from}
              </div>
              <div className="text-sm mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {email.subject}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {email.preview}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Call */}
      <div className="flex flex-col">
        <div className="p-4 border-b" style={{ borderColor: 'var(--cyber-border)' }}>
          <h3 className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Video Call</h3>
        </div>
        <div className="flex-1 flex items-center justify-center"
             style={{ backgroundColor: 'var(--cyber-obsidian)' }}>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                 style={{
                   backgroundColor: 'var(--cyber-dark-surface)',
                   border: '2px solid var(--cyber-border)',
                 }}>
              <Video className="w-12 h-12" style={{ color: 'var(--cyber-green)' }} />
            </div>
            <div className="text-sm font-mono mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              No active call
            </div>
            <button className="px-6 py-2 rounded-lg border font-mono text-sm"
                    style={{
                      backgroundColor: 'var(--cyber-green)',
                      borderColor: 'var(--cyber-green)',
                      color: 'var(--cyber-obsidian)',
                    }}>
              Start Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
