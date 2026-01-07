import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: string;
}

export function PPTEditor() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: 'Slide 1', content: 'Click to edit' }
  ]);
  const [activeSlide, setActiveSlide] = useState(0);

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now(),
      title: `Slide ${slides.length + 1}`,
      content: 'New slide content'
    };
    setSlides([...slides, newSlide]);
  };

  return (
    <div className="h-full flex">
      {/* Sidebar: Thumbnails */}
      <div className="w-64 border-r p-4 overflow-y-auto"
           style={{ borderColor: 'var(--cyber-border)' }}>
        <button
          onClick={addSlide}
          className="w-full mb-4 py-2 rounded-lg border flex items-center justify-center gap-2 font-mono text-sm"
          style={{
            backgroundColor: 'var(--cyber-green)',
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-obsidian)',
          }}>
          <Plus className="w-4 h-4" />
          Add Slide
        </button>
        
        <div className="space-y-2">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className="p-3 rounded-lg border cursor-pointer transition-all"
              style={{
                backgroundColor: activeSlide === idx ? 'var(--cyber-dark-surface)' : 'transparent',
                borderColor: activeSlide === idx ? 'var(--cyber-green)' : 'var(--cyber-border)',
              }}>
              <div className="text-xs font-mono mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Slide {idx + 1}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {slide.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main: Slide Editor */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            value={slides[activeSlide]?.title || ''}
            onChange={(e) => {
              const newSlides = [...slides];
              newSlides[activeSlide].title = e.target.value;
              setSlides(newSlides);
            }}
            className="w-full mb-6 px-4 py-3 rounded-lg border outline-none text-2xl"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          />
          
          <textarea
            value={slides[activeSlide]?.content || ''}
            onChange={(e) => {
              const newSlides = [...slides];
              newSlides[activeSlide].content = e.target.value;
              setSlides(newSlides);
            }}
            className="w-full h-96 p-4 rounded-lg border outline-none resize-none"
            style={{
              backgroundColor: 'var(--cyber-dark-surface)',
              borderColor: 'var(--cyber-border)',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
