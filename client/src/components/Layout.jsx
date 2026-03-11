import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Moon, Sun, Bot, Sparkles, Menu, X as CloseIcon } from 'lucide-react';
import Sidebar from './Sidebar';
import Logo from './Logo';
import AIAgentModal from './AIAgentModal';
import EmergencyModal from './EmergencyModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SERVER_URL = 'http://localhost:5001';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
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
        <div className="min-h-screen bg-white dark:bg-[#020617] flex transition-all duration-700 overflow-x-hidden relative">
            {/* Ambient Background Elements - Global */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-primary/[0.03] dark:bg-primary/[0.02] rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.02] rounded-full blur-[150px]"></div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
                <div className={`absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-[#020617] shadow-3xl transition-transform duration-700 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar isCollapsed={false} setIsCollapsed={() => { }} isMobile={true} closeMobile={() => setIsMobileMenuOpen(false)} onEmergencyClick={() => setIsEmergencyModalOpen(true)} />
                </div>
            </div>

            {/* Desktop Sidebar Container */}
            <div className={`hidden lg:block relative z-50 transition-all duration-700 ease-in-out ${isSidebarCollapsed ? 'w-24' : 'w-72'}`}>
                <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} onEmergencyClick={() => setIsEmergencyModalOpen(true)} />
            </div>

            <div className="flex-1 flex flex-col min-h-screen relative z-10 transition-all duration-700">
                {/* Master Header Architectural Layer */}
                <header className="sticky top-0 z-[40] px-6 lg:px-10 py-5 flex items-center justify-between border-b border-slate-100 dark:border-white/[0.03] bg-white/70 dark:bg-[#020617]/70 backdrop-blur-3xl">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-3 lg:hidden text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Dynamic Context Title (Optional) */}
                        <div className="hidden sm:block">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">System Nominal</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        {/* Clinical Assistant Trigger */}
                        <button
                            onClick={() => setIsAIModalOpen(true)}
                            className="group relative px-4 sm:px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/10 dark:shadow-white/5 flex items-center gap-3 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <Bot size={18} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                            <span className="text-[11px] font-black uppercase tracking-widest hidden sm:block">Clinical Assistant</span>
                        </button>

                        <div className="w-px h-8 bg-slate-100 dark:bg-white/5 mx-1 hidden sm:block"></div>

                        {/* Theme Modulation */}
                        <button
                            onClick={(e) => toggleTheme(e)}
                            className={`p-3 rounded-2xl transition-all border relative overflow-hidden group ${theme === 'dark'
                                ? 'bg-white/5 border-white/5 text-amber-400 hover:bg-white/10'
                                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            <div className="group-hover:rotate-12 transition-transform duration-500">
                                {theme === 'dark' ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
                            </div>
                        </button>

                        {/* Bio-Identity Status */}
                        <div className="flex items-center gap-4 pl-2">
                            <div className="text-right hidden md:block">
                                <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{user?.name || 'Authorized User'}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Biometric Level 04</p>
                            </div>
                            <button
                                onClick={() => navigate('/profile')}
                                className="relative group focus:outline-none"
                            >
                                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-xs border border-white/10 dark:border-slate-200 relative z-10 overflow-hidden hover:scale-105 transition-transform active:scale-95">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar.startsWith('http') ? user.avatar : `${SERVER_URL}${user.avatar}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        user?.name ? getInitials(user.name) : <UserIcon size={20} />
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className="w-px h-8 bg-slate-100 dark:bg-white/5 mx-1 hidden sm:block"></div>

                        {/* Termination Protocol */}
                        <button
                            onClick={handleLogout}
                            className="p-3 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all relative group"
                            title="Terminate Session"
                        >
                            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 px-6 lg:px-12 py-10 w-full animate-fade-in">
                    {children}
                </main>
            </div>

            <AIAgentModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                userName={user?.name || 'User'}
            />

            <EmergencyModal
                isOpen={isEmergencyModalOpen}
                onClose={() => setIsEmergencyModalOpen(false)}
            />
        </div>
    );
};

export default Layout;
