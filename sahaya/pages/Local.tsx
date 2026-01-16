import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { findNearbyPlaces } from '../services/gemini';
import { MapPin, Navigation, Star, Coffee, Stethoscope, Trees, ShoppingBag, Grid } from 'lucide-react';

const Local: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [placesData, setPlacesData] = useState<{text: string, chunks: any[]} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
      { id: 'All', label: 'All', icon: Grid, query: 'parks, cafes, or vet clinics' },
      { id: 'Cafes', label: 'Cafes', icon: Coffee, query: 'cafes and restaurants' },
      { id: 'Vets', label: 'Vets', icon: Stethoscope, query: 'veterinary clinics and hospitals' },
      { id: 'Parks', label: 'Parks', icon: Trees, query: 'parks and dog runs' },
      { id: 'Shops', label: 'Shops', icon: ShoppingBag, query: 'pet food and supply stores' },
  ];

  // Fetch places whenever location or activeFilter changes
  useEffect(() => {
    const fetchPlaces = async () => {
        if (!location) return;

        setLoading(true);
        setError(null);
        
        try {
            const selectedFilter = filters.find(f => f.id === activeFilter);
            const query = selectedFilter ? selectedFilter.query : 'places';
            const result = await findNearbyPlaces(location.lat, location.lng, query);
            setPlacesData(result);
        } catch (e) {
            setError("Could not find places.");
        } finally {
            setLoading(false);
        }
    };

    fetchPlaces();
  }, [location, activeFilter]);

  // Initial Geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          // Note: The other useEffect will trigger the actual fetch once location is set
        },
        (err) => {
          setError("Please enable location access to see places near you.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  return (
    <Layout>
      <div className="h-full flex flex-col md:p-6">
         <div className="bg-white p-6 md:rounded-3xl shadow-sm border border-brand-border mb-6 relative overflow-hidden flex-shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <h1 className="text-2xl font-extrabold text-brand-dark mb-2 flex items-center gap-2 relative z-10">
                <MapPin className="text-brand-primary" />
                Near Me
            </h1>
            <p className="text-gray-600 relative z-10">Discovering top-rated pet friendly spots using Google Maps & AI.</p>
         </div>

         {/* Filters */}
         <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 px-4 md:px-0 pb-2 flex-shrink-0">
            {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;
                return (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                            isActive 
                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 scale-105' 
                            : 'bg-white border border-brand-border text-gray-600 hover:border-brand-primary hover:text-brand-primary'
                        }`}
                    >
                        <Icon size={16} />
                        {filter.label}
                    </button>
                );
            })}
         </div>

         {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                 <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-brand-dark font-medium animate-pulse">Scouting local {filters.find(f => f.id === activeFilter)?.label.toLowerCase()}...</p>
             </div>
         ) : error ? (
             <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl mx-4">{error}</div>
         ) : (
             <div className="flex-1 overflow-y-auto px-4 md:px-0 pb-20">
                 {/* Render AI Summary Text */}
                 <div className="bg-brand-primaryLight/30 p-6 rounded-2xl border border-brand-primary/10 mb-6 prose text-brand-dark">
                     <p className="whitespace-pre-wrap leading-relaxed">{placesData?.text}</p>
                 </div>

                 {/* Render Grounding Chunks (Real Maps Data) */}
                 {placesData?.chunks && placesData.chunks.length > 0 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {placesData.chunks.map((chunk, idx) => {
                             // Extract web or map data
                             const data = chunk.web || chunk.maps; 
                             const uri = data?.uri;
                             const title = data?.title || "Location";
                             
                             if (!uri) return null;

                             return (
                                 <a href={uri} target="_blank" rel="noopener noreferrer" key={idx} className="block group">
                                     <div className="bg-white p-4 rounded-xl border border-brand-border hover:border-brand-primary transition shadow-sm hover:shadow-md h-full flex flex-col">
                                         <div className="flex justify-between items-start mb-2">
                                             <div className="w-10 h-10 bg-brand-bg rounded-full flex items-center justify-center text-brand-dark group-hover:bg-brand-primary group-hover:text-white transition">
                                                 <Navigation size={20} />
                                             </div>
                                             <Star size={16} className="text-yellow-400 fill-current" />
                                         </div>
                                         <h3 className="font-bold text-brand-dark mb-1 group-hover:text-brand-primary transition">{title}</h3>
                                         <p className="text-xs text-gray-500 line-clamp-2">View details on Google Maps</p>
                                     </div>
                                 </a>
                             )
                         })}
                     </div>
                 )}
                 
                 {placesData?.chunks?.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">No specific map links found in the AI response.</p>
                 )}
             </div>
         )}
      </div>
    </Layout>
  );
};

export default Local;