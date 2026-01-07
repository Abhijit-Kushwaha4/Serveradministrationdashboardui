import { useState } from 'react';

export function ExcelGrid() {
  const [cells, setCells] = useState<{ [key: string]: string }>({});

  const rows = 10;
  const cols = 10;

  const handleCellChange = (row: number, col: number, value: string) => {
    setCells({ ...cells, [`${row}-${col}`]: value });
  };

  const getColumnLabel = (col: number) => String.fromCharCode(65 + col);

  return (
    <div className="h-full overflow-auto p-6">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="w-12 h-8 border text-xs font-mono"
                style={{
                  backgroundColor: 'var(--cyber-charcoal)',
                  borderColor: 'var(--cyber-border)',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
            </th>
            {Array.from({ length: cols }).map((_, col) => (
              <th key={col} className="w-24 h-8 border text-xs font-mono"
                  style={{
                    backgroundColor: 'var(--cyber-charcoal)',
                    borderColor: 'var(--cyber-border)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}>
                {getColumnLabel(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row}>
              <td className="w-12 h-8 border text-xs font-mono text-center"
                  style={{
                    backgroundColor: 'var(--cyber-charcoal)',
                    borderColor: 'var(--cyber-border)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}>
                {row + 1}
              </td>
              {Array.from({ length: cols }).map((_, col) => (
                <td key={col} className="border"
                    style={{ borderColor: 'var(--cyber-border)' }}>
                  <input
                    type="text"
                    value={cells[`${row}-${col}`] || ''}
                    onChange={(e) => handleCellChange(row, col, e.target.value)}
                    className="w-full h-8 px-2 outline-none font-mono text-xs"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
