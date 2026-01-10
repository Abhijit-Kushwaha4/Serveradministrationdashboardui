import { useEffect, useRef } from 'react';

const MONACO_CDN_URL = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs';

let monacoLoadingPromise: Promise<any> | null = null;

const loadMonaco = () => {
  if (!monacoLoadingPromise) {
    monacoLoadingPromise = new Promise((resolve, reject) => {
      if (window.monaco) {
        resolve(window.monaco);
        return;
      }

      const script = document.createElement('script');
      script.src = `${MONACO_CDN_URL}/loader.js`;
      script.onload = () => {
        window.require.config({ paths: { 'vs': MONACO_CDN_URL } });
        window.require(['vs/editor/editor.main'], (monaco: any) => {
          resolve(monaco);
        }, (error: any) => {
          reject(error);
        });
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
  return monacoLoadingPromise;
};

export const MonacoEditor = ({ value, onChange, language }: { value: string; onChange: (value: string) => void; language: string; }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    loadMonaco().then(monaco => {
      if (isMounted && editorRef.current) {
        editorInstanceRef.current = monaco.editor.create(editorRef.current, {
          value,
          language,
          theme: 'vs-dark',
          automaticLayout: true,
          minimap: { enabled: false },
          scrollbar: { vertical: 'auto' },
          fontSize: 14,
          fontFamily: 'monospace',
          scrollBeyondLastLine: false,
        });

        editorInstanceRef.current.onDidChangeModelContent(() => {
          onChange(editorInstanceRef.current.getValue());
        });
      }
    });

    return () => {
      isMounted = false;
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
      }
    };
  }, [onChange]);

  useEffect(() => {
    if (editorInstanceRef.current && editorInstanceRef.current.getModel()) {
      loadMonaco().then(monaco => {
         monaco.editor.setModelLanguage(editorInstanceRef.current.getModel(), language);
      });
    }
  }, [language]);

  useEffect(() => {
    if (editorInstanceRef.current && value !== editorInstanceRef.current.getValue()) {
      editorInstanceRef.current.setValue(value);
    }
  }, [value]);

  return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
};
