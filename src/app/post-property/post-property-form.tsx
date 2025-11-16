"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const formSchema = z.object({
  propertyType: z.string({ required_error: "Please select a property type." }),
  city: z.string({ required_error: "Please select a city." }),
  size: z.coerce.number().positive({ message: "Please enter a valid size." }),
  price: z.coerce.number().positive({ message: "Please enter a valid price." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  contact: z.string().min(10, { message: "Please provide valid contact info." }),
});

export function PostPropertyForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            contact: "",
        },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Property Submitted!",
      description: "Your property has been submitted for review. Thank you!",
    });
    form.reset();
  }

  return (
    <Card className="mt-8">
        <CardContent className="p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        name="contact"
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
                    
                    <Button type="submit" size="lg" className="w-full">Submit Property</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
