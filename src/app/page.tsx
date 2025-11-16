import Image from 'next/image';
import Link from 'next/link';
import { properties, propertyTypes, cities } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Home as HomeIcon, IndianRupee, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
const testimonialImages = [
  PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  PlaceHolderImages.find(p => p.id === 'testimonial-2'),
  PlaceHolderImages.find(p => p.id === 'testimonial-3'),
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && 
          <Image
            src={heroImage.imageUrl}
            alt="Beautiful modern house"
            fill
            className="object-cover brightness-50"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        }
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-4xl font-bold md:text-6xl drop-shadow-md">
            Apna Sapna, Apna Address
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow">
            Find your dream property from thousands of listings across India.
          </p>
          <Card className="mt-8 w-full max-w-4xl bg-white/20 p-4 backdrop-blur-sm border-white/30">
            <form className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
              <div className="md:col-span-1">
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium"
                >
                  City
                </label>
                <Select>
                  <SelectTrigger id="city" className="bg-background text-foreground">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="property-type"
                  className="mb-2 block text-sm font-medium"
                >
                  Property Type
                </label>
                <Select>
                  <SelectTrigger
                    id="property-type"
                    className="bg-background text-foreground"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(type => <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-medium"
                >
                  Budget
                </label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Max Price"
                  className="bg-background text-foreground"
                />
              </div>
              <Button type="submit" className="h-10 w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="mb-2 text-center text-3xl font-bold">
            Featured Properties
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Handpicked properties by our team
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card/50 py-16 sm:py-24">
        <div className="container">
          <h2 className="mb-2 text-center text-3xl font-bold">
            Why Choose ApnaAddress?
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Your trusted partner in finding the perfect property.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HomeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Vast Selection</h3>
              <p className="mt-2 text-muted-foreground">
                Access thousands of residential, commercial, and rental
                properties across India.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Verified Listings</h3>
              <p className="mt-2 text-muted-foreground">
                We ensure all properties are verified, providing you with
                trustworthy options.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <IndianRupee className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Transparent Pricing</h3>
              <p className="mt-2 text-muted-foreground">
                No hidden costs. We believe in clear and upfront pricing for
                all listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="mb-2 text-center text-3xl font-bold">
            What Our Customers Say
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Real stories from happy homeowners.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">
                  "ApnaAddress made our dream of owning a home a reality. The
                  process was so smooth and transparent!"
                </p>
                <div className="mt-6 flex items-center">
                  <Avatar>
                    {testimonialImages[0] && <AvatarImage src={testimonialImages[0].imageUrl} data-ai-hint={testimonialImages[0].imageHint} />}
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Sunita Sharma</p>
                    <p className="text-sm text-muted-foreground">Mumbai, MH</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Found the perfect office space for my startup in just a
                  week. Highly recommended!"
                </p>
                <div className="mt-6 flex items-center">
                  <Avatar>
                    {testimonialImages[1] && <AvatarImage src={testimonialImages[1].imageUrl} data-ai-hint={testimonialImages[1].imageHint} />}
                    <AvatarFallback>RV</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Rohan Verma</p>
                    <p className="text-sm text-muted-foreground">
                      Bangalore, KA
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Their AI recommender is surprisingly accurate. It helped me
                  discover properties I wouldn't have found otherwise."
                </p>
                <div className="mt-6 flex items-center">
                  <Avatar>
                    {testimonialImages[2] && <AvatarImage src={testimonialImages[2].imageUrl} data-ai-hint={testimonialImages[2].imageHint} />}
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">Anjali Patel</p>
                    <p className="text-sm text-muted-foreground">
                      Ahmedabad, GJ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
