import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { generatePetAdvice } from '../services/gemini';
import { Sparkles, Send, User, Bot } from 'lucide-react';

interface ChatMsg {
  role: 'user' | 'ai';
  content: string;
}

const Copilot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'ai', content: "Hi! I'm your AI Pet Care Copilot. Ask me anything about diet, training, or local vets! 🐾" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const aiResponse = await generatePetAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Oops, I got distracted by a squirrel. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-140px)]">
        <div className="bg-brand-accent/10 p-4 border-b border-brand-accent/20">
            <h2 className="text-brand-dark font-bold flex items-center gap-2">
                <Sparkles className="text-brand-accent fill-current" size={20} />
                Pet Care Copilot
            </h2>
            <p className="text-xs text-gray-600">AI-powered advice (Not medical diagnosis)</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-brand-accent text-white' : 'bg-gray-300'}`}>
                        {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl text-sm max-w-[80%] shadow-sm ${
                        msg.role === 'user' ? 'bg-brand-dark text-white rounded-tr-none' : 'bg-white border border-gray-100 rounded-tl-none'
                    }`}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {loading && (
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-white">
                        <Bot size={16} />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                </div>
            )}
            <div ref={bottomRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about fleas, food, or parks..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input}
                    className="absolute right-2 top-2 p-1.5 bg-brand-accent text-white rounded-lg disabled:opacity-50 hover:bg-brand-accent/90 transition"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Copilot;