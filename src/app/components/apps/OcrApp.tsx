
import { useState } from 'react';
import { runDeepseekOCR } from '../../bytezClient';
import { Upload } from 'lucide-react';

export function OcrApp() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setOcrResult(null); // Reset previous result
        setError(null); // Reset previous error
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePerformOCR = async () => {
    if (!imageUrl) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOcrResult(null);

    try {
      // The bytezClient expects a URL or a base64 string.
      // FileReader provides a base64 string which is perfect.
      const result = await runDeepseekOCR(imageUrl);
      
      // The result might be an object or a string, let's handle that.
      if (typeof result === 'string') {
        setOcrResult(result);
      } else if (result && (result as any).text) {
        setOcrResult((result as any).text);
      } else {
        setOcrResult(JSON.stringify(result, null, 2));
      }

    } catch (e: any) {
      console.error("OCR Error:", e);
      setError(e.message || "An unknown error occurred during OCR processing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-4">
      <h2 className="text-2xl font-bold text-cyber-foreground">DeepSeek OCR</h2>
      
      <div className="flex-shrink-0 border border-dashed border-cyber-border rounded-lg p-4 text-center">
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-10 h-10 text-cyber-secondary" />
            <p className="mt-2 text-sm text-cyber-secondary">
              {imageUrl ? "Image selected. Click to change." : "Click to upload an image"}
            </p>
          </div>
        </label>
        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      {imageUrl && (
        <div className="flex-shrink-0">
          <img src={imageUrl} alt="Uploaded preview" className="max-h-64 rounded-lg mx-auto" />
        </div>
      )}

      <div className="flex-shrink-0">
        <button
          onClick={handlePerformOCR}
          disabled={!imageUrl || isLoading}
          className="w-full px-6 py-3 rounded-lg border transition-all hover:border-opacity-50 disabled:opacity-50 font-mono"
          style={{
            backgroundColor: 'var(--cyber-green)',
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-obsidian)',
          }}
        >
          {isLoading ? "Processing..." : "Extract Text from Image"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 rounded-lg" style={{ backgroundColor: 'var(--cyber-dark-surface)' }}>
        <h3 className="font-mono text-lg text-cyber-secondary border-b border-cyber-border pb-2 mb-2">Extracted Text:</h3>
        {error && <p className="text-red-500 font-mono">{error}</p>}
        {ocrResult ? (
          <pre className="whitespace-pre-wrap font-mono text-sm text-cyber-foreground">{ocrResult}</pre>
        ) : (
          !isLoading && <p className="text-cyber-secondary font-mono text-sm">Results will appear here...</p>
        )}
      </div>
    </div>
  );
}
