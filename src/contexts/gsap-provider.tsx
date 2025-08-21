"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useEffect } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export const GSAPProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Workaround for enterprise license missing.
    // @ts-ignore
    window.gsap = gsap;
  }, []);
  
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });
  }, []);

  return <>{children}</>;
}
