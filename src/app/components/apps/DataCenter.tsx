import { SystemHealthCard } from '../SystemHealthCard';
import { CPUMemoryChart } from '../CPUMemoryChart';
import { NodeStatusHeatmap } from '../NodeStatusHeatmap';
import { LiveEventLog } from '../LiveEventLog';

export function DataCenter() {
  return (
    <div className="h-full overflow-auto p-6 bg-cyber-obsidian text-white">
      <div className="grid grid-cols-3 grid-rows-3 gap-6 h-full">
        {/* Row 1 */}
        <div className="col-span-1 row-span-1">
          <SystemHealthCard />
        </div>
        <div className="col-span-2 row-span-1">
          <NodeStatusHeatmap />
        </div>

        {/* Row 2 & 3 */}
        <div className="col-span-3 row-span-2">
          <CPUMemoryChart />
        </div>

        {/* Row 4 */}
        <div className="col-span-3 row-span-1">
          <LiveEventLog />
        </div>
      </div>
    </div>
  );
}
