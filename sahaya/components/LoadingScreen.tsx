import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2; 
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-brand-primaryLight/30 backdrop-blur-3xl z-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-48 h-48 flex items-center justify-center animate-bounce-slow">
        <Logo className="w-full h-full" animate={true} />
      </div>
      
      <div className="w-64 mt-10 bg-gray-200 rounded-full h-2 overflow-hidden">
           <div className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-100 ease-out shadow-[0_0_10px_rgba(13,148,136,0.5)]" style={{ width: `${progress}%` }}></div>
      </div>
      
      <h2 className="text-brand-dark font-sans font-extrabold text-3xl mt-6 tracking-tight">Sahaya</h2>
      <p className="text-brand-muted font-medium text-sm mt-2">Connecting Pet Parents...</p>
    </div>
  );
};

export default LoadingScreen;