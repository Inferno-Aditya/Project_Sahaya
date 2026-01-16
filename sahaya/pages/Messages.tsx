import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { MOCK_THREADS, CURRENT_USER, MESSAGE_STORE } from '../services/mockData';
import { getChatReply } from '../services/gemini';
import { ArrowLeft, Send, Phone, Video, Search, Users } from 'lucide-react';
import { Message, ChatThread } from '../types';

const Messages: React.FC = () => {
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [, setTick] = useState(0); 
  const forceUpdate = () => setTick(t => t + 1);

  return (
    <Layout>
      <div className="flex h-[calc(100vh-60px)] md:h-full bg-white md:bg-gray-50/50 md:p-6 gap-6">
        
        {/* Thread List */}
        <div className={`w-full md:w-1/3 bg-white md:rounded-2xl md:shadow-sm md:border border-brand-border flex flex-col ${activeThread ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-brand-border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl text-brand-dark">{CURRENT_USER.handle}</h2>
                    <span className="bg-brand-primary/10 text-brand-primary px-2 py-1 rounded text-xs font-bold">New</span>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary" />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {MOCK_THREADS.map((thread) => {
                    const messages = MESSAGE_STORE[thread.id] || [];
                    const lastMsg = messages.length > 0 ? messages[messages.length - 1].text : thread.lastMessage;
                    
                    return (
                        <div
                            key={thread.id}
                            onClick={() => setActiveThread(thread)}
                            className={`flex items-center gap-3 p-4 cursor-pointer transition border-b border-gray-50 last:border-0 hover:bg-gray-50 ${activeThread?.id === thread.id ? 'bg-brand-primaryLight/30 border-l-4 border-l-brand-primary' : ''}`}
                        >
                            <div className="relative">
                                <img src={thread.user.avatar} alt={thread.user.name} className="w-12 h-12 rounded-full object-cover" />
                                {thread.unreadCount > 0 && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-primary rounded-full border-2 border-white"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <h4 className={`text-sm ${thread.unreadCount > 0 ? 'font-bold text-brand-dark' : 'font-semibold text-gray-700'}`}>{thread.user.name}</h4>
                                <span className="text-[10px] text-gray-400">10m</span>
                            </div>
                            <p className={`text-xs truncate mt-0.5 ${thread.unreadCount > 0 ? 'font-bold text-black' : 'text-gray-500'}`}>
                                {thread.isGroup && messages.length > 0 && !messages[messages.length-1].isMine ? `${messages[messages.length-1].senderName}: ` : ''}
                                {lastMsg}
                            </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Chat Area */}
        <div className={`w-full md:w-2/3 bg-white md:rounded-2xl md:shadow-sm md:border border-brand-border flex flex-col ${activeThread ? 'flex fixed inset-0 z-50 md:static' : 'hidden md:flex'}`}>
            {activeThread ? (
                 <ChatWindow 
                    thread={activeThread} 
                    onBack={() => setActiveThread(null)} 
                    onMessageSent={forceUpdate}
                 />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-24 h-24 bg-brand-bg rounded-full flex items-center justify-center mb-4 animate-float">
                        <Send size={40} className="text-brand-dark ml-1" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark">Your Messages</h3>
                    <p className="text-sm">Select a chat to start messaging AI Personalities</p>
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

// Sub-component for the actual chat
const ChatWindow: React.FC<{ thread: ChatThread; onBack: () => void; onMessageSent: () => void }> = ({ thread, onBack, onMessageSent }) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messages = MESSAGE_STORE[thread.id] || [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Check if last message is mine, if so trigger AI response
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.isMine && thread.personality) {
        setIsTyping(true);
        const fetchReply = async () => {
             const reply = await getChatReply(messages, thread.personality!, lastMsg.text);
             
             setIsTyping(false);
             if (reply.text) {
                 const aiMsg: Message = {
                     id: Date.now().toString(),
                     senderId: thread.id, // ID of the AI/Thread
                     senderName: reply.sender || thread.user.name.split(' ')[0],
                     text: reply.text,
                     timestamp: new Date(),
                     isMine: false
                 };
                 MESSAGE_STORE[thread.id].push(aiMsg);
                 onMessageSent();
             }
        };
        fetchReply();
    }
  }, [messages.length, thread.id]);

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: CURRENT_USER.id,
      text: text,
      timestamp: new Date(),
      isMine: true
    };
    
    if (!MESSAGE_STORE[thread.id]) {
        MESSAGE_STORE[thread.id] = [];
    }
    MESSAGE_STORE[thread.id].push(newMsg);
    
    setText('');
    onMessageSent();
  };

  return (
    <div className="flex flex-col h-full bg-white md:rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-brand-border shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-600 md:hidden"><ArrowLeft /></button>
          <div className="flex items-center gap-3">
            <div className="relative">
                <img src={thread.user.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
                {thread.isGroup && (
                    <div className="absolute -bottom-1 -right-1 bg-brand-bg rounded-full p-0.5 border border-white">
                        <Users size={12} className="text-brand-dark" />
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-bold text-brand-dark text-sm">{thread.user.name}</h3>
                <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    {thread.isGroup ? '6 Active Members' : 'Active now'}
                </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-brand-primary">
            <Phone size={20} className="cursor-pointer hover:text-brand-dark transition" />
            <Video size={20} className="cursor-pointer hover:text-brand-dark transition" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
        {messages.map((msg, i) => {
            const showAvatar = !msg.isMine && (i === 0 || messages[i-1].isMine || messages[i-1].senderName !== msg.senderName);
            return (
              <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} group items-end gap-2`}>
                {!msg.isMine && showAvatar && (
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-1">
                         <img src={thread.isGroup ? `https://ui-avatars.com/api/?name=${msg.senderName}&background=random` : thread.user.avatar} className="w-full h-full object-cover" />
                    </div>
                )}
                {!msg.isMine && !showAvatar && <div className="w-6" />} {/* Spacer */}
                
                <div className={`max-w-[75%] px-5 py-2.5 rounded-2xl text-sm shadow-sm transition-transform hover:scale-[1.02] ${
                  msg.isMine 
                  ? 'bg-brand-primary text-white rounded-br-none' 
                  : 'bg-white border border-gray-100 rounded-bl-none text-gray-800'
                }`}>
                  {thread.isGroup && !msg.isMine && <span className="block text-[10px] font-bold text-brand-primary mb-1">{msg.senderName}</span>}
                  {msg.text}
                  <div className={`text-[9px] mt-1 text-right ${msg.isMine ? 'text-brand-primaryLight/70' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            );
        })}
        
        {isTyping && (
             <div className="flex justify-start items-end gap-2">
                 <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-1">
                      <img src={thread.user.avatar} className="w-full h-full object-cover" />
                 </div>
                 <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
             </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-brand-border flex items-center gap-2 relative z-20">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={thread.isGroup ? "Message the group..." : "Message..."}
          className="flex-1 bg-gray-100 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm transition-shadow"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} disabled={!text} className="p-3 bg-brand-dark text-white rounded-full hover:bg-brand-primary transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:rotate-12 active:scale-95">
            <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Messages;