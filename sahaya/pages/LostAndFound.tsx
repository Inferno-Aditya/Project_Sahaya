import React, { useState } from 'react';
import Layout from '../components/Layout';
import { AlertTriangle, MapPin, Phone, Calendar, Search, Eye, CheckCircle, Share2, PlusCircle, Filter } from 'lucide-react';

interface Alert {
    id: number;
    type: 'lost' | 'found';
    name: string;
    breed: string;
    location: string;
    date: string;
    image: string;
    contact: string;
    reward?: string;
    description: string;
}

const MOCK_ALERTS: Alert[] = [
  { 
    id: 1, 
    type: 'lost', 
    name: 'Buddy', 
    breed: 'Golden Retriever', 
    location: 'Indiranagar, 12th Main', 
    date: '2 hours ago', 
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', 
    contact: '+91 999 888 7777', 
    reward: '₹5,000',
    description: 'Wearing a red collar with a tag. Very friendly but scared of loud noises.' 
  },
  { 
    id: 2, 
    type: 'found', 
    name: 'Unknown Cat', 
    breed: 'Persian (White)', 
    location: 'Koramangala Park', 
    date: 'Yesterday, 5 PM', 
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', 
    contact: 'Sahaya Help Center',
    description: 'Found near the swings. Has a slight limp on the left hind leg. Safe with local shelter.'
  },
  { 
    id: 3, 
    type: 'lost', 
    name: 'Max', 
    breed: 'Beagle', 
    location: 'HSR Layout, Sector 2', 
    date: '3 hours ago', 
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=600&q=80', 
    contact: '+91 987 654 3210', 
    reward: '₹2,000',
    description: 'Ran off chasing a squirrel. Microchipped.' 
  },
  { 
    id: 4, 
    type: 'found', 
    name: 'Unknown Puppy', 
    breed: 'Indie / Mix', 
    location: 'MG Road Metro', 
    date: 'Today Morning', 
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9205?auto=format&fit=crop&w=600&q=80', 
    contact: 'Bangalore Metro Security',
    description: 'Found wandering near the station entrance. Very playful.'
  },
];

const LostAndFound: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAlerts = MOCK_ALERTS.filter(alert => {
        const matchesFilter = filter === 'all' || alert.type === filter;
        const matchesSearch = alert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              alert.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              alert.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <Layout>
            <div className="p-4 md:p-8 space-y-6 pb-24">
                
                {/* Header */}
                <div className="bg-red-50 rounded-3xl p-6 md:p-8 border border-red-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-red-600 flex items-center gap-3">
                            <AlertTriangle size={32} className="animate-pulse" />
                            Lost & Found
                        </h1>
                        <p className="text-red-800 mt-2 font-medium max-w-xl">
                            Help reunite pets with their families. If you've seen a lost pet or lost your own, report it here immediately. The community is here to help.
                        </p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-red-200 transition-all hover:scale-105 flex items-center gap-2 w-full md:w-auto justify-center">
                        <PlusCircle size={20} />
                        Report a Pet
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-0 md:top-auto z-10 bg-brand-bg py-2 md:py-0">
                    <div className="flex p-1.5 bg-white rounded-xl border border-brand-border w-full md:w-auto shadow-sm">
                        {['all', 'lost', 'found'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                                    filter === f 
                                    ? 'bg-brand-dark text-white shadow-md' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80 group">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-gray-400 group-focus-within:text-brand-primary transition-colors" size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search by breed, location..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm shadow-sm" 
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAlerts.map(alert => (
                        <div key={alert.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-border group flex flex-col">
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <img src={alert.image} alt={alert.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
                                        alert.type === 'lost' 
                                        ? 'bg-red-500 text-white animate-pulse' 
                                        : 'bg-green-500 text-white'
                                    }`}>
                                        {alert.type}
                                    </span>
                                </div>
                                {alert.reward && (
                                    <div className="absolute bottom-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                                        <span>Reward: {alert.reward}</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-extrabold text-brand-dark">{alert.name}</h3>
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{alert.breed}</span>
                                </div>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3 text-sm text-gray-600">
                                        <MapPin size={18} className="text-brand-primary flex-shrink-0 mt-0.5" />
                                        <span>Last seen at <span className="font-bold text-gray-800">{alert.location}</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Calendar size={18} className="text-brand-primary flex-shrink-0" />
                                        <span>{alert.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        "{alert.description}"
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto flex gap-3">
                                    <button className="flex-1 bg-brand-dark hover:bg-brand-primary text-white py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md">
                                        <Phone size={16} /> Contact
                                    </button>
                                    <button className="px-4 py-3 border border-brand-border rounded-xl hover:bg-gray-50 text-gray-600 transition-colors">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add Alert Card Placeholder */}
                    <div className="border-3 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group min-h-[400px]">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                             <PlusCircle size={32} className="text-gray-400 group-hover:text-brand-primary" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-600 mb-2">Have you seen a pet?</h3>
                        <p className="text-sm text-gray-400 max-w-xs">Upload a photo and details to help others in the community.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LostAndFound;