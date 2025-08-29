
"use client"
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Autoplay from "embla-carousel-autoplay"
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);


export default function CaseStudiesSection() {
  const { translations } = useLanguage();
  const { caseStudiesSection: t } = translations;

  useGSAP(() => {
    gsap.from(".case-studies-title", {
      scrollTrigger: {
        trigger: ".case-studies-title",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".case-study-card", {
      scrollTrigger: {
        trigger: ".case-study-card",
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const caseStudies = [
    {
      client: "FUTURA Architects",
      image: "/project1.webp",
      imageHint: "architecture website",
      stack: ["HTML", "CSS", "jQuery", "GSAP"],
      testimonialKey: "futura",
      link: "https://futura-architects.com/"
    },
    {
      client: "Idfood",
      image: "/project2.webp",
      imageHint: "food production",
      stack: ["Next.js", "CSS", "Framer Motion"],
      testimonialKey: "idfood",
      link: "https://idfood.ru/"
    },
    {
      client: "Testana",
      image: "/project3.webp",
      imageHint: "script marketplace",
      stack: ["React", "Node.js", "CSS"],
      testimonialKey: "testana",
      link: "https://tstn.onrender.com/"
    },
    {
      client: "TREQ Logistics",
      image: "/project4.webp",
      imageHint: "logistics company",
      stack: ["HTML", "SCSS", "JS"],
      testimonialKey: "treq",
      link: "https://treq.ru/"
    },
    {
      client: "SF.RU",
      image: "/project5.webp",
      imageHint: "business automation",
      stack: ["HTML", "CSS", "JS"],
      testimonialKey: "sfru",
      link: "https://sferadannykh.ru/"
    },
    {
      client: "Gofrostal",
      image: "/project6.webp",
      imageHint: "industrial holding",
      stack: ["HTML", "CSS", "JS"],
      testimonialKey: "gofrostal",
      link: "https://www.gofrostal.ru/"
    },
  ];

  return (
    <section id="case-studies" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 case-studies-title">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            {t.title}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        
        <div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3 case-study-card">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-card-foreground">{study.client}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <Link href={study.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${study.client} website`} className="relative mb-4 group block rounded-md overflow-hidden">
                          <Image
                            src={study.image}
                            alt={`Showcase for ${study.client}`}
                            data-ai-hint={study.imageHint}
                            width={600}
                            height={400}
                            className="object-cover w-full transition-transform duration-300 group-hover:scale-102"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <LinkIcon className="h-10 w-10 text-white" />
                          </div>
                        </Link>
                        <div className="my-4">
                          <h4 className="font-semibold mb-2 text-card-foreground">{t.kpiHighlights}:</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.stack.map((tech, kpiIndex) => (
                              <Badge key={kpiIndex} variant='secondary'>
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-4">
                          "{t.testimonials[study.testimonialKey as keyof typeof t.testimonials]}"
                        </blockquote>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 hidden sm:flex" />
            <CarouselNext className="mr-12 hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
