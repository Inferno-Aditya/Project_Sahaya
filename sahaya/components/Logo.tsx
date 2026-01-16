import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12", animate = false }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (animate && svgRef.current) {
      anime({
        targets: svgRef.current.querySelectorAll('.pet-head'),
        translateY: [-2, 2],
        rotate: [-5, 5],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 2000
      });
      
      anime({
        targets: svgRef.current.querySelectorAll('.smile'),
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: 500,
        direction: 'alternate',
        loop: true
      });
    }
  }, [animate]);

  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg ref={svgRef} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* Background Circle */}
        <circle cx="50" cy="50" r="48" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2"/>
        
        {/* Man */}
        <g className="man">
          {/* Body */}
          <path d="M25 90 C 25 70 35 55 50 55 C 65 55 75 70 75 90" fill="#0F766E" />
          {/* Head */}
          <circle cx="50" cy="40" r="14" fill="#FFEDD5" />
          {/* Hair */}
          <path d="M36 38 C 36 28 42 24 50 24 C 58 24 64 28 64 38" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
          {/* Smile */}
          <path className="smile" d="M45 44 Q 50 48 55 44" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Pet (Dog) */}
        <g className="pet-head">
           {/* Head */}
           <path d="M55 75 C 55 65 65 60 75 65 C 85 60 95 65 95 75 C 95 85 85 90 75 88 C 65 90 55 85 55 75 Z" fill="#F43F5E" />
           {/* Ears */}
           <path d="M58 68 L 52 60" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
           <path d="M92 68 L 98 60" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
           {/* Face details */}
           <circle cx="70" cy="72" r="2" fill="#FFFFFF" />
           <circle cx="80" cy="72" r="2" fill="#FFFFFF" />
           <path d="M72 78 Q 75 82 78 78" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
        
        {/* Arm Holding */}
        <path d="M35 75 Q 50 95 70 85" stroke="#FFEDD5" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Logo;