import { properties, propertyTypes, cities } from "@/lib/data";
import { PropertyFilters } from "./property-filters";
import { PropertyCard } from "@/components/property-card";

export default function PropertiesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Explore Properties</h1>
      <p className="text-muted-foreground mb-8">Find your next home or investment from our curated listings.</p>
      
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <aside className="lg:col-span-1 mb-8 lg:mb-0">
          <PropertyFilters propertyTypes={propertyTypes} cities={cities} />
        </aside>
        <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
