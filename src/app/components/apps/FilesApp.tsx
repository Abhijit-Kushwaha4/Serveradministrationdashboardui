
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { getIconForFile } from './files-utils';
import { list_files, read_file, delete_file, write_file } from '../../../default_api';

interface TreeNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

interface SelectedFile {
  path: string;
  content: string;
}

const buildTree = (files: string[]): TreeNode => {
    const root: TreeNode = { name: 'Project Files', path: '.', type: 'folder', children: [] };
    const nodeMap: { [key: string]: TreeNode } = { '.': root };

    // Sort files to ensure parent directories are created before their children
    const sortedFiles = [...files].sort((a, b) => a.localeCompare(b));

    sortedFiles.forEach(path => {
        const parts = path.split('/');
        let currentPath = '';
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const oldPath = currentPath;
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            
            const isFile = i === parts.length - 1 && !path.endsWith('/');

            if (!nodeMap[currentPath]) {
                const parentNode = nodeMap[oldPath] || root;
                const newNode: TreeNode = {
                    name: part,
                    path: currentPath,
                    type: isFile ? 'file' : 'folder',
                    children: isFile ? undefined : [],
                };
                
                if (parentNode.children) {
                    parentNode.children.push(newNode);
                     parentNode.children.sort((a, b) => {
                        if (a.type === 'folder' && b.type === 'file') return -1;
                        if (a.type === 'file' && b.type === 'folder') return 1;
                        return a.name.localeCompare(b.name);
                    });
                }
                nodeMap[currentPath] = newNode;
            }
        }
    });

    return root;
};


function TreeItem({ node, depth = 0, onFileSelect, onContextMenu }: { node: TreeNode; depth?: number; onFileSelect: (node: TreeNode) => void; onContextMenu: (e: React.MouseEvent, node: TreeNode) => void; }) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        onContextMenu={(e) => onContextMenu(e, node)}
        className="flex items-center gap-2 px-3 py-1.5 hover:bg-opacity-10 hover:bg-white cursor-pointer rounded transition-colors duration-150"
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
      >
        {node.type === 'folder' ? (
          <>{isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}</>
        ) : (
          <div className="w-4"></div>
        )}
        <div onClick={(e) => { if(node.type === 'file') { e.stopPropagation(); onFileSelect(node); }}}>
            {node.type === 'folder' ? <Folder className="w-4 h-4 text-cyber-amber" /> : getIconForFile(node.name)}
        </div>
        <span className="text-sm font-mono text-gray-300 select-none"  onClick={(e) => { if(node.type === 'file') { e.stopPropagation(); onFileSelect(node); }}}>
          {node.name}
        </span>
      </div>
      
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeItem key={child.path} node={child} depth={depth + 1} onFileSelect={onFileSelect} onContextMenu={onContextMenu} />
          ))}
        </div>
      )}
    </div>
  );
}

const ContextMenu = ({ menu, onRename, onDelete, onClose }: any) => {
  if (!menu.visible) return null;

  return (
    <div 
      className="absolute z-50 w-40 bg-cyber-dark-surface border border-cyber-border rounded-md shadow-lg"
      style={{ top: menu.y, left: menu.x }}
      onClick={onClose}
    >
      <ul className="py-1">
        <li className="px-3 py-1.5 text-sm text-gray-300 hover:bg-cyber-primary cursor-pointer" onClick={() => onRename(menu.node)}>Rename</li>
        <li className="px-3 py-1.5 text-sm text-red-500 hover:bg-cyber-primary cursor-pointer" onClick={() => onDelete(menu.node)}>Delete</li>
      </ul>
    </div>
  );
};

export function FilesApp() {
  const [fileTree, setFileTree] = useState<TreeNode | null>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, node: null });

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const { result } = await list_files('.');
      const tree = buildTree(result);
      setFileTree(tree);
    } catch (err: any) {
      setError('Failed to load file structure.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
    
    const handleClick = () => setContextMenu({ ...contextMenu, visible: false });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [fetchFiles]);

  const handleFileSelect = async (node: TreeNode) => {
    if (node.type === 'file') {
      try {
        const { result } = await read_file(node.path);
        setSelectedFile({ path: node.path, content: result });
      } catch (err) {
        console.error('Failed to read file:', err);
        setSelectedFile({ path: node.path, content: 'Error reading file content.' });
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent, node: TreeNode) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, node });
  };

  const handleRename = async (node: any) => {
    const newName = prompt('Enter new name for' + node.name);
    if (newName && newName !== node.name) {
      const oldPath = node.path;
      const newPath = oldPath.substring(0, oldPath.lastIndexOf('/') + 1) + newName;
      try {
        const { result: content } = await read_file(oldPath);
        await write_file(newPath, content);
        await delete_file(oldPath);
        fetchFiles(); // Refresh file tree
      } catch (err) {
        console.error('Rename failed:', err);
        alert('Failed to rename the file.');
      }
    }
  };
  
  const handleDelete = async (node: any) => {
    if (confirm('Are you sure you want to delete' + node.name + '?')) {
      try {
        await delete_file(node.path);
        if (selectedFile?.path === node.path) {
            setSelectedFile(null);
        }
        fetchFiles(); // Refresh
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete the file.');
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full"><p className="text-gray-400">Loading Files...</p></div>;
  if (error) return <div className="flex items-center justify-center h-full"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="flex h-full bg-cyber-obsidian text-white font-sans">
      <div className="w-1/3 max-w-xs border-r border-cyber-border overflow-y-auto py-4">
        {fileTree && <TreeItem node={fileTree} onFileSelect={handleFileSelect} onContextMenu={handleContextMenu} />}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-cyber-border">
          <h2 className="text-lg font-bold text-gray-200">
            {selectedFile ? selectedFile.path : 'Select a file to view'}
          </h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {selectedFile ? (
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {selectedFile.content}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No file selected</p>
            </div>
          )}
        </div>
      </div>
       <ContextMenu menu={contextMenu} onRename={handleRename} onDelete={handleDelete} onClose={() => setContextMenu({ ...contextMenu, visible: false })} />
    </div>
  );
}
