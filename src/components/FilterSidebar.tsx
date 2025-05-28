
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface FilterSidebarProps {
  filters: {
    priceRange: number[];
    bedrooms: string;
    bathrooms: string;
    propertyType: string;
    amenities: string[];
  };
  setFilters: (filters: any) => void;
}

const FilterSidebar = ({ filters, setFilters }: FilterSidebarProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const amenityOptions = [
    'Parking', 'Gym', 'Pool', 'Garden', 'Garage', 'Fireplace',
    'Balcony', 'Concierge', 'Water View', 'Patio', 'Basement'
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter(a => a !== amenity);
    
    setFilters({ ...filters, amenities: newAmenities });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 2000000],
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      amenities: []
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              max={2000000}
              min={0}
              step={10000}
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <h4 className="font-medium mb-3">Bedrooms</h4>
          <div className="grid grid-cols-4 gap-2">
            {['1', '2', '3', '4+'].map((bed) => (
              <Button
                key={bed}
                variant={filters.bedrooms === bed ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters({ 
                  ...filters, 
                  bedrooms: filters.bedrooms === bed ? '' : bed 
                })}
              >
                {bed}
              </Button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <h4 className="font-medium mb-3">Bathrooms</h4>
          <div className="grid grid-cols-4 gap-2">
            {['1', '2', '3', '4+'].map((bath) => (
              <Button
                key={bath}
                variant={filters.bathrooms === bath ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters({ 
                  ...filters, 
                  bathrooms: filters.bathrooms === bath ? '' : bath 
                })}
              >
                {bath}
              </Button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h4 className="font-medium mb-3">Property Type</h4>
          <div className="space-y-2">
            {['House', 'Apartment', 'Condo', 'Townhouse', 'Studio'].map((type) => (
              <Button
                key={type}
                variant={filters.propertyType === type ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setFilters({ 
                  ...filters, 
                  propertyType: filters.propertyType === type ? '' : type 
                })}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-medium mb-3">Amenities</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {amenityOptions.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                />
                <label
                  htmlFor={amenity}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
