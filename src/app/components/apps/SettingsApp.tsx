import { useState } from 'react';

interface Setting {
  id: string;
  label: string;
  enabled: boolean;
}

export function SettingsApp() {
  const [settings, setSettings] = useState<Setting[]>([
    { id: 'dark', label: 'Dark Mode', enabled: true },
    { id: 'notifications', label: 'Notifications', enabled: true },
    { id: 'sound', label: 'Sound', enabled: false },
    { id: 'autosave', label: 'Auto Save', enabled: true },
    { id: 'analytics', label: 'Analytics', enabled: false },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <div className="h-full overflow-auto p-8">
      <h2 className="text-2xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        Settings
      </h2>

      <div className="max-w-2xl space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
            }}
          >
            <span className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              {setting.label}
            </span>
            
            <button
              onClick={() => toggleSetting(setting.id)}
              className="relative w-12 h-6 rounded-full transition-all"
              style={{
                backgroundColor: setting.enabled ? 'var(--cyber-green)' : 'var(--cyber-border)',
              }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full transition-all"
                style={{
                  left: setting.enabled ? 'calc(100% - 20px)' : '4px',
                  backgroundColor: 'var(--cyber-obsidian)',
                }}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button className="px-6 py-3 rounded-lg border font-mono"
                style={{
                  backgroundColor: 'var(--cyber-green)',
                  borderColor: 'var(--cyber-green)',
                  color: 'var(--cyber-obsidian)',
                }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
