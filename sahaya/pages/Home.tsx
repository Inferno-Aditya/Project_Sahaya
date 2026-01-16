import React, { useState, useEffect } from 'react';
import { MOCK_POSTS, MOCK_STORIES } from '../services/mockData';
import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin, X } from 'lucide-react';
import Layout from '../components/Layout';
import { Story } from '../types';

const Home: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_POSTS.map(p => ({ ...p, isLiked: false })));
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);

  const toggleLike = (postId: string) => {
    setPosts(currentPosts => currentPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Story Timer
  useEffect(() => {
    let interval: any;
    if (activeStory) {
        setStoryProgress(0);
        interval = setInterval(() => {
            setStoryProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setActiveStory(null);
                    return 0;
                }
                return prev + 1; // 3 seconds approx (30ms * 100)
            });
        }, 30);
    }
    return () => clearInterval(interval);
  }, [activeStory]);

  return (
    <Layout>
      <div className="p-4 md:p-8 space-y-8 relative">
          {/* Stories / Highlights */}
          <div className="flex gap-6 overflow-x-auto pb-4 px-1 no-scrollbar perspective-1000">
            {MOCK_STORIES.map((story, idx) => (
              <div 
                key={story.id} 
                onClick={() => setActiveStory(story)}
                className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-18 h-18 md:w-20 md:h-20 rounded-full p-1 transition-all duration-300 ${idx === 0 ? 'border-2 border-dashed border-gray-300' : 'bg-gradient-to-tr from-brand-secondary to-brand-primary p-[3px] shadow-md group-hover:shadow-lg'}`}>
                   <div className="w-full h-full bg-white rounded-full overflow-hidden border-2 border-white">
                     <img src={story.avatar} alt="story" className="w-full h-full object-cover transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110" />
                   </div>
                </div>
                <span className="text-xs md:text-sm font-semibold text-gray-600 group-hover:text-brand-primary transition-colors">{story.user}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-brand-dark tracking-tight">Community Feed</h2>
            <button className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition">View All</button>
          </div>

          {/* Feed - Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
            {posts.map((post) => (
              <div key={post.id} className="break-inside-avoid bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-border/50 overflow-hidden flex flex-col group hover:-translate-y-1 transform-style-3d hover:shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                        <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                        {post.user.isVerified && <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5"><CheckIcon /></div>}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-dark group-hover:text-brand-primary transition-colors">
                        {post.user.name}
                      </h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={10} />
                        {post.user.location}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-full transition">
                    <MoreHorizontal size={20} className="text-gray-400" />
                  </button>
                </div>

                {/* Image */}
                <div className="w-full bg-gray-100 overflow-hidden relative cursor-pointer">
                  <img src={post.imageUrl} alt="Post" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                     <p className="text-white text-xs font-medium truncate">{post.tags.map(t => `#${t} `)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => toggleLike(post.id)}
                            className="group/btn flex items-center gap-1 focus:outline-none"
                        >
                            <Heart 
                                className={`transition-all duration-300 ${post.isLiked ? 'fill-brand-secondary text-brand-secondary scale-110' : 'text-brand-dark group-hover/btn:text-brand-secondary'}`} 
                                size={26} 
                            />
                            <span className={`text-sm font-bold ${post.isLiked ? 'text-brand-secondary' : 'text-gray-600'}`}>{post.likes}</span>
                        </button>
                        <button className="group/btn flex items-center gap-1 focus:outline-none">
                            <MessageCircle className="text-brand-dark group-hover/btn:text-brand-primary transition-colors" size={26} />
                            <span className="text-sm font-bold text-gray-600">{post.comments}</span>
                        </button>
                    </div>
                    <button className="text-brand-dark hover:text-brand-primary transition-colors">
                        <Share2 size={24} />
                    </button>
                  </div>
                  
                  <div className="flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-bold mr-2 text-brand-dark cursor-pointer hover:underline">{post.user.handle}</span>
                        {post.caption}
                      </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">2 hours ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Screen Story Modal */}
          {activeStory && (
            <div className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-fade-in">
                <div className="relative w-full h-full md:w-[400px] md:h-[80vh] md:rounded-2xl overflow-hidden bg-gray-900">
                    {/* Progress Bar */}
                    <div className="absolute top-4 left-4 right-4 h-1 bg-white/30 rounded-full z-20 overflow-hidden">
                        <div className="h-full bg-white transition-all duration-30 ease-linear" style={{width: `${storyProgress}%`}}></div>
                    </div>

                    {/* Header */}
                    <div className="absolute top-8 left-4 right-4 flex justify-between items-center z-20">
                        <div className="flex items-center gap-3">
                            <img src={activeStory.avatar} className="w-8 h-8 rounded-full border border-white" />
                            <span className="text-white font-bold text-sm shadow-sm">{activeStory.user}</span>
                        </div>
                        <button onClick={() => setActiveStory(null)} className="text-white/80 hover:text-white"><X size={24}/></button>
                    </div>

                    {/* Image */}
                    <img src={activeStory.image} className="w-full h-full object-cover animate-scale-slow" />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none"></div>
                    
                    {/* Interactive Input */}
                    <div className="absolute bottom-6 left-4 right-4 flex gap-2">
                        <input type="text" placeholder="Send message..." className="flex-1 bg-white/20 backdrop-blur-md rounded-full px-4 py-3 text-white placeholder-white/70 border border-white/30 focus:outline-none" />
                        <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40"><Heart size={20} /></button>
                        <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40"><Share2 size={20} /></button>
                    </div>
                </div>
            </div>
          )}
      </div>
    </Layout>
  );
};

const CheckIcon = () => (
    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
)

export default Home;