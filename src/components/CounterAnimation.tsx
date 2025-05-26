
import { useState, useEffect } from 'react';

interface CounterAnimationProps {
  targetValue: number;
  duration: number;
  suffix: string;
  label: string;
}

const CounterAnimation = ({ targetValue, duration, suffix, label }: CounterAnimationProps) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Use easeOutQuart for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(easeProgress * targetValue);
      
      setCurrentValue(value);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    const timer = setTimeout(() => {
      updateCounter();
    }, 500); // Start animation after component mounts

    return () => clearTimeout(timer);
  }, [targetValue, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="border border-gray-800 rounded-lg p-6 bg-idDarkBlack/50 text-center min-w-[200px]">
      <h3 className="text-idOrange text-4xl font-bold mb-2">
        {formatNumber(currentValue)}{suffix}
      </h3>
      <p className="text-gray-400 text-sm leading-tight">{label}</p>
    </div>
  );
};

export default CounterAnimation;
