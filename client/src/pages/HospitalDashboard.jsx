import React from 'react';
import Layout from '../components/Layout';
import { Building2, Activity, Bed, UserCheck, TrendingUp, AlertCircle } from 'lucide-react';

const HospitalDashboard = () => {
    const metrics = [
        { label: 'Occupancy Rate', value: '82%', icon: <Bed />, trend: '+4%', status: 'optimal' },
        { label: 'Active Staff', value: '452', icon: <UserCheck />, trend: 'Stable', status: 'normal' },
        { label: 'Emergency Load', value: 'High', icon: <AlertCircle />, trend: 'Rising', status: 'critical' },
        { label: 'Quarterly Revenue', value: '$2.4M', icon: <TrendingUp />, trend: '+12%', status: 'optimal' }
    ];

    const departments = [
        { name: 'Cardiology', load: '85%', status: 'Busy', staff: 24 },
        { name: 'Neurology', load: '62%', status: 'Normal', staff: 18 },
        { name: 'Pediatrics', load: '94%', status: 'Critical', staff: 32 },
        { name: 'Orthopedics', load: '45%', status: 'Low', staff: 12 }
    ];

    return (
        <Layout title="Hospital Command Center">
            <div className="space-y-8 animate-fade-in">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`p-4 rounded-2xl ${
                                    metric.status === 'critical' ? 'bg-rose-500/10 text-rose-500' : 
                                    metric.status === 'optimal' ? 'bg-green-500/10 text-green-500' : 
                                    'bg-blue-500/10 text-blue-500'
                                }`}>
                                    {metric.icon}
                                </div>
                                <Activity className="text-slate-100 dark:text-white/5" size={24} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2">{metric.label}</h4>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-black text-slate-950 dark:text-white italic tracking-tighter">{metric.value}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${
                                    metric.trend.includes('+') ? 'text-green-500' : 
                                    metric.trend === 'Rising' ? 'text-rose-500' : 
                                    'text-slate-400'
                                }`}>{metric.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Department Resource Allocation */}
                    <div className="lg:col-span-2 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3.5rem] border border-slate-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-slate-950 dark:text-white uppercase italic tracking-tight">Department Status</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time resource tracking</p>
                            </div>
                            <Building2 size={24} className="text-blue-500 opacity-50" />
                        </div>
                        <div className="space-y-6">
                            {departments.map((dept, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{dept.name}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">• {dept.staff} Staff</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                                            dept.status === 'Critical' ? 'text-rose-500' : 
                                            dept.status === 'Busy' ? 'text-amber-500' : 
                                            'text-green-500'
                                        }`}>{dept.status}</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full transition-all duration-1000 ${
                                                dept.status === 'Critical' ? 'bg-rose-500' : 
                                                dept.status === 'Busy' ? 'bg-amber-500' : 
                                                'bg-blue-500'
                                            }`}
                                            style={{ width: dept.load }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Operational Alerts */}
                    <div className="bg-slate-950 dark:bg-blue-600 p-8 rounded-[3.5rem] text-white flex flex-col items-start justify-between shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Activity size={120} />
                        </div>
                        
                        <div className="relative z-10 w-full">
                            <div className="p-3 bg-white/20 rounded-2xl w-fit mb-8">
                                <AlertCircle size={24} />
                            </div>
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-4">Urgent Dispatch Required</h3>
                            <p className="text-xs font-bold text-white/70 uppercase tracking-wider leading-relaxed">
                                Critical blood supply shortage in West Wing. Immediate redistribution protocols activated.
                            </p>
                        </div>

                        <button className="relative z-10 w-full mt-12 py-4 bg-white text-slate-950 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-slate-100 transition-colors">
                            Acknowledge Alert
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HospitalDashboard;
