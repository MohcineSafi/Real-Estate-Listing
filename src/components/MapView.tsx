
import { Card, CardContent } from '@/components/ui/card';

interface MapViewProps {
  filters: any;
}

const MapView = ({ filters }: MapViewProps) => {
  return (
    <Card className="h-[600px]">
      <CardContent className="p-0 h-full">
        <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Map View</h3>
            <p className="text-gray-600 text-sm max-w-sm">
              Interactive map will be added when Supabase integration is complete. 
              This will show property locations with clickable markers.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
