import { SystemHealthCard } from '../SystemHealthCard';
import { CPUMemoryChart } from '../CPUMemoryChart';
import { NodeStatusHeatmap } from '../NodeStatusHeatmap';
import { LiveEventLog } from '../LiveEventLog';

export function DataCenter() {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <SystemHealthCard />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <CPUMemoryChart />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <NodeStatusHeatmap />
          <LiveEventLog />
        </div>
      </div>
    </div>
  );
}
