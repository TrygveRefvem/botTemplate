import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
}

export function AudioVisualizer({ isActive, isSpeaking }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const bars = 50;
    const barWidth = canvas.width / bars;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < bars; i++) {
        const height = isSpeaking 
          ? Math.random() * canvas.height * 0.8
          : Math.sin(Date.now() * 0.001 + i * 0.1) * 20 + 30;

        ctx.fillStyle = isSpeaking 
          ? '#4CAF50'
          : '#E8F5E9';
        
        ctx.fillRect(
          i * barWidth,
          (canvas.height - height) / 2,
          barWidth - 2,
          height
        );
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, isSpeaking]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className="w-full rounded-lg bg-white border border-gray-100 shadow-sm"
    />
  );
}
