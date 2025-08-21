
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect, useState, createContext, useContext, useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

type ScrollSmootherContextType = ScrollSmoother | null;

const ScrollSmootherContext = createContext<ScrollSmootherContextType>(null);

export const useScrollSmoother = () => useContext(ScrollSmootherContext);

export const GSAPProvider = ({ children }: { children: ReactNode }) => {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Workaround for enterprise license missing.
    // @ts-ignore
    window.gsap = gsap;
  }, []);
  
  useGSAP(() => {
    const smootherInstance = ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });
    setSmoother(smootherInstance);

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(spotlight, {
        duration: 0.5,
        x: clientX,
        y: clientY,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      smootherInstance.kill();
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
      <ScrollSmootherContext.Provider value={smoother}>
        <div id="smooth-wrapper" className="relative">
          <div ref={spotlightRef} className="spotlight-global"></div>
          <div id="smooth-content">
              {children}
          </div>
           <style jsx>{`
            .spotlight-global {
              position: fixed;
              top: 0;
              left: 0;
              width: 400px;
              height: 400px;
              border-radius: 50%;
              background-image: radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%);
              filter: blur(80px);
              transform: translate(-50%, -50%);
              pointer-events: none;
              z-index: 999;
            }
          `}</style>
        </div>
      </ScrollSmootherContext.Provider>
  );
}
