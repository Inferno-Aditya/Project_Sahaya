import React, { useState } from 'react';
import Layout from '../components/Layout';
import { CURRENT_USER, MY_PETS, MOCK_POSTS } from '../services/mockData';
import { Settings, MapPin, Activity, Award, Edit3, Plus, Heart, X, Save, Camera } from 'lucide-react';
import { User, Pet } from '../types';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'pets'>('pets');
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [pets, setPets] = useState<Pet[]>(MY_PETS);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | 'new' | null>(null);

  const userPosts = MOCK_POSTS.filter(p => p.userId === 'u1' || p.userId === 'u4'); 

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingUser(false);
  };

  const handleSavePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPet === 'new') {
       // Add mock new pet
       const newPet: Pet = {
           id: Date.now().toString(),
           name: (e.target as any).petName.value,
           species: (e.target as any).petSpecies.value,
           breed: (e.target as any).petBreed.value,
           age: parseInt((e.target as any).petAge.value),
           image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
           healthNotes: ['Healthy'],
           themeColor: '#0D9488'
       };
       setPets([...pets, newPet]);
    } else if (editingPet) {
        // Update existing pet
        const updatedPets = pets.map(p => p.id === editingPet.id ? {
            ...p,
            name: (e.target as any).petName.value,
            species: (e.target as any).petSpecies.value,
            breed: (e.target as any).petBreed.value,
            age: parseInt((e.target as any).petAge.value),
        } : p);
        setPets(updatedPets);
    }
    setEditingPet(null);
  };

  return (
    <Layout>
      <div className="bg-white rounded-b-3xl shadow-sm border-b border-brand-border overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-brand-primary to-brand-primaryLight"></div>
        
        <div className="px-6 relative">
             <div className="flex justify-between items-end -mt-12 mb-4">
                 <div className="relative group cursor-pointer">
                    <img src={user.avatar} alt="Me" className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover" />
                    <button className="absolute bottom-0 -right-2 bg-brand-dark text-white p-1.5 rounded-full hover:bg-brand-primary transition shadow-sm" onClick={() => setIsEditingUser(true)}>
                        <Edit3 size={12} />
                    </button>
                 </div>
                 <button onClick={() => setIsEditingUser(true)} className="bg-white border border-brand-border text-brand-dark p-2 rounded-xl hover:bg-gray-50 transition shadow-sm">
                    <Settings size={20} />
                 </button>
             </div>

            <div className="mb-6">
                 <h1 className="text-2xl font-extrabold text-brand-dark">{user.name}</h1>
                 <p className="text-brand-primary font-medium text-sm mb-2">{user.handle}</p>
                 <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 w-fit px-3 py-1 rounded-full">
                    <MapPin size={14} />
                    {user.location}
                 </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-brand-bg p-3 rounded-2xl text-center">
                    <span className="block font-extrabold text-xl text-brand-primary">{user.trustScore}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Trust Score</span>
                </div>
                <div className="bg-brand-bg p-3 rounded-2xl text-center">
                    <span className="block font-extrabold text-xl text-brand-dark">1.2k</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Followers</span>
                </div>
                <div className="bg-brand-bg p-3 rounded-2xl text-center">
                    <span className="block font-extrabold text-xl text-brand-dark">450</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Following</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                 <button
                    onClick={() => setActiveTab('pets')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === 'pets' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
                 >
                    My Pets
                 </button>
                 <button
                    onClick={() => setActiveTab('posts')}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${activeTab === 'posts' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-500 hover:text-brand-dark'}`}
                 >
                    Posts
                 </button>
            </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {activeTab === 'pets' ? (
            <div className="space-y-4">
                {pets.map(pet => (
                    <div key={pet.id} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-brand-border group hover:shadow-md transition-all relative">
                         <button 
                            onClick={() => setEditingPet(pet)}
                            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-gray-600 hover:text-brand-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                            <Edit3 size={16} />
                         </button>
                        <div className="flex">
                            <div className="w-1/3 relative">
                                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                            </div>
                            <div className="w-2/3 p-5 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-extrabold text-xl" style={{color: pet.themeColor}}>{pet.name}</h3>
                                        <span className="text-xs font-bold text-gray-400">{pet.breed} • {pet.age} yrs</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                        {pet.species === 'Dog' ? '🐕' : '🐈'}
                                    </div>
                                </div>
                                <div className="space-y-2 mt-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 px-2 py-1 rounded-md w-fit">
                                        <Activity size={14} className="text-green-500" />
                                        <span className="font-medium">{pet.healthNotes[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Award size={14} className="text-brand-secondary" />
                                        <span>Matches: <strong>12</strong> local playmates</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button 
                    onClick={() => setEditingPet('new')}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-3xl text-gray-400 font-bold hover:bg-white hover:border-brand-primary hover:text-brand-primary transition flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Add New Pet
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-3 gap-2">
                {userPosts.length > 0 ? userPosts.map(post => (
                    <div key={post.id} className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative group cursor-pointer">
                        <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="post" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold">
                            <Heart size={16} fill="white" /> {post.likes}
                        </div>
                    </div>
                )) : (
                    <div className="col-span-3 text-center py-10 text-gray-400">No posts yet.</div>
                )}
            </div>
        )}
      </div>

      {/* Edit User Modal */}
      {isEditingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg text-brand-dark">Edit Profile</h3>
                    <button onClick={() => setIsEditingUser(false)}><X size={20} className="text-gray-400" /></button>
                </div>
                <form onSubmit={handleSaveUser} className="p-6 space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                             <img src={user.avatar} className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                             <div className="absolute bottom-0 right-0 bg-brand-primary text-white p-1 rounded-full"><Camera size={12} /></div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                        <input type="text" defaultValue={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Handle</label>
                        <input type="text" defaultValue={user.handle} onChange={e => setUser({...user, handle: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                        <input type="text" defaultValue={user.location} onChange={e => setUser({...user, location: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-brand-dark transition flex items-center justify-center gap-2">
                        <Save size={18} /> Save Changes
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* Edit/Add Pet Modal */}
      {editingPet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg text-brand-dark">{editingPet === 'new' ? 'Add New Pet' : 'Edit Pet'}</h3>
                    <button onClick={() => setEditingPet(null)}><X size={20} className="text-gray-400" /></button>
                </div>
                <form onSubmit={handleSavePet} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pet Name</label>
                        <input name="petName" type="text" defaultValue={editingPet !== 'new' ? editingPet.name : ''} required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Species</label>
                            <select name="petSpecies" defaultValue={editingPet !== 'new' ? editingPet.species : 'Dog'} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary">
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Age</label>
                            <input name="petAge" type="number" defaultValue={editingPet !== 'new' ? editingPet.age : ''} required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Breed</label>
                        <input name="petBreed" type="text" defaultValue={editingPet !== 'new' ? editingPet.breed : ''} required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </div>
                    <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-brand-dark transition flex items-center justify-center gap-2">
                        <Save size={18} /> Save Pet
                    </button>
                </form>
            </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;