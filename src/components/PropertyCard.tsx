
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  image: string;
  type: string;
  amenities: string[];
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <Card 
      className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-blue-600">
          {property.type}
        </Badge>
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-semibold text-blue-600">
          {formatPrice(property.price)}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">
          {property.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">{property.address}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {property.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
