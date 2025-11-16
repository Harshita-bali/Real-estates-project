export type Property = {
  id: string;
  title: string;
  type: 'Residential' | 'Commercial' | 'Plot' | 'Rental';
  location: string;
  city: string;
  price: number;
  size: number; // in sqft
  bedrooms?: number;
  bathrooms?: number;
  imageUrl: string;
  imageHint: string;
  userId?: string;
  contactInfo?: string;
};
