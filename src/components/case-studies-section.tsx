
"use client"
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "./ui/badge";

const caseStudies = [
  {
    client: "TechCorp",
    beforeImage: "https://placehold.co/600x400.png",
    beforeHint: "old dashboard",
    afterImage: "https://placehold.co/600x400.png",
    afterHint: "new dashboard",
    kpis: [
      { metric: "Revenue", value: "+300%", change: "increase" },
      { metric: "Conversion", value: "+75%", change: "increase" },
      { metric: "AOV", value: "+50%", change: "increase" },
    ],
    testimonial: "Next Step Agency transformed our business. The results speak for themselves. We've never been more profitable.",
  },
  {
    client: "Innovate LLC",
    beforeImage: "https://placehold.co/600x400.png",
    beforeHint: "outdated website",
    afterImage: "https://placehold.co/600x400.png",
    afterHint: "modern website",
    kpis: [
      { metric: "User Engagement", value: "+250%", change: "increase" },
      { metric: "Lead Gen", value: "+120%", change: "increase" },
      { metric: "Bounce Rate", value: "-40%", change: "decrease" },
    ],
    testimonial: "The team's expertise in UI/UX and development is unmatched. Our new platform is a joy to use and has boosted engagement significantly.",
  },
  {
    client: "MarketPro",
    beforeImage: "https://placehold.co/600x400.png",
    beforeHint: "low traffic",
    afterImage: "https://placehold.co/600x400.png",
    afterHint: "high traffic",
    kpis: [
      { metric: "Organic Traffic", value: "+500%", change: "increase" },
      { metric: "Keyword Rankings", value: "+80%", change: "increase" },
      { metric: "Ad Spend ROI", value: "+150%", change: "increase" },
    ],
    testimonial: "Our visibility has skyrocketed since partnering with them. Their marketing strategies are data-driven and highly effective.",
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            Proven Results, Tangible Growth
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just promise results; we deliver them. Explore our case studies to see how we've helped businesses like yours achieve their goals.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {caseStudies.map((study, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm border-secondary hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-primary-foreground">{study.client}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="relative mb-4">
                        <div className="flex justify-between items-center mb-2 text-sm font-semibold">
                          <span>Before</span>
                          <span>After</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Image
                            src={study.beforeImage}
                            alt={`Before shot for ${study.client}`}
                            data-ai-hint={study.beforeHint}
                            width={300}
                            height={200}
                            className="rounded-md object-cover"
                          />
                          <Image
                            src={study.afterImage}
                            alt={`After shot for ${study.client}`}
                            data-ai-hint={study.afterHint}
                            width={300}
                            height={200}
                            className="rounded-md object-cover"
                          />
                        </div>
                      </div>
                      <div className="my-4">
                        <h4 className="font-semibold mb-2 text-primary-foreground">KPI Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.kpis.map((kpi, kpiIndex) => (
                            <Badge key={kpiIndex} variant={kpi.change === 'increase' ? 'default' : 'destructive'} className="bg-primary/20 text-primary-foreground border-primary/50">
                              {kpi.metric}: <span className="font-bold ml-1">{kpi.value}</span>
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
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
