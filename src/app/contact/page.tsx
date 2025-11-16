import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mapImage = PlaceHolderImages.find(p => p.id === 'map-1');

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold">Get in Touch</h1>
        <p className="mt-2 text-muted-foreground">We'd love to hear from you. Please fill out the form below.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help?" className="min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <span>123 Realty Lane, Property City, <br />Mumbai, MH 400001, India</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                <span>contact@apnaaddress.in</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md">
             {mapImage &&
                <Image 
                    src={mapImage.imageUrl} 
                    alt="Map of office location" 
                    fill
                    className="object-cover"
                    data-ai-hint={mapImage.imageHint}
                />
             }
          </div>
        </div>
      </div>
    </div>
  );
}
