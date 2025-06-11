
import { useEffect } from 'react';

export const setupScrollAnimations = () => {
  useEffect(() => {
    const animateItems = () => {
      const animationItems = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add a random delay to stagger the animations
            const delay = Math.random() * 0.3;
            setTimeout(() => {
              entry.target.classList.add('animate-visible');
              
              // Add direction-specific animation classes based on data attributes
              if (entry.target.getAttribute('data-animation') === 'fade-up') {
                entry.target.classList.add('animate-fade-up');
              } else if (entry.target.getAttribute('data-animation') === 'fade-left') {
                entry.target.classList.add('animate-fade-left');
              } else if (entry.target.getAttribute('data-animation') === 'fade-right') {
                entry.target.classList.add('animate-fade-right');
              } else if (entry.target.getAttribute('data-animation') === 'zoom-in') {
                entry.target.classList.add('animate-zoom-in');
              } else if (entry.target.getAttribute('data-animation') === 'flip') {
                entry.target.classList.add('animate-flip');
              } else {
                // Default animation
                entry.target.classList.add('animate-fade-up');
              }
            }, delay * 1000);
            
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      }, { 
        threshold: 0.1, // Trigger when at least 10% of the target is visible
        rootMargin: '0px 0px -100px 0px' // Adds negative bottom margin to trigger animation earlier
      });
      
      animationItems.forEach(item => {
        observer.observe(item);
      });
      
      return () => {
        animationItems.forEach(item => {
          observer.unobserve(item);
        });
      };
    };
    
    // Run animation setup after a small delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      animateItems();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
};
