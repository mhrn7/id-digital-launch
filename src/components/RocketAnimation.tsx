
import { useEffect, useState } from 'react';

const RocketAnimation = () => {
  const [animationPhase, setAnimationPhase] = useState('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase('rocket-launch'), 500);
    const timer2 = setTimeout(() => setAnimationPhase('smoke-reveal'), 2500);
    const timer3 = setTimeout(() => setAnimationPhase('content-reveal'), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Rocket */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-2000 ease-out ${
        animationPhase === 'initial' ? 'bottom-[-100px] opacity-0' :
        animationPhase === 'rocket-launch' ? 'bottom-[200px] opacity-100' :
        'bottom-[300px] opacity-100'
      }`}>
        <div className="relative">
          {/* Rocket Body */}
          <div className="w-16 h-32 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-full rounded-b-lg relative shadow-2xl">
            {/* Rocket Tip */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full"></div>
            
            {/* Window */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-200 rounded-full border-2 border-blue-800"></div>
            
            {/* Rocket Details */}
            <div className="absolute top-16 left-2 w-3 h-8 bg-red-500 rounded"></div>
            <div className="absolute top-16 right-2 w-3 h-8 bg-red-500 rounded"></div>
          </div>
          
          {/* Rocket Fins */}
          <div className="absolute -bottom-2 -left-2 w-6 h-8 bg-gradient-to-b from-orange-500 to-red-600 transform -skew-x-12"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-8 bg-gradient-to-b from-orange-500 to-red-600 transform skew-x-12"></div>
          
          {/* Fire Trail */}
          {animationPhase !== 'initial' && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-8 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-b-full animate-pulse"></div>
              <div className="w-6 h-12 bg-gradient-to-b from-orange-400 via-red-500 to-transparent rounded-b-full animate-pulse opacity-60 absolute -top-4 left-1/2 transform -translate-x-1/2"></div>
            </div>
          )}
        </div>
      </div>

      {/* Smoke Curtain */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-out ${
        animationPhase === 'initial' || animationPhase === 'rocket-launch' ? 'opacity-0' :
        animationPhase === 'smoke-reveal' ? 'opacity-100' :
        'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-400/60 via-gray-300/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Particles */}
      {animationPhase !== 'initial' && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${60 + Math.random() * 30}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RocketAnimation;
