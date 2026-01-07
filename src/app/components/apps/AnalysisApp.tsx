import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const barData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
];

const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
];

const COLORS = ['var(--cyber-green)', 'var(--cyber-amber)', '#00d4ff'];

export function AnalysisApp() {
  return (
    <div className="h-full overflow-auto p-6">
      <h2 className="text-xl mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        Data Analysis
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-6 rounded-lg border"
             style={{
               backgroundColor: 'var(--cyber-dark-surface)',
               borderColor: 'var(--cyber-border)',
             }}>
          <h3 className="text-sm mb-4 font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Monthly Revenue
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255, 255, 255, 0.3)"
                  style={{ fontSize: '0.75rem' }}
                />
                <YAxis 
                  stroke="rgba(255, 255, 255, 0.3)"
                  style={{ fontSize: '0.75rem' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--cyber-charcoal)',
                    border: '1px solid var(--cyber-border)',
                  }}
                />
                <Bar dataKey="value" fill="var(--cyber-green)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-6 rounded-lg border"
             style={{
               backgroundColor: 'var(--cyber-dark-surface)',
               borderColor: 'var(--cyber-border)',
             }}>
          <h3 className="text-sm mb-4 font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Traffic Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--cyber-charcoal)',
                    border: '1px solid var(--cyber-border)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
