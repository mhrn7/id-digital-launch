
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
      {/* 3D Rocket - More Robust and Detailed */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-2000 ease-out ${
        animationPhase === 'initial' ? 'bottom-[-150px] opacity-0' :
        animationPhase === 'rocket-launch' ? 'bottom-[180px] opacity-100' :
        'bottom-[280px] opacity-100'
      }`}>
        <div className="relative">
          {/* Main Rocket Body - More Robust */}
          <div className="w-20 h-40 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-t-full rounded-b-lg relative shadow-2xl border-2 border-gray-600">
            {/* Rocket Nose Cone */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-400 rounded-full shadow-lg border-2 border-red-700"></div>
            
            {/* Command Module Window */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-600 rounded-full border-3 border-blue-900 shadow-inner">
              <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
            </div>
            
            {/* Rocket Body Details */}
            <div className="absolute top-20 left-3 w-4 h-12 bg-gradient-to-b from-red-600 to-red-800 rounded border border-red-900"></div>
            <div className="absolute top-20 right-3 w-4 h-12 bg-gradient-to-b from-red-600 to-red-800 rounded border border-red-900"></div>
            
            {/* USA Flag Detail */}
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-r from-red-600 via-white to-blue-600 rounded-sm border border-gray-700"></div>
            
            {/* Engine Nozzles */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-gray-600 to-gray-900 rounded-b-lg border border-gray-800"></div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-yellow-600 to-orange-700 rounded-b-lg"></div>
          </div>
          
          {/* Side Boosters */}
          <div className="absolute -bottom-4 -left-6 w-8 h-32 bg-gradient-to-b from-gray-300 to-gray-500 rounded-t-lg rounded-b-lg transform -rotate-12 shadow-xl border border-gray-600">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-b from-orange-500 to-red-600 rounded-b-lg"></div>
          </div>
          <div className="absolute -bottom-4 -right-6 w-8 h-32 bg-gradient-to-b from-gray-300 to-gray-500 rounded-t-lg rounded-b-lg transform rotate-12 shadow-xl border border-gray-600">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-b from-orange-500 to-red-600 rounded-b-lg"></div>
          </div>
          
          {/* Main Engine Fire */}
          {animationPhase !== 'initial' && (
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-12 bg-gradient-to-b from-white via-yellow-400 via-orange-500 to-red-600 rounded-b-full animate-pulse shadow-lg"></div>
              <div className="w-8 h-16 bg-gradient-to-b from-yellow-300 via-orange-400 via-red-500 to-transparent rounded-b-full animate-pulse opacity-80 absolute -top-8 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-10 h-20 bg-gradient-to-b from-orange-300 via-red-400 to-transparent rounded-b-full animate-pulse opacity-60 absolute -top-12 left-1/2 transform -translate-x-1/2"></div>
            </div>
          )}

          {/* Side Booster Flames */}
          {animationPhase !== 'initial' && (
            <>
              <div className="absolute -bottom-8 -left-6 transform -rotate-12">
                <div className="w-3 h-8 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-b-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-8 -right-6 transform rotate-12">
                <div className="w-3 h-8 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-b-full animate-pulse"></div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Smoke and Particles */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-out ${
        animationPhase === 'initial' || animationPhase === 'rocket-launch' ? 'opacity-0' :
        animationPhase === 'smoke-reveal' ? 'opacity-100' :
        'opacity-30'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-400/80 via-gray-300/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial from-gray-500/60 to-transparent rounded-full"></div>
      </div>

      {/* Enhanced Particles and Stars */}
      {animationPhase !== 'initial' && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-80`}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${50 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 3}s`,
                boxShadow: '0 0 4px rgba(255, 255, 0, 0.8)'
              }}
            ></div>
          ))}
          
          {/* Sparks */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`spark-${i}`}
              className={`absolute w-0.5 h-4 bg-gradient-to-t from-orange-500 to-yellow-300 animate-pulse`}
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${60 + Math.random() * 30}%`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Launch Platform */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg border-2 border-gray-800 shadow-xl">
        <div className="absolute top-1 left-4 w-32 h-2 bg-gradient-to-r from-gray-500 to-gray-400 rounded"></div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gray-800 rounded-t"></div>
      </div>
    </div>
  );
};

export default RocketAnimation;
