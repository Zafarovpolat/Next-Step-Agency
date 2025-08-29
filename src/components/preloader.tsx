
"use client";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef(null);
    const spinnerRef = useRef(null);
    const leftCurtainRef = useRef(null);
    const rightCurtainRef = useRef(null);
    
    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (container.current) {
                    gsap.to(container.current, { 
                        display: 'none',
                        duration: 0.1
                    });
                }
                onComplete();
            }
        });
        
        // Initial state
        gsap.set([leftCurtainRef.current, rightCurtainRef.current], { scaleX: 1 });
        gsap.set(spinnerRef.current, { opacity: 0, scale: 0.9 });

        // Animation sequence
        tl.to(spinnerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.inOut'
        })
        .to(spinnerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in'
        }, "+=0.5")
        .to([leftCurtainRef.current, rightCurtainRef.current], {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            stagger: 0.1
        });

    }, { scope: container, dependencies: [onComplete] });

    return (
        <div ref={container} className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden">
             <div ref={spinnerRef} className="absolute z-20 opacity-0 scale-90">
                 <svg 
                    width="44" 
                    height="44" 
                    viewBox="0 0 44 44" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="stroke-foreground"
                    >
                    <g fill="none" fillRule="evenodd" strokeWidth="2">
                        <circle cx="22" cy="22" r="1">
                            <animate attributeName="r"
                                begin="0s" dur="1.8s"
                                values="1; 20"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.165, 0.84, 0.44, 1"
                                repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity"
                                begin="0s" dur="1.8s"
                                values="1; 0"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.3, 0.61, 0.355, 1"
                                repeatCount="indefinite" />
                        </circle>
                        <circle cx="22" cy="22" r="1">
                            <animate attributeName="r"
                                begin="-0.9s" dur="1.8s"
                                values="1; 20"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.165, 0.84, 0.44, 1"
                                repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity"
                                begin="-0.9s" dur="1.8s"
                                values="1; 0"
                                calcMode="spline"
                                keyTimes="0; 1"
                                keySplines="0.3, 0.61, 0.355, 1"
                                repeatCount="indefinite" />
                        </circle>
                    </g>
                </svg>
            </div>
            <div ref={leftCurtainRef} className="absolute left-0 top-0 h-full w-1/2 bg-background origin-left"></div>
            <div ref={rightCurtainRef} className="absolute right-0 top-0 h-full w-1/2 bg-background origin-right"></div>
        </div>
    )
}
