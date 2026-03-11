import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BodyModel from '../components/BodyModel';
import { Upload, Plus, Activity, Thermometer, Pill, FileText, X, ChevronRight, Trash2 } from 'lucide-react';
import { getRecords, createRecord, deleteRecord } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [selectedPart, setSelectedPart] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        type: 'Injury',
        bodyPart: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        file: null // Store the actual file object
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const data = await getRecords();
            setRecords(data);
        } catch (error) {
            console.error('Failed to fetch records', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Prevent triggering parent click events
        if (window.confirm('Are you sure you want to delete this record? This cannot be undone.')) {
            try {
                await deleteRecord(id);
                setRecords(records.filter(r => r.id !== id));
            } catch (error) {
                console.error('Failed to delete record', error);
                alert('Failed to delete record');
            }
        }
    };

    const handlePartClick = (part) => {
        setSelectedPart(part);
    };

    const closePanel = () => {
        setSelectedPart(null);
    };

    const handleOpenModal = (type = 'Injury') => {
        setFormData(prev => ({ ...prev, type }));
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('type', formData.type);
            data.append('bodyPart', formData.bodyPart);
            data.append('description', formData.description);
            data.append('date', formData.date);
            if (formData.file) {
                data.append('file', formData.file);
            }

            const newRecord = await createRecord(data);
            setRecords([newRecord, ...records]);
            setShowModal(false);
            setFormData({
                type: 'Injury',
                bodyPart: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                file: null
            });
        } catch (error) {
            console.error('Failed to create record', error);
        }
    };
    const getPartInsights = (partName) => {
        const insights = {
            'Head & Neck': { tips: ['Maintain eye level with screens', 'Perform neck stretches hourly'], info: 'Contains primary sensory organs and cervical spine.' },
            'Chest': { tips: ['Practice deep breathing exercises', 'Monitor cardiovascular endurance'], info: 'Protects heart and lungs; monitor for respiratory health.' },
            'Shoulders': { tips: ['Avoid heavy overhead lifting', 'Work on rotator cuff mobility'], info: 'High mobility joint; susceptible to strain and impingement.' },
            'Arms': { tips: ['Take breaks from repetitive typing', 'Dynamic stretching before workouts'], info: 'Extremities used for most daily functional tasks.' },
            'Back': { tips: ['Sleep on a supportive mattress', 'Engage core muscles when lifting'], info: 'Main structural support; focus on spinal alignment.' },
            'Abdominals': { tips: ['Stay hydrated for digestion', 'Engage core for spinal stability'], info: 'Central powerhouse; supports balance and organ protection.' },
            'Hips': { tips: ['Daily hip flexor stretches', 'Avoid sitting for extended periods'], info: 'Key for weight distribution and lower body mobility.' },
            'Quadriceps': { tips: ['Stretch after running', 'Balance strength with hamstrings'], info: 'Largest muscle group; essential for power and stability.' },
            'Knees': { tips: ['Use supportive footwear', 'Low-impact cardio options'], info: 'Sensitive impact joint; requires ligament support.' },
            'Calves': { tips: ['Stay hydrated to avoid cramps', 'Heel drops for flexibility'], info: 'Vital for walking mechanics and circulation.' },
            'Feet': { tips: ['Check for arch support', 'Regular foot massages'], info: 'The base of your posture and movement.' },
            'Forearms': { tips: ['Wrist rotations hourly', 'Grip strength exercises'], info: 'Prone to tendonitis from repetitive digital work.' }
        };

        const key = Object.keys(insights).find(k => partName.includes(k)) || 'General';
        return insights[key] || { tips: ['Schedule regular checkups', 'Maintain a balanced diet'], info: 'General anatomical region.' };
    };

    const getRecordsByType = (partName, type) => {
        return records.filter(r => r.bodyPart === partName && r.type === type);
    };

    const renderReportItem = (record) => {
        const content = (
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors group">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-primary rounded-lg">
                    <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200 truncate">{record.description}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(record.date).toLocaleDateString()}</p>
                </div>
                <button
                    onClick={(e) => handleDelete(e, record.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Record"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        );

        if (record.fileUrl) {
            return (
                <a
                    key={record.id}
                    href={`http://localhost:5001${record.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    {content}
                </a>
            );
        }
        return <div key={record.id}>{content}</div>;
    };

    return (
        <Layout>
            <div className="flex flex-col lg:flex-row gap-8 h-full max-w-[1600px] mx-auto">
                {/* Left Column: Intelligence & History */}
                <div className="w-full lg:w-[420px] flex flex-col gap-10 animate-slide-up">
                    {/* Architectural Brand Header */}
                    <div className="px-2">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Vault Operator</p>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
                            {user?.name?.split(' ')[0] || 'User'}
                        </h2>
                    </div>

                    {/* Biometric Integration (Quick Stats) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-900/10 transition-transform hover:scale-[1.02] cursor-default">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-3">System Integrity</p>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black leading-none italic">98%</span>
                                <Activity size={18} className="mb-1 text-blue-400" />
                            </div>
                        </div>
                        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] shadow-xl transition-transform hover:scale-[1.02] cursor-default">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Archive Depth</p>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black leading-none italic dark:text-white">{records.length}</span>
                                <FileText size={18} className="mb-1 text-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Operational Commands */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] px-2">Operational Commands</h3>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleOpenModal('Report')}
                                className="flex-1 group flex items-center justify-between p-6 bg-primary hover:opacity-90 text-white rounded-[2rem] transition-all shadow-xl shadow-primary/20 active:scale-95"
                            >
                                <span className="text-[11px] font-black uppercase tracking-widest">Upload Lab Artifact</span>
                                <div className="p-2 bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <Upload size={18} />
                                </div>
                            </button>
                            <button
                                onClick={() => handleOpenModal('Injury')}
                                className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 text-slate-900 dark:text-white rounded-[2rem] hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-lg active:scale-95"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Minimalist Activity List */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent Logs</h3>
                            {records.length > 0 && <span className="text-[10px] bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full text-slate-500 font-bold">{records.length}</span>}
                        </div>

                        <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse"></div>)}
                                </div>
                            ) : records.length === 0 ? (
                                <div className="py-12 text-center bg-slate-50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No entries yet</p>
                                </div>
                            ) : (
                                records.slice(0, 6).map((record) => (
                                    <div key={record.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-50 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group cursor-pointer">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'Injury' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' :
                                            record.type === 'Surgery' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' :
                                                record.type === 'Prescription' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' :
                                                    'bg-blue-50 dark:bg-blue-500/10 text-primary'
                                            }`}>
                                            {record.type === 'Injury' && <Activity size={18} />}
                                            {record.type === 'Surgery' && <Thermometer size={18} />}
                                            {record.type === 'Prescription' && <Pill size={18} />}
                                            {record.type === 'Report' && <FileText size={18} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{record.description}</h4>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{record.bodyPart} • {new Date(record.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Central Scan Interface */}
                <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="relative flex-1 bg-white dark:bg-slate-950 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden group">

                        {/* Subtle Grid Background */}
                        <div className="absolute inset-0 scanner-grid opacity-[0.03] dark:opacity-20 pointer-events-none"></div>

                        {/* Center Stage Body Model */}
                        <div className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-1000 group-hover:scale-105">
                            <div className="w-full h-full max-w-2xl flex items-center justify-center scale-110 lg:scale-[1.25]">
                                <BodyModel onPartClick={handlePartClick} />
                            </div>
                        </div>

                        {/* Status Tags */}
                        <div className="absolute top-10 left-10 space-y-3 pointer-events-none">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/5 dark:bg-blue-500/10 rounded-full border border-blue-500/10 backdrop-blur-md">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">System Active</span>
                            </div>
                        </div>

                        {/* Interactive Hint - Relocated to top right to clear vision */}
                        {!selectedPart && (
                            <div className="absolute top-10 right-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                                <div className="px-5 py-2 bg-blue-500/10 dark:bg-white/5 backdrop-blur-md border border-blue-500/20 dark:border-white/10 text-blue-600 dark:text-blue-400 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
                                    Select Region to Analyze
                                </div>
                            </div>
                        )}

                        {/* Anatomical Detail HUD (Dynamic Side Panel) */}
                        {selectedPart && (
                            <div className="absolute top-8 right-8 bottom-8 w-[400px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-white/20 dark:border-white/5 rounded-[3rem] shadow-2xl z-50 animate-slide-left p-8 flex flex-col overflow-hidden">
                                {/* HUD Close Command */}
                                <button
                                    onClick={closePanel}
                                    className="absolute top-8 right-8 p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl text-slate-400 transition-all active:scale-90"
                                >
                                    <X size={20} />
                                </button>

                                {/* Biological Identification */}
                                <div className="mb-10">
                                    <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-3">Diagnostic Context</p>
                                    <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-tight">
                                        {selectedPart.name}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-500 mt-4 leading-relaxed group/info">
                                        {getPartInsights(selectedPart.name).info}
                                    </p>
                                </div>

                                {/* Historical Data Stream */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-10 pr-2">
                                    <section className="space-y-6">
                                        <div className="flex items-center justify-between px-2">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Archive Stream</h4>
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                                                {records.filter(r => r.bodyPart === selectedPart.name).length} Entries
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            {records.filter(r => r.bodyPart === selectedPart.name).length > 0 ? (
                                                records.filter(r => r.bodyPart === selectedPart.name).map(r => (
                                                    <div key={r.id} className="group p-6 bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2rem] hover:border-blue-500/30 transition-all relative overflow-hidden">
                                                        <div className="flex items-start justify-between relative z-10">
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`p-1.5 rounded-lg ${r.type === 'Injury' ? 'bg-rose-500' :
                                                                        r.type === 'Surgery' ? 'bg-amber-500' : 'bg-blue-500'
                                                                        }`}></div>
                                                                    <p className="font-black text-slate-800 dark:text-white uppercase text-[10px] tracking-widest">{r.type}</p>
                                                                </div>
                                                                <p className="text-[13px] font-bold text-slate-600 dark:text-slate-300 leading-tight">{r.description}</p>
                                                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{new Date(r.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                            </div>
                                                            <button
                                                                onClick={(e) => handleDelete(e, r.id)}
                                                                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-12 text-center bg-slate-50/50 dark:bg-white/[0.02] rounded-[2rem] border border-dashed border-slate-100 dark:border-white/5">
                                                    <p className="text-[9px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.3em]">No Historical Artifacts</p>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    {/* Preventative Protocols */}
                                    <section className="space-y-6">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Clinical Recommendations</h4>
                                        <div className="space-y-4">
                                            {getPartInsights(selectedPart.name).tips.map((tip, i) => (
                                                <div key={i} className="flex gap-4 p-5 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] rounded-[2rem] border border-emerald-500/10 group/tip">
                                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 group-hover/tip:scale-125 transition-transform"></div>
                                                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400/80 leading-relaxed uppercase tracking-tight">{tip}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Add Record Modal - High End Archive Interface */}
            {showModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-3xl animate-fade-in" onClick={() => setShowModal(false)}></div>

                    {/* Microscopic background grid for modal depth */}
                    <div className="absolute inset-0 scanner-grid opacity-[0.05] pointer-events-none"></div>

                    <div className="relative w-full max-w-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-zoom-in border border-white/20 dark:border-white/5">
                        <div className="p-12 border-b border-slate-100 dark:border-white/[0.03] flex justify-between items-center relative">
                            {/* Decorative Corner element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-px bg-blue-500"></div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Protocol Initialization</p>
                                </div>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Log <span className="text-primary">Artifact</span></h3>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-4 hover:bg-slate-100 dark:hover:bg-white/5 rounded-[1.5rem] text-slate-400 transition-all active:scale-90 group">
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-12 space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Archive Type</label>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full px-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white appearance-none uppercase tracking-widest cursor-pointer"
                                        >
                                            <option value="Injury">Physical Trauma</option>
                                            <option value="Surgery">Clinical Procedure</option>
                                            <option value="Prescription">Pharmacology</option>
                                            <option value="Report">Diagnostic Artifact</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                            <Activity size={16} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Anatomical Region</label>
                                    <div className="relative">
                                        <select
                                            name="bodyPart"
                                            value={formData.bodyPart}
                                            onChange={handleInputChange}
                                            className="w-full px-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white appearance-none uppercase tracking-widest cursor-pointer"
                                            required
                                        >
                                            <option value="">Select Region</option>
                                            {['Head & Neck', 'Chest', 'Shoulders', 'Arms', 'Forearms', 'Abdominals', 'Hips', 'Quadriceps', 'Knees', 'Calves', 'Feet', 'Back'].map(part => (
                                                <option key={part} value={part}>{part}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Clinical Identification</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter diagnostic notes..."
                                        className="w-full px-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest"
                                        required
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Temporal Stamp</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white uppercase tracking-widest"
                                        required
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Data Attachment</label>
                                    <div className="relative group/file">
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full px-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between group-hover/file:bg-slate-100 dark:group-hover/file:bg-white/5 transition-all">
                                            <span className="text-[11px] font-black text-slate-500 uppercase truncate pr-4 tracking-widest">
                                                {formData.file ? formData.file.name : "Select Artifact"}
                                            </span>
                                            <Upload size={18} className="text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-7 bg-slate-950 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.4em] hover:bg-primary dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-none flex items-center justify-center gap-4 group active:scale-95"
                                >
                                    <span>Commit to Archive</span>
                                    <div className="p-2 bg-white/10 dark:bg-slate-900/10 rounded-xl group-hover:bg-white/20 transition-colors">
                                        <Plus size={20} />
                                    </div>
                                </button>
                                <p className="mt-8 text-center text-[9px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.5em]">Encryption protocol active • AES-256</p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
