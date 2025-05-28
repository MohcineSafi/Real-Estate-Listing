
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

// Mock property data (same as in PropertyGrid)
const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    address: "123 Main St, Downtown",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop"
    ],
    type: "Apartment",
    amenities: ["Parking", "Gym", "Pool", "Balcony", "Concierge"],
    description: "Beautiful modern apartment in the heart of downtown. This stunning 2-bedroom, 2-bathroom unit features floor-to-ceiling windows with breathtaking city views, premium finishes throughout, and access to world-class amenities."
  },
  {
    id: 2,
    title: "Spacious Family Home",
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    address: "456 Oak Ave, Suburbia",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&h=500&fit=crop"
    ],
    type: "House",
    amenities: ["Garden", "Garage", "Fireplace", "Basement", "Patio"],
    description: "Perfect family home with spacious rooms and a beautiful backyard. This well-maintained property offers comfort and convenience in a quiet neighborhood."
  }
];

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const property = mockProperties.find(p => p.id === parseInt(id || '1')) || mockProperties[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="grid grid-cols-1 gap-2">
                  {property.images?.slice(1, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-[188px] object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {property.title}
                    </h1>
                    <p className="text-gray-600">{property.address}</p>
                  </div>
                  <Badge className="bg-blue-600">
                    {property.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 mb-6 text-lg">
                  <span className="font-semibold">{property.bedrooms} bedrooms</span>
                  <span className="font-semibold">{property.bathrooms} bathrooms</span>
                  <span className="font-semibold">{property.sqft.toLocaleString()} sqft</span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  {formatPrice(property.price)}
                </div>

                <div className="space-y-4 mb-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Schedule Tour
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save Property
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Property Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type</span>
                      <span>{property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Square Footage</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per sqft</span>
                      <span>${Math.round(property.price / property.sqft)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
