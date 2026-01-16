import { User, Pet, ChatThread, Post, Message, Story } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Ananya Gupta',
  handle: '@ananya_g',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  isVerified: true,
  role: 'owner',
  trustScore: 98,
  location: 'Indiranagar, Bangalore'
};

export const MY_PETS: Pet[] = [
  {
    id: 'p1',
    name: 'Bruno',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=400&q=80',
    healthNotes: ['Vaccinated', 'Deworming done'],
    themeColor: '#E6A45C'
  },
  {
    id: 'p2',
    name: 'Ginger',
    species: 'Cat',
    breed: 'Persian',
    age: 2,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    healthNotes: ['Needs grooming'],
    themeColor: '#8CAB92'
  }
];

export const MOCK_STORIES: Story[] = [
    { id: 's1', user: 'My Story', avatar: CURRENT_USER.avatar, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80', viewed: false },
    { id: 's2', user: 'Bruno', avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80', viewed: false },
    { id: 's3', user: 'Cubbon Park', avatar: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=150&q=80', image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9205?auto=format&fit=crop&w=600&q=80', viewed: false },
    { id: 's4', user: 'Pet Tips', avatar: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=150&q=80', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80', viewed: false },
    { id: 's5', user: 'Events', avatar: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?auto=format&fit=crop&w=150&q=80', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80', viewed: false },
];

export const MOCK_THREADS: ChatThread[] = [
  {
    id: 't1',
    user: {
      id: 'u2',
      name: 'Dr. Rajesh Verma',
      handle: '@dr_rajesh_vet',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      role: 'vet',
      trustScore: 100,
      location: 'Koramangala Vet Clinic'
    },
    lastMessage: 'Bruno looks great! Just keep an eye on his diet in this heat.',
    unreadCount: 2,
    updatedAt: new Date(),
    personality: "You are Dr. Rajesh Verma, a professional and kind veterinarian. You give sound medical advice but always include a disclaimer. You are caring and use medical terminology simply. Keep responses short and helpful."
  },
  {
    id: 't2',
    user: {
      id: 'u3',
      name: 'Mumbai Retrievers Club',
      handle: '@mumbai_goldens',
      avatar: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=150&q=80',
      isVerified: false,
      role: 'enthusiast',
      trustScore: 85,
      location: 'Mumbai'
    },
    lastMessage: 'Meetup at Shivaji Park this Sunday morning?',
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 3600000),
    personality: "You are the admin of the Mumbai Retrievers Club. You are energetic, use lots of emojis 🐕🎉, and love organizing meetups. You are obsessed with Golden Retrievers."
  },
  {
    id: 't_group_stb',
    isGroup: true,
    user: {
      id: 'g_stb',
      name: 'Saint Bernard Society 🏔️',
      handle: '6 members',
      avatar: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=150&q=80',
      isVerified: true,
      role: 'enthusiast',
      trustScore: 99,
      location: 'Global'
    },
    lastMessage: 'Sarah: Has anyone tried the new cooling mat?',
    unreadCount: 5,
    updatedAt: new Date(),
    personality: "You are a group chat of 6 passionate Saint Bernard owners: Sarah (Motherly), Mike (Outdoorsy), Jen (Vet Tech), Dave (Joker), and Lisa (Breeder). When the user sends a message, pick ONE of these personas to reply. Keep it conversational and specific to big dogs, drool, and shedding."
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post1',
    userId: 'u2',
    user: MOCK_THREADS[0].user,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    caption: 'Regular checkups are key to a happy pup! especially during monsoon 🩺🐕 #vetlife #healthy',
    likes: 124,
    comments: 12,
    tags: ['health', 'dog', 'monsooncCare']
  },
  {
    id: 'post2',
    userId: 'u4',
    user: {
        id: 'u4',
        name: 'Vikram & Simi',
        handle: '@vikram_s',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        isVerified: true,
        role: 'owner',
        trustScore: 92,
        location: 'Delhi NCR'
    },
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    caption: 'Simi learned a new trick today. Namaste! 🙏',
    likes: 89,
    comments: 5,
    tags: ['training', 'indiedog']
  },
  {
    id: 'post3',
    userId: 'u5',
    user: {
       id: 'u5',
       name: 'Cubbon Park Dog Park',
       handle: '@cubbon_dogs',
       avatar: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=150&q=80',
       isVerified: true,
       role: 'enthusiast',
       trustScore: 99,
       location: 'Bangalore'
    },
    imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
    caption: 'Sunday park gathering was a huge success! Over 50 floofs attended. 🌳',
    likes: 450,
    comments: 32,
    tags: ['community', 'bangalore']
  }
];

export const MESSAGE_STORE: Record<string, Message[]> = {
    't1': [
        { id: 'm1', senderId: 'u2', text: 'Bruno looks great! Just keep an eye on his diet in this heat.', timestamp: new Date(Date.now() - 3600000), isMine: false }
    ],
    't2': [
        { id: 'm2', senderId: 'u3', text: 'Meetup at Shivaji Park this Sunday morning?', timestamp: new Date(Date.now() - 3600000), isMine: false }
    ],
    't_group_stb': [
        { id: 'g1', senderId: 'p_sarah', senderName: 'Sarah', text: 'Has anyone tried the new cooling mat?', timestamp: new Date(Date.now() - 7200000), isMine: false },
        { id: 'g2', senderId: 'p_mike', senderName: 'Mike', text: 'Yeah, Bernie shredded his in 5 minutes. 😅', timestamp: new Date(Date.now() - 7100000), isMine: false },
        { id: 'g3', senderId: 'p_jen', senderName: 'Jen', text: 'Make sure you get the gel-free ones if they are chewers!', timestamp: new Date(Date.now() - 7000000), isMine: false }
    ]
};