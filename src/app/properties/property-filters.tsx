"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function PropertyFilters({ propertyTypes, cities }: { propertyTypes: string[], cities: string[] }) {
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filter Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select>
            <SelectTrigger id="city">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map(city => <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select>
            <SelectTrigger id="property-type">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {propertyTypes.map(type => <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Price Range</Label>
          <Slider
            min={0}
            max={50000000}
            step={100000}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}{priceRange[1] === 50000000 ? '+' : ''}</span>
          </div>
        </div>
        <Button className="w-full" disabled>Apply Filters</Button>
        <p className="text-xs text-center text-muted-foreground">Filtering functionality is a bonus feature and is currently for demonstration.</p>
      </CardContent>
    </Card>
  );
}
