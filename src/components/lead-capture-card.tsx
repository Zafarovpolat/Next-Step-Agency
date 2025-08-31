
"use client";
import { useState, type FormEvent, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { submitLead } from "@/app/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Plan = 'Starter' | 'Business' | 'Premium' | '';

export default function LeadCaptureCard({ 
  className, 
  showHeader = false,
  selectedPlan,
  setSelectedPlan
}: { 
  className?: string; 
  showHeader?: boolean;
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
}) {
  const { translations } = useLanguage();
  const { leadCaptureSection: t } = translations;
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const planTranslations = {
      'Starter': translations.pricingSection.plans.starter.name,
      'Business': translations.pricingSection.plans.business.name,
      'Premium': translations.pricingSection.plans.premium.name,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const planKey = formData.get('plan_key') as keyof typeof planTranslations;
    formData.append('plan', planTranslations[planKey]);

    try {
      const result = await submitLead(formData);

      if (result.success) {
        setStatus("success");
      } else {
        setError(result.error || "An unknown error occurred.");
        setStatus("idle");
      }
    } catch (e) {
      setError(t.error.allFields);
      setStatus("idle");
    }
  }
  
  useEffect(() => {
    // If the card becomes visible and the plan is not set, default to Starter
    if (selectedPlan === '') {
        setSelectedPlan('Starter');
    }
  }, []);

  return (
    <Card className={cn("bg-card/80 backdrop-blur-sm border-secondary shadow-xl", className)}>
        {status === "success" ? (
            <CardContent className="p-10 text-center flex flex-col items-center gap-4 success-animation">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h2 className="text-2xl font-bold text-foreground">{t.success.title}</h2>
                <p className="text-muted-foreground">{t.success.message}</p>
            </CardContent>
        ) : (
            <>
                {showHeader && (
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl md:text-4xl font-bold font-headline">{t.title}</CardTitle>
                        <CardDescription className="text-base md:text-lg">
                        {t.subtitle}
                        </CardDescription>
                    </CardHeader>
                )}
                <CardContent className={cn(!showHeader && "pt-6")}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="plan-select">{t.placeholders.plan}</Label>
                          <Select name="plan_key" required value={selectedPlan} onValueChange={(value) => setSelectedPlan(value as Plan)}>
                              <SelectTrigger id="plan-select" className="dark-glass">
                                  <SelectValue placeholder={t.placeholders.plan} />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="Starter">{planTranslations['Starter']}</SelectItem>
                                  <SelectItem value="Business">{planTranslations['Business']}</SelectItem>
                                  <SelectItem value="Premium">{planTranslations['Premium']}</SelectItem>
                              </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input name="name" placeholder={t.placeholders.name} required className="dark-glass" />
                            <Input name="phone" type="tel" placeholder={t.placeholders.phone} required className="dark-glass"/>
                        </div>
                        <Input name="email" type="email" placeholder={t.placeholders.email} required className="dark-glass"/>
                        <Input name="company" placeholder={t.placeholders.company} className="dark-glass"/>
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
        <style jsx>{`
            @keyframes success-fade-in {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            .success-animation {
                animation: success-fade-in 0.5s ease-out forwards;
            }
            .dark .dark-glass {
                background-color: hsl(var(--brand-blue-1) / 0.5);
                backdrop-filter: blur(4px);
                border-color: hsl(var(--brand-blue-2));
            }
            .dark .dark-glass:focus {
                --tw-ring-color: hsl(var(--primary));
                box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            }
        `}</style>
    </Card>
  );
}
