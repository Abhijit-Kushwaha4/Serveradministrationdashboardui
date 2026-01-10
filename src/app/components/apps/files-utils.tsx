
import { useState, useEffect, useMemo } from 'react';
import { Folder, File, ChevronRight, ChevronDown, FileText, Image, Code, FileJson, FileType, FileArchive, Settings, Wind } from 'lucide-react';

export const getIconForFile = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (extension) {
    switch (extension) {
      case 'tsx':
      case 'jsx':
        return <Code className="w-4 h-4" color="#61DAFB" />;
      case 'ts':
      case 'js':
        return <Code className="w-4 h-4" color="#F7DF1E" />;
      case 'css':
      case 'scss':
      case 'mjs':
        return <Wind className="w-4 h-4" color="#CC6699" />;
      case 'json':
        return <FileJson className="w-4 h-4" color="#F7DF1E" />;
      case 'md':
        return <FileText className="w-4 h-4" color="#FFFFFF" />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return <Image className="w-4 h-4" color="#4CAF50" />;
      case 'zip':
      case 'tar':
      case 'gz':
        return <FileArchive className="w-4 h-4" color="#FFC107" />;
      case 'html':
          return <Code className="w-4 h-4" color="#E34F26" />;
      case 'nix':
          return <Settings className="w-4 h-4" color="#7E57C2" />;
      default:
        return <File className="w-4 h-4" color="#FFFFFF" />;
    }
  }
  return <File className="w-4 h-4" color="#FFFFFF" />;
};
