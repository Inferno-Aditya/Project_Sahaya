import React from 'react';
import { Home, MessageCircle, MapPin, User, Search, Sparkles, Menu, LogOut, AlertTriangle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Discover', path: '/discover' },
    { icon: Sparkles, label: 'Copilot', path: '/copilot', highlight: true },
    { icon: MapPin, label: 'Near Me', path: '/local' },
    { icon: AlertTriangle, label: 'Lost & Found', path: '/lost-found' },
    { icon: MessageCircle, label: 'Inbox', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="flex h-screen w-full bg-brand-bg overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white h-full shadow-xl z-20 border-r border-brand-border">
        <div className="p-8 flex items-center gap-4">
           <div className="w-12 h-12 hover:rotate-12 transition-transform duration-300">
             <Logo className="w-full h-full" />
           </div>
           <h1 className="text-3xl font-extrabold tracking-tight text-brand-primary font-sans">Sahaya</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-brand-primary/10 text-brand-primary font-bold shadow-sm' 
                    : 'text-brand-muted hover:bg-gray-50 hover:text-brand-dark font-medium'
                }`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-r-full"></div>}
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform group-hover:scale-110 ${isActive ? 'text-brand-primary' : ''}`} />
                <span className="text-lg">{item.label}</span>
                {item.label === 'Inbox' && (
                    <span className="ml-auto bg-brand-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">2</span>
                )}
                {item.label === 'Lost & Found' && (
                    <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-brand-border">
            <button onClick={() => navigate('/login')} className="flex items-center gap-3 text-brand-muted hover:text-brand-secondary transition w-full px-4 py-2 rounded-xl hover:bg-red-50">
                <LogOut size={20} />
                <span className="font-semibold">Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative w-full bg-brand-bg">
         {/* Mobile Header */}
        <header className="md:hidden px-4 py-3 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-brand-border flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9">
                    <Logo className="w-full h-full" />
                </div>
                <h1 className="text-xl font-bold text-brand-primary tracking-tight">Sahaya</h1>
            </div>
            <button className="p-2 active:bg-gray-100 rounded-full">
                <Menu className="text-brand-dark" />
            </button>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative p-0 md:p-2">
            <div className="max-w-7xl mx-auto w-full h-full">
                {children}
            </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden bg-white border-t border-brand-border px-2 py-2 z-40 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-2xl">
            <div className="flex justify-around items-end">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
                    isActive ? 'text-brand-primary -translate-y-1' : 'text-gray-400'
                    }`}
                >
                    <div className={`relative ${item.highlight ? 'bg-brand-primary text-white p-3 rounded-full -mt-8 border-4 border-white shadow-lg transform active:scale-95 transition-transform' : ''}`}>
                         <Icon size={item.highlight ? 24 : (isActive ? 24 : 22)} strokeWidth={isActive || item.highlight ? 2.5 : 2} />
                         {item.label === 'Inbox' && !item.highlight && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-secondary rounded-full border-2 border-white"></span>
                        )}
                        {item.label === 'Lost & Found' && !isActive && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        )}
                    </div>
                    {!item.highlight && <span className={`text-[10px] font-semibold ${isActive ? 'text-brand-primary' : ''}`}>{item.label === 'Lost & Found' ? 'Lost' : item.label}</span>}
                </button>
                );
            })}
            </div>
        </nav>
      </div>
    </div>
  );
};

export default Layout;