
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
        }
      };
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
