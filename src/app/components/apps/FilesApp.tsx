import { useState } from 'react';
import { Folder, ChevronRight, ChevronDown, File } from 'lucide-react';

interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

const fileTree: TreeNode = {
  name: 'My PC',
  type: 'folder',
  children: [
    {
      name: 'Documents',
      type: 'folder',
      children: [
        {
          name: 'Projects',
          type: 'folder',
          children: [
            { name: 'project1.txt', type: 'file' },
            { name: 'project2.txt', type: 'file' },
          ],
        },
        { name: 'notes.txt', type: 'file' },
      ],
    },
    {
      name: 'Downloads',
      type: 'folder',
      children: [
        { name: 'image.png', type: 'file' },
      ],
    },
  ],
};

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(depth === 0);

  return (
    <div>
      <div
        onClick={() => node.type === 'folder' && setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-opacity-5 hover:bg-white cursor-pointer rounded"
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {node.type === 'folder' && (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            ) : (
              <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            )}
          </>
        )}
        {node.type === 'folder' ? (
          <Folder className="w-4 h-4" style={{ color: 'var(--cyber-amber)' }} />
        ) : (
          <File className="w-4 h-4 ml-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
        )}
        <span className="text-sm font-mono" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          {node.name}
        </span>
      </div>
      
      {isExpanded && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FilesApp() {
  return (
    <div className="h-full overflow-auto p-6">
      <h2 className="text-lg mb-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
        File Explorer
      </h2>
      <TreeItem node={fileTree} />
    </div>
  );
}
