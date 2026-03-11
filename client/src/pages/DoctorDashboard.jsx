import React from 'react';
import Layout from '../components/Layout';
import { Users, Calendar, ClipboardList, Activity, Star, Clock, Zap, Shield, Database, BrainCircuit, LayoutDashboard, ChevronRight, AlertCircle, Stethoscope, Sparkles } from 'lucide-react';

const DoctorDashboard = () => {
    const stats = [
        { label: 'Total Patients', value: '1,284', icon: <Users />, color: 'blue' },
        { label: 'Today\'s Appointments', value: '12', icon: <Calendar />, color: 'teal' },
        { label: 'Critical Cases', value: '03', icon: <AlertCircle size={20} />, color: 'rose' },
        { label: 'Avg Diagnostic Time', value: '4.2m', icon: <Zap />, color: 'amber' }
    ];

    const benefits = [
        { 
            title: 'Unified Record Synchronization', 
            desc: 'Access complete multi-facility histories in a single encrypted view.',
            icon: <Database size={18} />,
            highlight: '0.2s Latency'
        },
        { 
            title: 'AI Clinical Copilot', 
            desc: 'Automated cross-referencing of symptoms with 50M+ medical papers.',
            icon: <BrainCircuit size={18} />,
            highlight: 'Level 4 Intelligence'
        },
        { 
            title: 'Immutable Security Vault', 
            desc: 'Military-grade encryption for all clinical notes and prescriptions.',
            icon: <Shield size={18} />,
            highlight: 'ISO 27001'
        }
    ];

    const appointments = [
        { id: 1, name: 'John Doe', time: '09:00 AM', type: 'Check-up', status: 'Confirmed' },
        { id: 2, name: 'Jane Smith', time: '10:30 AM', type: 'Follow-up', status: 'Pending' },
        { id: 3, name: 'Mike Ross', time: '02:00 PM', type: 'Consultation', status: 'Confirmed' },
        { id: 4, name: 'Harvey Specter', time: '04:15 PM', type: 'Emergency', status: 'Urgent' }
    ];

    return (
        <Layout title="Doctor Control Center">
            <div className="space-y-8 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                                    {stat.icon}
                                </div>
                                <Activity className="text-slate-200 dark:text-slate-800" size={20} />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{stat.value}</h3>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                        </div>
                    ))}
                </div>

                {/* Why MedVault for Doctors? Section */}
                <div className="bg-slate-950 dark:bg-blue-600 rounded-[3.5rem] p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                        <Stethoscope size={240} className="text-white" />
                    </div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                        <div className="lg:col-span-1 space-y-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-teal-400" size={20} />
                                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em]">Clinical Superiority Matrix</span>
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
                                The Future of Clinical Efficiency
                            </h2>
                            <p className="text-sm font-bold text-white/60 leading-relaxed uppercase tracking-wide">
                                Stop searching through papers. Start diagnosing with immediate biometric-authorized record access.
                            </p>
                            <button className="flex items-center gap-3 px-6 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-teal-400 hover:scale-105 transition-all">
                                <span>Master System Guide</span>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                        
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl group/card hover:bg-white/20 transition-all">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-3 bg-teal-400/20 text-teal-400 rounded-2xl">
                                            {benefit.icon}
                                        </div>
                                        <span className="text-[8px] font-black text-teal-400 uppercase tracking-widest">{benefit.highlight}</span>
                                    </div>
                                    <h4 className="text-white font-black uppercase italic tracking-tight mb-2">{benefit.title}</h4>
                                    <p className="text-[10px] text-white/50 font-bold leading-relaxed uppercase tracking-wider">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Appointments List */}
                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Today's Schedule</h2>
                            <Calendar size={20} className="text-blue-500" />
                        </div>
                        <div className="space-y-4">
                            {appointments.map((apt) => (
                                <div key={apt.id} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 group hover:border-blue-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black">
                                            {apt.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight italic">{apt.name}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                <Clock size={12} />
                                                <span>{apt.time} • {apt.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                        apt.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' : 
                                        apt.status === 'Urgent' ? 'bg-rose-500/10 text-rose-600 animate-pulse' : 
                                        'bg-amber-500/10 text-amber-500'
                                    }`}>
                                        {apt.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Patient Insights (Dummy Chart/Visual Area) */}
                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center">
                        <div className="w-full text-left mb-8">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">Patient Demographics</h2>
                        </div>
                        <div className="relative w-48 h-48 mb-8">
                            <div className="absolute inset-0 rounded-full border-[12px] border-slate-100 dark:border-white/5"></div>
                            <div className="absolute inset-0 rounded-full border-[12px] border-blue-500 border-t-transparent border-r-transparent -rotate-45"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-slate-900 dark:text-white italic">74%</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Cases</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Adults</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white italic">62%</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pediatric</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white italic">38%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clinical Workflow Transformation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                            <Activity size={200} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-4">Biometric Patient Bridge</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                            Eliminate the 15-minute intake delay. When a patient enters your clinic, their vault is unlocked via biometric handshake, giving you instant access to their entire medical history, allergies, and surgical records before they even sit down.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 bg-blue-500/10 rounded-xl text-[9px] font-black text-blue-500 uppercase tracking-widest">Instant Sync</div>
                            <div className="px-4 py-2 bg-emerald-500/10 rounded-xl text-[9px] font-black text-emerald-500 uppercase tracking-widest">Zero Paperwork</div>
                        </div>
                    </div>

                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:-rotate-12 transition-transform duration-700">
                            <Zap size={200} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-4">Emergency Overdrive</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                            In critical scenarios where every second counts, MedVault's Emergency Protocol allows you to bypass secondary auth (under legal audit) to access life-saving data like Blood Type, Chronic Conditions, and Advanced Directives.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 bg-rose-500/10 rounded-xl text-[9px] font-black text-rose-500 uppercase tracking-widest">Life Guard Mode</div>
                            <div className="px-4 py-2 bg-indigo-500/10 rounded-xl text-[9px] font-black text-indigo-500 uppercase tracking-widest">Legal Trail Logged</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DoctorDashboard;
