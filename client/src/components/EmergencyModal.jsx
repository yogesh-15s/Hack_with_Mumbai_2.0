import React from 'react';
import { X, Phone, AlertTriangle, Droplet, Activity, ShieldAlert, Heart, User, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EmergencyModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    if (!isOpen) return null;

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || '??';
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Critical Red Overlay */}
            <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

            {/* Floating Critical Particles (Simulated) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden blur-3xl opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full animate-pulse [animation-delay:1s]"></div>
            </div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_0_80px_rgba(225,29,72,0.4)] overflow-hidden border-2 border-rose-500 animate-zoom-in">
                {/* HUD Header */}
                <div className="bg-rose-600 p-8 sm:p-10 flex justify-between items-center text-white relative">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-10"></div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldAlert className="animate-pulse" size={32} />
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Emergency Protocol</h2>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-100 opacity-80">Life-Critical Biometric Access</p>
                    </div>
                    <button onClick={onClose} className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all relative z-10">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 sm:p-12 space-y-10">
                    {/* Identification Arch */}
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full"></div>
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center font-black text-3xl text-slate-900 dark:text-white border-2 border-rose-100 dark:border-rose-900/30 relative z-10">
                                {getInitials(user?.name)}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white p-2 rounded-xl shadow-lg animate-bounce [animation-duration:2s]">
                                <Heart size={20} fill="currentColor" />
                            </div>
                        </div>
                        <div className="text-center sm:text-left space-y-2">
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em]">Authorized Patient</p>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">{user?.name || 'UNKNOWN SUBJECT'}</h3>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    <Activity size={14} className="text-rose-500" /> AGE: {user?.age || '??'}Y
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">
                                    <User size={14} className="text-rose-500" /> GEN: {user?.gender || 'UNK'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Biometric Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-rose-500/[0.03] dark:bg-rose-500/[0.05] p-8 rounded-[2.5rem] border border-rose-100 dark:border-rose-950/50 group hover:border-rose-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-rose-600 rounded-xl text-white">
                                    <Droplet size={20} />
                                </div>
                                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Hematic Group</span>
                            </div>
                            <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic">
                                {user?.bloodGroup || 'PENDING'}
                            </p>
                        </div>

                        <div className="bg-slate-500/[0.03] dark:bg-white/[0.02] p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 group hover:border-slate-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-amber-600 rounded-xl text-white">
                                    <AlertTriangle size={20} />
                                </div>
                                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Critical Contraindications</span>
                            </div>
                            <p className="text-sm font-black text-slate-600 dark:text-slate-400 leading-relaxed uppercase">
                                {user?.allergies || 'NO REGISTERED ALLERGIES'}
                            </p>
                        </div>
                    </div>

                    {/* Contact Protocol */}
                    <div className="bg-slate-900 dark:bg-white p-8 sm:p-10 rounded-[3rem] text-white dark:text-slate-900 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <Phone size={80} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-70">Primary Emergency Contact</p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div>
                                <h4 className="text-2xl font-black uppercase tracking-tight italic mb-1">
                                    {user?.emergencyContactName || 'John Doe (Next of Kin)'}
                                </h4>
                                <p className="text-xs font-bold tracking-widest opacity-60 uppercase">
                                    {user?.emergencyContactRelation || 'Spouse'} • {user?.emergencyContactPhone || '+1 (555) 000-0000'}
                                </p>
                            </div>
                            <a
                                href={`tel:${user?.emergencyContactPhone || ''}`}
                                className="inline-flex items-center justify-center gap-3 bg-rose-600 text-white px-8 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-rose-900/40"
                            >
                                <Phone size={18} />
                                Initialize Call
                            </a>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-6 bg-slate-50 dark:bg-white/[0.02] text-center border-t border-slate-100 dark:border-white/5">
                    <span className="text-[9px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.6em]">MedVault Bio-Security Directive 702 Enforced</span>
                </div>
            </div>
        </div>
    );
};

export default EmergencyModal;
