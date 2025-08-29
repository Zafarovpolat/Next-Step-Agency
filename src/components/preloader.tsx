
"use client";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const container = useRef(null);
    const logoRef = useRef(null);
    const leftCurtainRef = useRef(null);
    const rightCurtainRef = useRef(null);
    const { resolvedTheme } = useTheme();
    const [logoSrc, setLogoSrc] = useState('/logo2.png'); // Default to dark logo

    useEffect(() => {
        // Set the correct logo based on the theme
        setLogoSrc(resolvedTheme === 'dark' ? '/logo2.png' : '/logo.png');
    }, [resolvedTheme]);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
                if (container.current) {
                    gsap.to(container.current, { 
                        display: 'none',
                        duration: 0.1
                    });
                }
            }
        });
        
        // Initial state
        gsap.set([leftCurtainRef.current, rightCurtainRef.current], { scaleX: 1 });
        gsap.set(logoRef.current, { opacity: 0, scale: 0.9 });

        // Animation sequence
        tl.to(logoRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.inOut'
        })
        .to(logoRef.current, {
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
            <div ref={logoRef} className="absolute z-20 opacity-0 scale-90">
                 <Image src={logoSrc} alt="Next Step Agency Logo" width={150} height={38} key={logoSrc} />
            </div>
            <div ref={leftCurtainRef} className="absolute left-0 top-0 h-full w-1/2 bg-background origin-left"></div>
            <div ref={rightCurtainRef} className="absolute right-0 top-0 h-full w-1/2 bg-background origin-right"></div>
        </div>
    )
}
