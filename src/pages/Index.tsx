
import { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PropertyGrid from '../components/PropertyGrid';
import MapView from '../components/MapView';
import FilterSidebar from '../components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Map, Filter } from 'lucide-react';

const Index = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    amenities: [] as string[]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8">
        {/* View Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              onClick={() => setViewMode('grid')}
              size="sm"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'map' ? "default" : "outline"}
              onClick={() => setViewMode('map')}
              size="sm"
              className="flex items-center gap-2"
            >
              <Map size={16} />
              Map
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          )}
          
          {/* Content Area */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <PropertyGrid filters={filters} />
            ) : (
              <MapView filters={filters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
