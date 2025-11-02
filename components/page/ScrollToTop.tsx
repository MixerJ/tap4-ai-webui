'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          type='button'
          onClick={scrollToTop}
          className='fixed bottom-20 right-4 z-50 flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-indigo-500 to-purple-500 p-3 text-white shadow-lg shadow-indigo-500/25 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:from-indigo-400 hover:to-purple-400 active:scale-95 lg:bottom-52 lg:right-48 lg:p-4'
          aria-label='Scroll to top'
        >
          <ArrowUp className='size-5 lg:size-6' />
          <span className='sr-only'>Go to Top</span>
        </button>
      )}
    </div>
  );
}
