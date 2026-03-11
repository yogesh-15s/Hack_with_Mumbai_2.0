import React from 'react';
import Layout from '../components/Layout';
import { Users, Search, Filter, MoreVertical } from 'lucide-react';

const DoctorPatients = () => {
    const patients = [
        { id: 'PT-101', name: 'John Doe', age: 45, blood: 'A+', lastVisit: '2024-03-10', condition: 'Hypertension' },
        { id: 'PT-102', name: 'Jane Smith', age: 32, blood: 'O-', lastVisit: '2024-03-08', condition: 'Routine Checkup' },
        { id: 'PT-103', name: 'Robert Brown', age: 58, blood: 'B+', lastVisit: '2024-03-05', condition: 'Diabetes Type 2' },
        { id: 'PT-104', name: 'Emily Davis', age: 27, blood: 'AB+', lastVisit: '2024-03-11', condition: 'Allergy Follow-up' }
    ];

    return (
        <Layout title="Patient Registry">
            <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name, ID or condition..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] outline-none focus:border-blue-500 transition-all font-bold text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                        <Filter size={16} />
                        Filter Records
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {patients.map((patient) => (
                        <div key={patient.id} className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:scale-[1.01] transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl font-black italic">
                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight">{patient.name}</h3>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-lg">{patient.id}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        <span>Age: {patient.age}</span>
                                        <span>•</span>
                                        <span>Blood: {patient.blood}</span>
                                        <span>•</span>
                                        <span className="text-blue-500">Condition: {patient.condition}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Access</p>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase">{patient.lastVisit}</p>
                                </div>
                                <button className="p-4 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors">
                                    <MoreVertical size={20} className="text-slate-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default DoctorPatients;
