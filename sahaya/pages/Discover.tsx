import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Users, MapPin, Search, Filter, Heart, Calendar, Stethoscope, Award, Home as HomeIcon, PawPrint } from 'lucide-react';

interface Community {
    id: string;
    name: string;
    members: string;
    type: 'Breeds' | 'Location' | 'Medical' | 'Training' | 'Events' | 'Adoption';
    image: string;
    joined: boolean;
    description: string;
}

const ALL_COMMUNITIES: Community[] = [
    // --- BREEDS ---
    { id: 'b1', name: 'Golden Retriever Lovers', members: '12.5k', type: 'Breeds', image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Everything goldens! From grooming tips to endless shedding support.' },
    { id: 'b2', name: 'Frenchie Friends', members: '8.2k', type: 'Breeds', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80', joined: true, description: 'A squishy face community for French Bulldog owners.' },
    { id: 'b3', name: 'German Shepherd Squad', members: '15k', type: 'Breeds', image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Training, working dogs, and GSD health discussions.' },
    { id: 'b4', name: 'Maine Coon Club', members: '6.4k', type: 'Breeds', image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=400&q=80', joined: false, description: 'For the gentle giants of the cat world.' },
    { id: 'b5', name: 'Beagle Brigade', members: '5.1k', type: 'Breeds', image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Arooo! Tracking tips and stubborn beagle stories.' },

    // --- LOCATION ---
    { id: 'l1', name: 'NYC Dog Moms', members: '22k', type: 'Location', image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9205?auto=format&fit=crop&w=400&q=80', joined: true, description: 'Navigating city life with four legs in the Big Apple.' },
    { id: 'l2', name: 'Bangalore Pet Parents', members: '18k', type: 'Location', image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Cubbon park meetups and vet recommendations in BLR.' },
    { id: 'l3', name: 'London Cat Owners', members: '9.3k', type: 'Location', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Flat living and cat proofing in London.' },
    { id: 'l4', name: 'Austin Hiking Dogs', members: '4.5k', type: 'Location', image: 'https://images.unsplash.com/photo-1551637021-4b13c1266205?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Trail guides and group hikes in Texas.' },
    { id: 'l5', name: 'Tokyo Shiba Inu Meet', members: '3.2k', type: 'Location', image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Shiba gatherings in Yoyogi Park.' },

    // --- MEDICAL ---
    { id: 'm1', name: 'Diabetic Dog Support', members: '2.1k', type: 'Medical', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Insulin tips, diet advice, and emotional support.' },
    { id: 'm2', name: 'Feline Kidney Care', members: '3.8k', type: 'Medical', image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Managing CKD in senior cats.' },
    { id: 'm3', name: 'Hip Dysplasia Warriors', members: '5.5k', type: 'Medical', image: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Surgery recovery, physio, and mobility aids.' },
    { id: 'm4', name: 'Pet Allergy Solutions', members: '1.9k', type: 'Medical', image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Dealing with food and environmental allergies.' },
    { id: 'm5', name: 'Senior Pet Wellness', members: '7.2k', type: 'Medical', image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Making the golden years comfortable.' },

    // --- TRAINING ---
    { id: 't1', name: 'Puppy Kindergarten', members: '12k', type: 'Training', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80', joined: true, description: 'Potty training, biting, and socialization 101.' },
    { id: 't2', name: 'Agility Champions', members: '3.4k', type: 'Training', image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Speed, weave poles, and competition prep.' },
    { id: 't3', name: 'Reactive Dog Rehab', members: '6.7k', type: 'Training', image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Safe space for owners of anxious or reactive dogs.' },
    { id: 't4', name: 'Trick Training 101', members: '4.1k', type: 'Training', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Teach your pet cool party tricks!' },
    { id: 't5', name: 'Cat Behavioral Tips', members: '2.8k', type: 'Training', image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Solving litter box issues and scratching.' },

    // --- EVENTS ---
    { id: 'e1', name: 'Sunday Park Day', members: '800', type: 'Events', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Weekly gatherings at Central Park.' },
    { id: 'e2', name: 'Pet CPR Workshop', members: '150', type: 'Events', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Learn life-saving skills for your pets.' },
    { id: 'e3', name: 'Charity Dog Walk', members: '1.2k', type: 'Events', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Walk for a cause. Raising money for shelters.' },
    { id: 'e4', name: 'Halloween Pet Parade', members: '3k', type: 'Events', image: 'https://images.unsplash.com/photo-1599409822765-696c21a41531?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Spooky costumes and prizes!' },
    { id: 'e5', name: 'Summer Splash Party', members: '500', type: 'Events', image: 'https://images.unsplash.com/photo-1506488352654-7389c898c619?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Pool party for pups at the local lido.' },

    // --- ADOPTION ---
    { id: 'a1', name: 'Senior Dog Rescue', members: '5.6k', type: 'Adoption', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Finding forever homes for old souls.' },
    { id: 'a2', name: 'Kitten Foster Network', members: '4.2k', type: 'Adoption', image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Help raise kittens until they are ready for adoption.' },
    { id: 'a3', name: 'Street Dog Adoptions', members: '8.9k', type: 'Adoption', image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80', joined: true, description: 'Supporting Indies and street dogs.' },
    { id: 'a4', name: 'Rabbit Rescue', members: '1.5k', type: 'Adoption', image: 'https://images.unsplash.com/photo-1585110396065-88b74f368e4e?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Bunny adoption and care education.' },
    { id: 'a5', name: 'Second Chance Shelter', members: '10k', type: 'Adoption', image: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=400&q=80', joined: false, description: 'Giving every pet a second chance at love.' },
];

const Discover: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [communities, setCommunities] = useState<Community[]>(ALL_COMMUNITIES);

    const handleJoin = (id: string) => {
        setCommunities(prev => prev.map(c => 
            c.id === id ? { ...c, joined: !c.joined } : c
        ));
    };

    const categories = ['All', 'Breeds', 'Location', 'Medical', 'Training', 'Events', 'Adoption'];

    const filteredCommunities = communities.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              c.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || c.type === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Helper to get icon for category
    const getCategoryIcon = (type: string) => {
        switch(type) {
            case 'Breeds': return PawPrint;
            case 'Location': return MapPin;
            case 'Medical': return Stethoscope;
            case 'Training': return Award;
            case 'Events': return Calendar;
            case 'Adoption': return HomeIcon;
            default: return Users;
        }
    }

    return (
        <Layout>
            <div className="p-4 md:p-8 space-y-8 pb-24">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-brand-primaryLight/20 p-6 rounded-3xl border border-brand-primary/10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-brand-dark flex items-center gap-2">
                            <Search className="text-brand-primary" />
                            Discover
                        </h1>
                        <p className="text-brand-muted mt-2 max-w-md">Find your pack, join local meetups, or get support from communities that care.</p>
                    </div>
                    
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="text-gray-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                        </div>
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Find communities, breeds, events..." 
                            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-transparent shadow-sm transition-all" 
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                            <Filter className="text-gray-400 hover:text-brand-dark" size={18} />
                        </div>
                    </div>
                </div>

                {/* Categories Pills */}
                <div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 items-center">
                        {categories.map((cat) => (
                            <button 
                                key={cat} 
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                                    activeCategory === cat 
                                    ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20' 
                                    : 'bg-white border border-brand-border text-gray-600 hover:border-brand-primary hover:text-brand-primary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results List */}
                <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-brand-dark text-lg flex items-center gap-2">
                             {activeCategory === 'All' ? 'Trending Communities' : `${activeCategory} Communities`}
                             <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">{filteredCommunities.length}</span>
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredCommunities.map((comm) => {
                            const Icon = getCategoryIcon(comm.type);
                            return (
                                <div key={comm.id} className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl border border-brand-border transition-all duration-300 group hover:-translate-y-1 flex flex-col h-full">
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative">
                                            <img src={comm.image} alt={comm.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-tl-lg">
                                                <Icon size={12} className="text-brand-primary" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-lg text-brand-dark truncate group-hover:text-brand-primary transition-colors">{comm.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="bg-brand-bg text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{comm.type}</span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                                                    <Users size={12} />
                                                    {comm.members} Members
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1 leading-relaxed">
                                        {comm.description}
                                    </p>

                                    <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                    <img src={`https://ui-avatars.com/api/?name=User${i}&background=random`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
                                                +
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleJoin(comm.id)}
                                            className={`text-xs font-bold px-6 py-2 rounded-xl transition-all duration-300 ${
                                                comm.joined 
                                                ? 'bg-brand-primaryLight/50 text-brand-primary border border-brand-primary/20' 
                                                : 'bg-brand-dark text-white hover:bg-brand-primary hover:shadow-lg shadow-md'
                                            }`}
                                        >
                                            {comm.joined ? 'Joined' : 'Join'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {filteredCommunities.length === 0 && (
                            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center text-gray-400">
                                <Search size={48} className="mb-4 text-gray-200" />
                                <p className="text-lg font-medium text-gray-500">No communities found matching "{searchTerm}"</p>
                                <p className="text-sm">Try adjusting your filters or search term.</p>
                                <button onClick={() => {setActiveCategory('All'); setSearchTerm('')}} className="mt-4 text-brand-primary font-bold hover:underline">Clear Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Discover;