
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
      image: "/project1.png",
      imageHint: "architecture website",
      stack: ["HTML", "CSS", "jQuery", "GSAP"],
      testimonial: "Разработали элегантный сайт для архитектурного бюро, который подчеркивает их современный подход и высокий статус в индустрии.",
    },
    {
      client: "Idfood",
      image: "/project2.png",
      imageHint: "food production",
      stack: ["Next.js", "CSS", "Framer Motion"],
      testimonial: "Создали яркий и функциональный сайт для производителя кулинарных изделий с удобной мобильной версией для широкого охвата.",
    },
    {
      client: "Testana",
      image: "/project3.png",
      imageHint: "script marketplace",
      stack: ["React", "Node.js", "CSS", "Supabase"],
      testimonial: "Разработали безопасный маркетплейс для продажи скриптов, где авторы могут легко публиковать работы, а покупатели — находить нужные им инструменты.",
    },
    {
      client: "TREQ Logistics",
      image: "/project4.png",
      imageHint: "logistics company",
      stack: ["HTML", "SCSS", "JS"],
      testimonial: "Создали корпоративный сайт для крупной логистической компании, который подчеркивает их надежность и предоставляет информацию об услугах.",
    },
    {
      client: "SF.RU",
      image: "/project5.png",
      imageHint: "business automation",
      stack: ["HTML", "CSS", "JS"],
      testimonial: "Создали сайт для компании по автоматизации, который информирует о сложных услугах простым языком и служит мощным инструментом для лидогенерации.",
    },
    {
      client: "Gofrostal",
      image: "/project6.png",
      imageHint: "industrial holding",
      stack: ["HTML", "CSS", "JS"],
      testimonial: "Разработали официальный сайт для предприятия промышленного холдинга, отражающий их индустриальную мощь и большой инженерный опыт.",
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
                stopOnInteraction: false,
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
                        <div className="relative mb-4">
                            <Image
                              src={study.image}
                              alt={`Showcase for ${study.client}`}
                              data-ai-hint={study.imageHint}
                              width={600}
                              height={400}
                              className="rounded-md object-cover w-full"
                            />
                        </div>
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
                          "{study.testimonial}"
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
