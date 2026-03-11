import React from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, Heart, Ruler, Weight, User, Calendar, ChevronLeft, ChevronRight, AlertCircle, X as CloseIcon, Users, Stethoscope, Building2, ClipboardList, Bed, UserCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile, closeMobile, onEmergencyClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const role = user?.role || localStorage.getItem('selectedRole') || 'patient';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={`${isMobile ? 'w-full' : isCollapsed ? 'w-24' : 'w-72'} bg-white dark:bg-[#020617] border-r border-slate-100 dark:border-white/[0.03] h-screen flex flex-col fixed left-0 top-0 z-50 transition-all duration-700 ease-in-out shadow-2xl`}>
            {/* Master Identification Layer */}
            <div className={`p-8 mb-4 flex flex-col gap-6 ${isCollapsed ? 'items-center px-4' : 'px-8'}`}>
                <div className="flex items-center gap-4 w-full group cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Logo className={`${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} transition-all duration-700 relative z-10`} />
                    </div>
                    <div className={`transition-all duration-700 origin-left ${(isCollapsed && !isMobile) ? 'opacity-0 w-0 scale-95 invisible' : 'opacity-100 w-auto visible'}`}>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">MedVault</h1>
                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mt-2">v.4.0.2</p>
                    </div>
                </div>

                {/* Mobile Close Indicator */}
                {isMobile && (
                    <button
                        onClick={closeMobile}
                        className="absolute right-6 top-8 p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <CloseIcon size={24} />
                    </button>
                )}
            </div>

            {/* Architecture Navigation */}
            <nav className="flex-1 px-4 space-y-10 overflow-y-auto custom-scrollbar overflow-x-hidden">
                <div className="space-y-2">
                    {!isCollapsed && <p className="px-5 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-6">Operations Hub</p>}
                    
                    <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active={location.pathname === '/dashboard'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                    
                    {role === 'patient' && (
                        <>
                            <NavItem to="/reports" icon={<FileText size={20} />} label="Medical Archive" active={location.pathname === '/reports'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                            <NavItem to="/appointments" icon={<Calendar size={20} />} label="Clinical Schedule" active={location.pathname === '/appointments'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                        </>
                    )}

                    {role === 'doctor' && (
                        <>
                            <NavItem to="/patients" icon={<Users size={20} />} label="Patient Registry" active={location.pathname === '/patients'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                            <NavItem to="/schedule" icon={<Calendar size={20} />} label="Consultation Schedule" active={location.pathname === '/schedule'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                            <NavItem to="/prescriptions" icon={<ClipboardList size={20} />} label="Digital Scripts" active={location.pathname === '/prescriptions'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                        </>
                    )}

                    {role === 'hospital' && (
                        <>
                            <NavItem to="/wards" icon={<Bed size={20} />} label="Ward Allocation" active={location.pathname === '/wards'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                            <NavItem to="/staff" icon={<UserCheck size={20} />} label="Staff Directory" active={location.pathname === '/staff'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                            <NavItem to="/facilities" icon={<Building2 size={20} />} label="Facility Assets" active={location.pathname === '/facilities'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />
                        </>
                    )}

                    <NavItem to="/settings" icon={<Settings size={20} />} label="System Config" active={location.pathname === '/settings'} isCollapsed={isCollapsed} onClick={isMobile ? closeMobile : undefined} />

                    {/* Emergency Protocol - High Visibility */}
                    <button
                        onClick={onEmergencyClick}
                        className={`flex items-center rounded-[1.5rem] transition-all duration-500 relative group px-4 py-4 w-full mt-4 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-500/5`}
                    >
                        <div className={`flex items-center justify-center flex-shrink-0 transition-transform duration-500 ${isCollapsed ? 'w-full' : 'w-6'}`}>
                            <AlertCircle size={20} className="animate-pulse" />
                        </div>
                        <span className={`transition-all duration-700 origin-left whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto ml-5 text-[11px] font-black uppercase tracking-[0.2em]'}`}>
                            Emergency Protocol
                        </span>
                    </button>
                </div>

                {role === 'patient' && (
                    <div className="pt-4">
                        {!isCollapsed && <p className="px-5 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-6">Biological Baseline</p>}
                        <div className={`space-y-3 transition-all duration-700 ${isCollapsed ? 'flex flex-col items-center' : 'px-2'}`}>
                            <VitalItem icon={<Heart size={16} />} label="Hematic" value={user?.bloodGroup || 'N/A'} color="rose" isCollapsed={isCollapsed} />
                            <VitalItem icon={<Ruler size={16} />} label="Vertical" value={user?.height || 'N/A'} color="blue" isCollapsed={isCollapsed} />
                            <VitalItem icon={<Weight size={16} />} label="Mass" value={user?.weight || 'N/A'} color="emerald" isCollapsed={isCollapsed} />
                            <VitalItem icon={<User size={16} />} label="Biological Age" value={user?.age ? `${user.age}Y` : 'N/A'} color="amber" isCollapsed={isCollapsed} />
                        </div>
                    </div>
                )}
            </nav>

            {/* Collapse Interaction (Desktop) */}
            {!isMobile && (
                <div className="p-6 border-t border-slate-100 dark:border-white/[0.03]">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all group"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : (
                            <div className="flex items-center gap-3">
                                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Condense Interface</span>
                            </div>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

const VitalItem = ({ icon, label, value, color, isCollapsed }) => {
    const colors = {
        rose: 'text-rose-500 bg-rose-500/5',
        blue: 'text-primary bg-primary/10',
        emerald: 'text-emerald-500 bg-emerald-500/5',
        amber: 'text-amber-500 bg-amber-500/5'
    };

    return (
        <div className={`flex items-center group transition-all duration-500 w-full ${isCollapsed ? 'justify-center' : 'justify-between px-3 py-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5'}`} title={isCollapsed ? `${label}: ${value}` : ""}>
            <div className="flex items-center">
                <div className={`p-2 ${colors[color]} rounded-xl transition-all group-hover:scale-110 flex-shrink-0 w-8 h-8 flex items-center justify-center`}>
                    {icon}
                </div>
                <span className={`text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-all duration-700 origin-left whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto ml-4'}`}>
                    {label}
                </span>
            </div>
            {!isCollapsed && <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tabular-nums">{value}</span>}
        </div>
    );
};

const NavItem = ({ to, icon, label, active, isCollapsed, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center rounded-[1.5rem] transition-all duration-500 relative group px-4 py-4 w-full ${active
            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl shadow-slate-900/10 dark:shadow-white/5'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
        title={isCollapsed ? label : ""}
    >
        <div className={`flex items-center justify-center flex-shrink-0 transition-transform duration-500 ${isCollapsed ? 'w-full' : 'w-6'}`}>
            <span className={`transition-all duration-500 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                {icon}
            </span>
        </div>
        <span className={`transition-all duration-700 origin-left whitespace-nowrap overflow-hidden ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto ml-5 text-[11px] font-black uppercase tracking-[0.2em]'}`}>
            {label}
        </span>

        {active && !isCollapsed && (
            <div className="absolute right-4 w-1 h-1 rounded-full bg-primary animate-pulse"></div>
        )}
    </Link>
);

export default Sidebar;
