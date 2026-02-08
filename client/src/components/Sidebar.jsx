import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, Heart, Ruler, Weight, User, Calendar, ChevronLeft, ChevronRight, X as CloseIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile, closeMobile }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`${isMobile ? 'w-full' : isCollapsed ? 'w-20' : 'w-64'} bg-[#f8fafc] dark:bg-[#020617] border-r border-indigo-100 dark:border-white/5 h-screen flex flex-col fixed left-0 top-0 z-50 font-sans transition-all duration-500 shadow-xl overflow-hidden`}>
            {/* Mobile Close Button */}
            {isMobile && (
                <button
                    onClick={closeMobile}
                    className="absolute right-4 top-4 p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <CloseIcon size={24} />
                </button>
            )}

            {/* Collapse Toggle (Desktop Only) */}
            {!isMobile && (
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-0 top-12 bg-blue-600 text-white p-1.5 rounded-l-xl shadow-lg hover:pr-4 transition-all z-50 group border border-blue-400/20"
                    aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            )}

            <div className={`p-6 border-b border-indigo-50 dark:border-white/5 flex flex-col gap-4 ${isCollapsed ? 'items-center px-4' : 'px-6'}`}>
                <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 w-10 flex justify-center">
                        <Logo className={`${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'} transition-all duration-500`} />
                    </div>
                    <div className={`transition-all duration-500 origin-left ${(isCollapsed && !isMobile) ? 'opacity-0 w-0 scale-95 invisible' : 'opacity-100 w-auto visible'}`}>
                        <h1 className="text-xl font-black text-[#0f172a] dark:text-white tracking-tighter leading-none whitespace-nowrap" style={{ fontFamily: "'Outfit', sans-serif" }}>MedVault</h1>
                        <p className="text-[7px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-1 whitespace-nowrap">Secure Medical Data</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-3 space-y-8 overflow-y-auto custom-scrollbar overflow-x-hidden">
                <div className="space-y-1">
                    {!isCollapsed && <p className={`px-4 text-[9px] font-black text-indigo-400 dark:text-blue-500/60 uppercase tracking-[0.2em] mb-4 transition-all duration-500`}>Operations</p>}
                    <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/dashboard'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                    <NavItem to="/reports" icon={<FileText size={20} />} label="Reports & Files" active={location.pathname === '/reports'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                    <NavItem to="/appointments" icon={<Calendar size={20} />} label="Appointments" active={location.pathname === '/appointments'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" active={location.pathname === '/settings'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                </div>

                <div className="transition-all duration-500">
                    {!isCollapsed && <p className={`px-4 text-[9px] font-black text-indigo-400 dark:text-blue-500/60 uppercase tracking-[0.2em] mb-4 transition-all duration-500`}>Basic Vitals</p>}
                    <div className={`bg-white dark:bg-[#0f172a]/50 rounded-[2rem] p-3 border border-indigo-100 dark:border-white/5 space-y-4 shadow-sm transition-all duration-500 ${isCollapsed ? 'mx-0 rounded-2xl p-2' : 'mx-1'}`}>
                        <VitalItem icon={<Heart size={18} />} label="Blood" value={user.bloodGroup || '--'} color="rose" isCollapsed={isCollapsed} />
                        <VitalItem icon={<Ruler size={18} />} label="Height" value={user.height || '--'} color="blue" isCollapsed={isCollapsed} />
                        <VitalItem icon={<Weight size={18} />} label="Weight" value={user.weight || '--'} color="emerald" isCollapsed={isCollapsed} />
                        <VitalItem icon={<User size={18} />} label="Age" value={user?.age ? `${user.age}Y` : '--'} color="amber" isCollapsed={isCollapsed} />
                    </div>
                </div>
            </nav>

        </div>
    );
};

const VitalItem = ({ icon, label, value, color, isCollapsed }) => {
    const colors = {
        rose: 'bg-rose-50 dark:bg-rose-500/10 text-rose-500',
        blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500',
        emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500',
        amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500'
    };

    return (
        <div className={`flex items-center group transition-all duration-500 w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`} title={isCollapsed ? `${label}: ${value}` : ""}>
            <div className="flex items-center">
                <div className={`p-2 ${colors[color]} rounded-xl transition-transform group-hover:scale-110 flex-shrink-0 w-9 h-9 flex items-center justify-center`}>
                    {icon}
                </div>
                <span className={`text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight transition-all duration-500 origin-left whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto ml-3'}`}>
                    {label}
                </span>
            </div>
            {!isCollapsed && <span className="text-sm font-black text-slate-900 dark:text-white uppercase transition-opacity duration-300">{value}</span>}
        </div>
    );
};

const NavItem = ({ to, icon, label, active, isCollapsed, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center rounded-2xl transition-all duration-300 relative group overflow-hidden px-3 py-3 w-full ${active
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40'
            : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
        title={isCollapsed ? label : ""}
    >
        <div className="w-8 flex justify-center flex-shrink-0">
            <span className={`transition-transform duration-300 flex-shrink-0 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                {icon}
            </span>
        </div>
        <span className={`transition-all duration-500 origin-left whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto ml-4 font-black text-xs uppercase tracking-widest'}`}>
            {label}
        </span>

        {active && (
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full transition-all duration-500 ${isCollapsed ? 'h-full top-0 bottom-0 translate-y-0' : ''}`}></div>
        )}
    </Link>
);

export default Sidebar;
