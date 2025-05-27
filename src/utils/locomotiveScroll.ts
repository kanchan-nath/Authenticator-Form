import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initLocomotive = () => {
  try {
    const locomotiveScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    // Update scroll position for GSAP ScrollTrigger
    locomotiveScroll.on('scroll', ScrollTrigger.update);

    // Set up ScrollTrigger to work with Locomotive Scroll
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      scrollTop(value) {
        return arguments.length 
          ? locomotiveScroll.scrollTo(value, 0, 0) 
          : locomotiveScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector('[data-scroll-container]')?.style.transform ? 'transform' : 'fixed',
    });

    // Refresh on window resize
    ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
    ScrollTrigger.refresh();

    return locomotiveScroll;
  } catch (error) {
    console.error('Failed to initialize Locomotive Scroll:', error);
    return null;
  }
};