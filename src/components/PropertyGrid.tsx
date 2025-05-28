
import { useState } from 'react';
import PropertyCard from './PropertyCard';
import { useQuery } from '@tanstack/react-query';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    address: "123 Main St, Downtown",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
    type: "Apartment",
    amenities: ["Parking", "Gym", "Pool"]
  },
  {
    id: 2,
    title: "Spacious Family Home",
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    address: "456 Oak Ave, Suburbia",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
    type: "House",
    amenities: ["Garden", "Garage", "Fireplace"]
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1800,
    address: "789 Sky Tower, Uptown",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=500&h=300&fit=crop",
    type: "Penthouse",
    amenities: ["Balcony", "Concierge", "Gym", "Pool"]
  },
  {
    id: 4,
    title: "Cozy Studio Loft",
    price: 320000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    address: "321 Art District, Creative Quarter",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
    type: "Studio",
    amenities: ["Parking", "Exposed Brick"]
  },
  {
    id: 5,
    title: "Suburban Townhouse",
    price: 580000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1600,
    address: "654 Maple Lane, Green Valley",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
    type: "Townhouse",
    amenities: ["Patio", "Garage", "Basement"]
  },
  {
    id: 6,
    title: "Waterfront Condo",
    price: 890000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    address: "987 Harbor View, Marina District",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop",
    type: "Condo",
    amenities: ["Water View", "Pool", "Gym", "Parking"]
  }
];

interface PropertyGridProps {
  filters: {
    priceRange: number[];
    bedrooms: string;
    bathrooms: string;
    propertyType: string;
    amenities: string[];
  };
}

const PropertyGrid = ({ filters }: PropertyGridProps) => {
  const { data: properties = mockProperties } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => {
      // Filter properties based on filters
      return mockProperties.filter(property => {
        const [minPrice, maxPrice] = filters.priceRange;
        const priceMatch = property.price >= minPrice && property.price <= maxPrice;
        
        const bedroomMatch = !filters.bedrooms || property.bedrooms.toString() === filters.bedrooms;
        const bathroomMatch = !filters.bathrooms || property.bathrooms >= parseFloat(filters.bathrooms);
        const typeMatch = !filters.propertyType || property.type === filters.propertyType;
        
        const amenityMatch = filters.amenities.length === 0 || 
          filters.amenities.every(amenity => property.amenities.includes(amenity));
        
        return priceMatch && bedroomMatch && bathroomMatch && typeMatch && amenityMatch;
      });
    }
  });

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">{properties.length} properties found</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
