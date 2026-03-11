import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { FileText, ChevronRight, Upload, Sparkles } from 'lucide-react';
import { getRecords } from '../services/api';

const Reports = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await getRecords();
            // Filter only reports that have file URLs
            setRecords(data.filter(r => r.type === 'Report' && r.fileUrl));
        } catch (error) {
            console.error('Failed to fetch records', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-8">
                {/* Header Architectural Layer */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-in">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-px bg-primary"></div>
                            <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">Secure Archive v4.0</p>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Medical Repository</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                            Your decentralized medical documentation and diagnostic history, protected by biometric encryption and indexed for rapid retrieval.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 px-8 py-4 rounded-[2rem] shadow-sm">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inventory Status</span>
                            <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">{records.length} Artifacts</span>
                        </div>
                        <div className="w-px h-10 bg-slate-100 dark:bg-white/10 mx-2"></div>
                        <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-48 bg-slate-100 dark:bg-white/[0.03] rounded-[3rem] animate-pulse"></div>
                        ))}
                    </div>
                ) : records.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-900/50 backdrop-blur-3xl rounded-[4rem] border border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center group">
                        <div className="bg-primary/10 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-700">
                            <FileText size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Vault Entry: Null</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 max-w-sm mx-auto font-medium leading-relaxed">
                            No medical artifacts have been synchronized yet. Upload reports from the dashboard to initialize your biological archive.
                        </p>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="mt-10 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            Return to Command Base
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
                        {records.map((record) => (
                            <a
                                key={record.id}
                                href={`http://localhost:5001${record.fileUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-white dark:bg-slate-900/40 backdrop-blur-2xl p-8 rounded-[3rem] border border-slate-100 dark:border-white/5 hover:border-blue-500/40 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)] transition-all duration-700 relative overflow-hidden"
                            >
                                {/* High-tech overlay elements */}
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
                                    <Sparkles size={100} />
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-16 h-16 bg-slate-50 dark:bg-white/[0.03] text-slate-400 dark:text-slate-500 rounded-[2rem] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-700 shadow-sm border border-slate-100 dark:border-white/5">
                                            <FileText size={32} />
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-[9px] font-black text-primary uppercase tracking-widest mb-1">{record.bodyPart}</span>
                                            <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                                {new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase italic group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {record.description}
                                        </h3>
                                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                                            ID: 0x{record.id.toString().slice(-6)}
                                        </p>
                                    </div>

                                    <div className="mt-10 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Upload size={14} className="text-primary" />
                                            Synchronized
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-700 border border-slate-100 dark:border-white/5">
                                            <ChevronRight size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Reports;
