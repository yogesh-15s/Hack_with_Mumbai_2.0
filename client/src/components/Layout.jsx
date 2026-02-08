import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Moon, Sun, Bot, Sparkles, Menu, X as CloseIcon } from 'lucide-react';
import Sidebar from './Sidebar';
import Logo from './Logo';
import AIAgentModal from './AIAgentModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Generate initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 overflow-x-hidden">
            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                <div className={`absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-950 shadow-2xl transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar isCollapsed={false} setIsCollapsed={() => { }} isMobile={true} closeMobile={() => setIsMobileMenuOpen(false)} />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className={`hidden lg:block relative z-20 transition-all duration-500 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
                <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            </div>

            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'} bg-[#f8fafc] dark:bg-[#020617]`}>
                {/* Custom TopBar with Profile & Logout */}
                <header className="bg-white/70 dark:bg-[#020617]/70 backdrop-blur-2xl border-b border-indigo-100 dark:border-white/5 sticky top-0 z-40 px-4 py-4 lg:py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 lg:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                    {/* Placeholder for desktop title alignment if needed, or just keep it simple */}
                    <div className="hidden lg:block"></div>

                    <div className="flex items-center gap-2 sm:gap-6 ml-auto">
                        {/* AI Agent Button */}
                        <button
                            onClick={() => setIsAIModalOpen(true)}
                            className="group relative flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            <Sparkles size={16} className="text-cyan-200 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">AI Assistant</span>
                        </button>

                        <div className="h-8 sm:h-10 w-px bg-slate-200 dark:bg-white/10 mx-1 sm:mx-2"></div>

                        {/* Theme Toggle Button */}
                        <button
                            type="button"
                            onClick={(e) => toggleTheme(e)}
                            className={`p-2 sm:p-3 rounded-lg sm:rounded-[1.25rem] transition-all duration-500 border relative group overflow-hidden ${theme === 'dark'
                                ? 'bg-slate-800/50 border-white/10 text-amber-400 hover:bg-slate-800 shadow-[0_0_20px_rgba(251,191,36,0.1)]'
                                : 'bg-white border-indigo-100 text-slate-600 hover:bg-slate-50 shadow-sm'
                                }`}
                            aria-label="Toggle Theme"
                        >
                            <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
                                {theme === 'dark' ? <Sun size={18} fill="currentColor" className="opacity-90" /> : <Moon size={18} fill="currentColor" className="opacity-70" />}
                            </div>
                        </button>

                        {/* Profile Section */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">Hello, {user?.name || 'User'}</p>
                                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold border-2 border-slate-100 dark:border-slate-700 shadow-sm">
                                {user?.name ? getInitials(user.name) : <UserIcon size={20} />}
                            </div>
                        </div>

                        <div className="h-6 sm:h-8 w-px bg-slate-200 hidden sm:block"></div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 rounded-lg sm:rounded-xl transition-all shadow-lg shadow-red-500/20"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:block">Logout</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 pl-1 pr-6 py-8 w-full animate-fade-in transition-all duration-500">
                    {children}
                </main>
            </div>
            <AIAgentModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                userName={user?.name || 'User'}
            />
        </div>
    );
};

export default Layout;
