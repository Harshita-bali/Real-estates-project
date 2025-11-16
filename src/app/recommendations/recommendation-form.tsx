"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { recommendRelevantProperties } from "@/ai/flows/recommend-relevant-properties";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  searchHistory: z.string().min(10, "Please provide more search history for better results."),
  savedProperties: z.string().min(10, "Please provide more saved properties for better results."),
  preferences: z.string().min(10, "Please provide more preferences for better results."),
});

type FormValues = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        searchHistory: "Searched for 3 BHK apartments in Bangalore, 2 BHK in Pune under 1 Cr.",
        savedProperties: "Saved a 1200 sqft apartment in Koramangala, Bangalore; a villa in Hitec City, Hyderabad.",
        preferences: "Looking for a family-friendly neighborhood with good schools nearby. A balcony and modern amenities are a must. Budget is flexible for the right property.",
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await recommendRelevantProperties(data);
      setRecommendation(result.propertyRecommendations);
    } catch (e) {
      console.error(e);
      setError("Failed to get recommendations. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Enter your details below to get personalized property recommendations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="searchHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., '2 BHK flats in Mumbai', 'plots near airport'"
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="savedProperties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saved Properties</FormLabel>
                    <FormControl>
                       <Textarea
                        placeholder="e.g., 'Villa in Goa', 'Apartment with sea view in Chennai'"
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Looking for a pet-friendly apartment with a gym. Near a metro station.'"
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                    "Get AI Recommendations"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="mt-8">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recommendation && (
          <Card className="bg-secondary/50">
              <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 shrink-0">
                      <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                      <CardTitle>Here are your recommendations!</CardTitle>
                      <CardDescription>Based on your profile, you might be interested in these.</CardDescription>
                  </div>
              </CardHeader>
              <CardContent>
                  <p className="whitespace-pre-wrap text-sm text-foreground/80">{recommendation}</p>
              </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
