'use client';
import { properties as staticProperties, propertyTypes, cities } from "@/lib/data";
import { PropertyFilters } from "./property-filters";
import { PropertyCard } from "@/components/property-card";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Property } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

export default function PropertiesPage() {
  const firestore = useFirestore();
  const propertiesCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'properties');
  }, [firestore]);

  const { data: dynamicProperties, isLoading } = useCollection<Property>(propertiesCollection);

  const allProperties = useMemo(() => {
    const combined = [...staticProperties];
    if (dynamicProperties) {
      // Avoid duplicates
      dynamicProperties.forEach(dp => {
        if (!combined.some(sp => sp.id === dp.id)) {
          combined.push(dp);
        }
      });
    }
    return combined;
  }, [dynamicProperties]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Explore Properties</h1>
      <p className="text-muted-foreground mb-8">Find your next home or investment from our curated listings.</p>
      
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <aside className="lg:col-span-1 mb-8 lg:mb-0">
          <PropertyFilters propertyTypes={propertyTypes} cities={cities} />
        </aside>
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {allProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
