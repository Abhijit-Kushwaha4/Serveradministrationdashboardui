
// Mock implementation of the default_api
// This is to allow the frontend application to build and run.

interface FileSystem {
  [path: string]: string;
}

const mockFiles: FileSystem = {
  'README.md': '# Mock Project\nThis is a mock project for demonstration.',
  'src/main.tsx': 'import React from \'react\';\nimport ReactDOM from \'react-dom/client\';\n\nReactDOM.createRoot(document.getElementById(\'root\')!).render(\n  <React.StrictMode>\n    <div>Hello World</div>\n  </React.StrictMode>,\n)',
  'src/styles.css': 'body { font-family: sans-serif; }',
  'package.json': '{ "name": "mock-project", "version": "1.0.0" }'
};

export const list_files = (path: string): Promise<{ result: string[] }> => {
  console.log(`[mock] list_files called with path: ${path}`);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ result: Object.keys(mockFiles) });
    }, 500);
  });
};

export const read_file = (path: string): Promise<{ result: string }> => {
  console.log(`[mock] read_file called with path: ${path}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockFiles[path]) {
        resolve({ result: mockFiles[path] });
      } else {
        reject({ error: 'File not found' });
      }
    }, 500);
  });
};

export const write_file = (path: string, content: string): Promise<any> => {
  console.log(`[mock] write_file called with path: ${path}`);
  return new Promise(resolve => {
    setTimeout(() => {
      mockFiles[path] = content;
      resolve({ result: 'File saved successfully' });
    }, 500);
  });
};

export const delete_file = (path: string): Promise<any> => {
  console.log(`[mock] delete_file called with path: ${path}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockFiles[path]) {
        delete mockFiles[path];
        resolve({ result: 'File deleted successfully' });
      } else {
        reject({ error: 'File not found' });
      }
    }, 500);
  });
};
