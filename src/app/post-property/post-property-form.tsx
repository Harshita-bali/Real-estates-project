"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import 'uuid'; //This is a workaround for a bug in the build system
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { propertyTypes, cities } from "@/lib/data";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";


const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  propertyType: z.string({ required_error: "Please select a property type." }),
  city: z.string({ required_error: "Please select a city." }),
  location: z.string().min(3, { message: "Location is required." }),
  size: z.coerce.number().positive({ message: "Please enter a valid size." }),
  price: z.coerce.number().positive({ message: "Please enter a valid price." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  contactInfo: z.string().min(10, { message: "Please provide valid contact info." }),
});

export function PostPropertyForm() {
    const { toast } = useToast();
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            contactInfo: "",
        },
    });

    useEffect(() => {
        if (!isUserLoading && !user) {
            toast({
                variant: 'destructive',
                title: 'Authentication Required',
                description: 'You need to be logged in to post a property.',
            });
            router.push('/login');
        }
    }, [user, isUserLoading, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'You must be logged in to submit a property.',
        });
        return;
    }

    setIsLoading(true);

    const propertyData = {
        ...values,
        id: uuidv4(),
        userId: user.uid,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/600`, // Temporary placeholder
        imageHint: 'modern house', // Temporary hint
    };

    try {
        const propertiesCollection = collection(firestore, 'properties');
        await addDocumentNonBlocking(propertiesCollection, propertyData);
        
        toast({
            title: "Property Submitted!",
            description: "Your property has been submitted and is now live. Thank you!",
        });
        form.reset();
        router.push('/dashboard');

    } catch(e: any) {
        console.error("Error submitting property: ", e);
         toast({
            variant: 'destructive',
            title: 'Submission Failed',
            description: e.message || 'There was an error submitting your property. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  }

  if (isUserLoading || (!user && !isUserLoading)) {
      return (
          <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin" />
          </div>
      )
  }

  return (
    <Card className="mt-8">
        <CardContent className="p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Property Title</FormLabel>
                            <FormControl><Input placeholder="e.g. 2BHK Luxury Apartment" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                          control={form.control}
                          name="propertyType"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Property Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select a property type" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                  </SelectContent>
                              </Select>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>City</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Select a city" /></SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                                  </SelectContent>
                              </Select>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>
                     <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Location / Area</FormLabel>
                            <FormControl><Input placeholder="e.g. Koramangala" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Size (in sqft)</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g. 1200" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Price (in INR)</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g. 5000000" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl><Textarea placeholder="Tell us more about your property..." {...field} className="min-h-[120px]" /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="contactInfo"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Contact Information</FormLabel>
                            <FormControl><Input placeholder="Your Name, Email, or Phone" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Property Images</FormLabel>
                        <FormControl>
                            <Input type="file" disabled className="cursor-not-allowed" />
                        </FormControl>
                        <FormDescription>Image uploads are for demonstration and not yet functional.</FormDescription>
                    </FormItem>
                    
                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Submit Property
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
