
"use client";
import { useState, type FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function LeadCaptureSection() {
  const { translations } = useLanguage();
  const { leadCaptureSection: t } = translations;
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    if (!data.name || !data.email || !data.phone) {
        setError(t.error.allFields);
        setStatus("idle");
        return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success
    console.log("Form submitted:", data);
    setStatus("success");
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-secondary shadow-xl">
                {status === "success" ? (
                    <CardContent className="p-10 text-center flex flex-col items-center gap-4 success-animation">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                        <h2 className="text-2xl font-bold text-foreground">{t.success.title}</h2>
                        <p className="text-muted-foreground">{t.success.message}</p>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl md:text-4xl font-bold font-headline">{t.title}</CardTitle>
                            <CardDescription className="text-lg">
                            {t.subtitle}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input name="name" placeholder={t.placeholders.name} required className="bg-input/50" />
                                    <Input name="phone" type="tel" placeholder={t.placeholders.phone} required className="bg-input/50"/>
                                </div>
                                <Input name="email" type="email" placeholder={t.placeholders.email} required className="bg-input/50"/>
                                <Input name="company" placeholder={t.placeholders.company} className="bg-input/50"/>
                                <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {t.submitting}
                                        </>
                                    ) : (
                                        t.buttonText
                                    )}
                                </Button>
                                {error && <p className="text-sm text-destructive text-center">{error}</p>}
                            </form>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
      </div>
      <style jsx>{`
        @keyframes success-fade-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .success-animation {
            animation: success-fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
