
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowLeft, ArrowRight, Shield, X, Plus, Star, Download, Code, MoreVertical, Bug } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const BrowserFrame = ({ url, noScript, userAgent, onPageLoad, onFetchError, isDebugMode, localTestContent }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rawHtml, setRawHtml] = useState('');
    const iframeRef = useRef(null);

    useEffect(() => {
        if (!url && !localTestContent) return;
        setIsLoading(true);
        setError(null);
        setRawHtml('');

        if (localTestContent) {
            const doc = iframeRef.current.contentWindow.document;
            doc.open();
            doc.write(localTestContent);
            doc.close();
            setIsLoading(false);
            return;
        }

        const fetchPage = async () => {
            try {
                const response = await fetch(`/api/browse?url=${encodeURIComponent(url)}&noScript=${noScript}&userAgent=${userAgent}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(`Proxy Error (${response.status}): ${data.message || 'No Data Received.'}`);
                }

                onPageLoad(data);
                setRawHtml(data.html);

                const doc = iframeRef.current.contentWindow.document;
                doc.open();
                doc.write(data.html);
                doc.close();

            } catch (err) {
                console.error('[DIAGNOSTIC_ERROR]', err);
                setError(err);
                setRawHtml(`{ \"error\": \"${err.message}\" }`);
                onFetchError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPage();
    }, [url, noScript, userAgent, onPageLoad, onFetchError, localTestContent]);

    if (isDebugMode) {
        return (
            <div className='w-full h-full p-2 bg-black text-green-400 font-mono text-xs'>
                <h2 className='text-lg text-yellow-400 mb-2'>DEBUG MODE: Raw Proxy Output</h2>
                <textarea 
                    readOnly 
                    className='w-full h-full bg-gray-900 border border-green-700 p-2' 
                    value={rawHtml}
                />
            </div>
        );
    }

    return (
        <div className="w-full h-full relative bg-black overflow-y-auto">
            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-cyber-dark-surface">
                    <p className="text-white animate-pulse">Loading Content...</p>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 z-10 flex items-center justify-center p-4 text-center">
                     <div className="bg-red-900/80 border border-red-500 text-white p-8 rounded-lg backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-2">FETCH FAILED</h2>
                        <p className="text-red-300">{error.message}</p>
                    </div>
                </div>
            )}

            <iframe
                ref={iframeRef}
                title={url || 'local-test'}
                className={`w-full h-full border-none transition-opacity duration-300 ${isLoading || error ? 'opacity-0' : 'opacity-100'}`}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            ></iframe>
        </div>
    );
};

export const BrowserApp = () => {
    const [tabs, setTabs] = useState([{ id: 1, url: 'https://google.com', title: 'Google', history: ['https://google.com'], historyIndex: 0 }]);
    const [activeTabId, setActiveTabId] = useState(1);
    const [inputUrl, setInputUrl] = useState('https://google.com');
    const [settings, setSettings] = useState({ noScript: false, userAgent: 'desktop' });
    const [isDebugMode, setIsDebugMode] = useState(false);
    const [localTestContent, setLocalTestContent] = useState('');

    const activeTab = tabs.find(t => t.id === activeTabId);

    const handlePageLoaded = useCallback((data) => {
        setLocalTestContent('');
        setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, title: data.title } : t));
    }, [activeTabId]);

    const handleFetchError = useCallback(() => {
        setLocalTestContent('');
    }, []);
    
    const navigate = (url, tabId = activeTabId) => {
      const formattedUrl = url.includes('://') ? url : `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
      setTabs(tabs.map(t => t.id === tabId ? { ...t, url: formattedUrl, title: 'Loading...' } : t));
      setInputUrl(formattedUrl);
      setLocalTestContent('');
    };
  
    const handleGo = (e) => {
        e.preventDefault();
        navigate(inputUrl);
    }

    return (
        <div className="w-full h-full bg-cyber-dark-surface flex flex-col text-white font-sans">
            <div className="bg-cyber-surface p-2 flex items-center gap-2 border-b border-cyber-border z-20">
                <form onSubmit={handleGo} className="flex-1">
                    <input 
                        type="text" 
                        value={inputUrl} 
                        onChange={e => setInputUrl(e.target.value)} 
                        className="w-full bg-cyber-glass px-4 py-2 rounded-md border border-cyber-border"
                        placeholder='Enter URL or search...'
                    />
                </form>
                <button onClick={() => setIsDebugMode(!isDebugMode)} className={`p-2 rounded-md ${isDebugMode ? 'bg-yellow-500 text-black' : 'hover:bg-cyber-glass'}`} title="Debug Mode">
                    <Bug size={16}/>
                </button>
                <button onClick={() => setLocalTestContent('<h1>IT WORKS</h1><p>The iframe element is capable of rendering.</p>')} className="p-2 rounded-md hover:bg-cyber-glass" title="Test Local Render">
                    Test Render
                </button>
            </div>

            <div className="flex-1 relative flex min-h-0">
                <div className="flex-1 relative">
                    {tabs.map(tab => (
                        <div key={tab.id} className={`w-full h-full absolute top-0 left-0 ${activeTabId === tab.id ? 'z-10' : 'z-0'}`}>
                            {activeTabId === tab.id && 
                                <BrowserFrame 
                                    url={tab.url} 
                                    noScript={settings.noScript} 
                                    userAgent={settings.userAgent} 
                                    onPageLoad={handlePageLoaded}
                                    onFetchError={handleFetchError}
                                    isDebugMode={isDebugMode}
                                    localTestContent={localTestContent}
                                />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
