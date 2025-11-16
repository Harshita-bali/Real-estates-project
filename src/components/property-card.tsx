import Image from 'next/image';
import { BedDouble, Bath, MapPin, IndianRupee, Framer } from 'lucide-react';
import type { Property } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="relative">
        <Image
          src={property.imageUrl}
          alt={property.title}
          width={400}
          height={300}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={property.imageHint}
        />
        <Badge
          className={cn("absolute right-2 top-2", property.type === 'Rental' && 'bg-accent text-accent-foreground')}
        >
          {property.type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-bold leading-tight truncate">{property.title}</h3>
        <div className="mb-3 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{property.location}, {property.city}</span>
        </div>
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {property.bedrooms && (
            <div className="flex items-center">
              <BedDouble className="mr-1.5 h-4 w-4 text-primary" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="mr-1.5 h-4 w-4 text-primary" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center">
            <Framer className="mr-1.5 h-4 w-4 text-primary" />
            <span>{property.size.toLocaleString()} sqft</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-primary">
            <IndianRupee className="inline h-5 w-5" />
            {property.price.toLocaleString('en-IN')}
            {property.type === 'Rental' && <span className="text-sm font-normal text-muted-foreground">/month</span>}
          </p>
          <Button>Contact</Button>
        </div>
      </CardContent>
    </Card>
  );
}
