
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
      stack: ["html", "css", "jquery", "gsap"],
      testimonial: "Для одного из самых влиятельных архитектурных бюро России мы разработали сайт, который отражает их инновационный подход и внимание к деталям. Элегантный дизайн, плавная анимация и интуитивно понятная навигация позволяют посетителям с головой погрузиться в мир современной архитектуры. Проект подчеркивает статус компании и служит мощным инструментом для привлечения новых клиентов.",
    },
    {
      client: "Ideologiyayedi",
      image: "/project2.png",
      imageHint: "food production",
      stack: ["nextjs", "css", "framer motion"],
      testimonial: "Мы создали аппетитный и функциональный сайт для компании, занимающейся производством кулинарных изделий. Проект сочетает в себе яркий визуальный стиль и удобную структуру, позволяя легко ознакомиться с ассортиментом. Особое внимание было уделено мобильной версии, чтобы клиенты могли делать заказы в любом месте и в любое время. Сайт стал ключевым элементом их цифрового присутствия.",
    },
    {
      client: "Testana",
      image: "/project3.png",
      imageHint: "script marketplace",
      stack: ["react", "css", "supabase"],
      testimonial: "Для этой платформы по продаже специализированных скриптов мы разработали высокопроизводительный и безопасный маркетплейс. Проект позволяет авторам легко публиковать свои работы, а покупателям — находить и приобретать необходимые инструменты. Интеграция с современными технологиями обеспечивает надежность и масштабируемость, создавая прочную основу для роста этого уникального IT-бизнеса.",
    },
    {
      client: "TREQ Logistics",
      image: "/project4.png",
      imageHint: "logistics company",
      stack: ["html", "scss", "js"],
      testimonial: "Для крупной логистической компании в России мы создали корпоративный сайт, который подчеркивает их надежность и масштаб. Ресурс предоставляет исчерпывающую информацию об услугах, помогает отслеживать грузы и оперативно связываться с поддержкой. Чистый и структурированный дизайн облегчает навигацию и укрепляет доверие клиентов, делая сайт важным звеном в их бизнес-процессах.",
    },
    {
      client: "Sferadannykh",
      image: "/project5.png",
      imageHint: "business automation",
      stack: ["html", "css", "js"],
      testimonial: "Этот проект был посвящен созданию сайта для компании, специализирующейся на автоматизации и продвижении бизнеса. Мы разработали ресурс, который не только информирует о сложных услугах простым языком, но и сам является примером эффективности. Сайт демонстрирует экспертность компании и служит мощным инструментом для генерации лидов, помогая бизнесам находить надежного партнера для цифровой трансформации.",
    },
    {
      client: "Gofrostal",
      image: "/project6.png",
      imageHint: "industrial holding",
      stack: ["html", "css", "js"],
      testimonial: "Мы разработали официальный сайт для ЗАО «Гофросталь», предприятия промышленного холдинга «Опытный завод «Гидромонтаж». Проект отражает промышленную мощь и инженерный опыт компании. Строгий, но информативный дизайн позволяет партнерам и клиентам легко находить техническую документацию, информацию о продукции и контакты. Сайт стал важным инструментом для поддержания имиджа лидера отрасли.",
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
