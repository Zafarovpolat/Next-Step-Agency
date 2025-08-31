
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

type ScrollSmootherContextType = ScrollSmoother | null;

const ScrollSmootherContext = createContext<ScrollSmootherContextType>(null);

export const useScrollSmoother = () => useContext(ScrollSmootherContext);

export const GSAPProvider = ({ children }: { children: ReactNode }) => {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

  useEffect(() => {
    // Workaround for enterprise license missing.
    // @ts-ignore
    window.gsap = gsap;
    
    // Refresh ScrollTrigger on component mount and on window resize
    const refreshTriggers = () => ScrollTrigger.refresh();
    
    window.addEventListener('resize', refreshTriggers);
    
    // Initial refresh after a short delay to ensure all content is loaded
    setTimeout(refreshTriggers, 100);

    return () => {
      window.removeEventListener('resize', refreshTriggers);
    };
  }, []);
  
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1000px)", () => {
      const smootherInstance = ScrollSmoother.create({
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });
      setSmoother(smootherInstance);

      return () => {
        if (smootherInstance) {
          smootherInstance.kill();
          setSmoother(null);
        }
      };
    });

    mm.add("(max-width: 999px)", () => {
      // Ensure native smooth scrolling is enabled for mobile.
      // GSAP's ScrollSmoother can interfere with this.
      document.documentElement.style.scrollBehavior = 'smooth';
      
      return () => {
        // Reset when the media query no longer matches
        document.documentElement.style.scrollBehavior = '';
      }
    });

    return () => {
      mm.revert();
    }
  }, []);

  return (
      <ScrollSmootherContext.Provider value={smoother}>
        <div id="smooth-wrapper" className="relative">
          <div id="smooth-content">
              {children}
          </div>
        </div>
      </ScrollSmootherContext.Provider>
  );
}
