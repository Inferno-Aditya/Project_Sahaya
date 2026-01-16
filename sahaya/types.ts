export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isVerified: boolean;
  role: 'owner' | 'vet' | 'enthusiast';
  trustScore: number;
  location: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  image: string;
  healthNotes: string[];
  themeColor: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName?: string; // For group chats
  text: string;
  timestamp: Date;
  isMine: boolean;
}

export interface ChatThread {
  id: string;
  user: User; // Represents the chat partner or group info
  lastMessage: string;
  unreadCount: number;
  updatedAt: Date;
  isGroup?: boolean;
  personality?: string; // AI Instruction
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
}

export enum AppState {
  LOADING,
  LOGIN,
  APP
}

export interface Story {
  id: string;
  user: string;
  avatar: string;
  image: string;
  viewed: boolean;
}