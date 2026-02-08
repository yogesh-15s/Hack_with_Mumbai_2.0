import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BodyModel from '../components/BodyModel';
import { Upload, Plus, Activity, Thermometer, Pill, FileText, X, ChevronRight, Trash2 } from 'lucide-react';
import { getRecords, createRecord, deleteRecord } from '../services/api';

const Dashboard = () => {
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
                <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-500 rounded-lg">
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
            <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-120px)] overflow-y-auto lg:overflow-hidden p-2 sm:p-0">
                {/* Left Column: Actions & Files (4 cols) */}
                <div className="w-full lg:w-[500px] flex-shrink-0 space-y-6 sm:space-y-8 animate-slide-up lg:overflow-y-auto lg:pr-2 custom-scrollbar" style={{ animationDelay: '0.1s' }}>
                    <section>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => handleOpenModal('Report')}
                                className="w-full flex items-center gap-6 py-7 px-6 bg-white dark:bg-[#0f172a]/40 border border-blue-500/10 dark:border-white/5 rounded-[2.5rem] hover:shadow-2xl hover:scale-[1.02] transition-all group overflow-hidden relative"
                            >
                                <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20 z-10">
                                    <Upload size={24} />
                                </div>
                                <div className="text-left z-10" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    <h3 className="font-black text-slate-800 dark:text-white tracking-widest uppercase text-xs">Medical Artifact</h3>
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1 tracking-tighter">Secure Cloud Upload</p>
                                </div>
                                <div className="absolute -right-4 -bottom-4 bg-blue-500/5 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            </button>

                            <button
                                onClick={() => handleOpenModal('Injury')}
                                className="w-full flex items-center gap-6 py-7 px-6 bg-white dark:bg-[#0f172a]/40 border border-indigo-500/10 dark:border-white/5 rounded-[2.5rem] hover:shadow-2xl hover:scale-[1.02] transition-all group overflow-hidden relative"
                            >
                                <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-500/20 z-10">
                                    <Plus size={24} />
                                </div>
                                <div className="text-left z-10" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    <h3 className="font-black text-slate-800 dark:text-white tracking-widest uppercase text-xs">Clinical Record</h3>
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1 tracking-tighter">Direct Ledger Entry</p>
                                </div>
                                <div className="absolute -right-4 -bottom-4 bg-indigo-500/5 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            </button>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            {loading ? (
                                <p className="text-slate-400 dark:text-slate-500 text-sm">Loading records...</p>
                            ) : records.length === 0 ? (
                                <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
                                    <p className="text-slate-400 dark:text-slate-500 text-sm">No records found.</p>
                                    <button onClick={() => setShowModal(true)} className="text-primary dark:text-blue-400 text-sm font-medium mt-2 hover:underline">Add your first record</button>
                                </div>
                            ) : (
                                records.slice(0, 4).map((record) => (
                                    <div key={record.id} className="flex items-center gap-5 p-5 bg-white dark:bg-[#0f172a]/40 border border-blue-500/5 dark:border-white/5 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-all cursor-pointer hover:shadow-xl group relative overflow-hidden">
                                        <div className={`p-3 rounded-xl shadow-sm ${record.type === 'Injury' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' :
                                            record.type === 'Surgery' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' :
                                                record.type === 'Prescription' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' :
                                                    'bg-blue-50 dark:bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {record.type === 'Injury' && <Activity size={20} />}
                                            {record.type === 'Surgery' && <Thermometer size={20} />}
                                            {record.type === 'Prescription' && <Pill size={20} />}
                                            {record.type === 'Report' && <FileText size={20} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {record.type === 'Report' && record.fileUrl ? (
                                                <a href={`http://localhost:5001${record.fileUrl}`} target="_blank" rel="noopener noreferrer" className="block">
                                                    <h4 className="font-black text-slate-800 dark:text-white truncate tracking-tight uppercase text-xs group-hover:text-blue-600 transition-colors">{record.description}</h4>
                                                </a>
                                            ) : (
                                                <h4 className="font-black text-slate-800 dark:text-white truncate tracking-tight uppercase text-xs">{record.description}</h4>
                                            )}
                                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5 tracking-wider">{record.bodyPart} • {new Date(record.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-600 transition-all"></div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Body Scan */}
                <div className="flex-1 bg-slate-50 dark:bg-[#020617] rounded-[2rem] sm:rounded-[3rem] border-2 border-blue-500/20 dark:border-blue-500/30 shadow-xl dark:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden group animate-slide-up order-first lg:order-last min-h-[500px] lg:min-h-0" style={{ animationDelay: '0.2s' }}>

                    {/* Interactive Scan Overlay */}
                    <div className="absolute inset-0 scanner-grid opacity-[0.05] dark:opacity-30 pointer-events-none rounded-3xl overflow-hidden">
                        <div className="scan-line"></div>
                    </div>

                    {/* Ambient Glows */}
                    <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-600/[0.03] dark:bg-blue-600/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-indigo-600/[0.03] dark:bg-indigo-600/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>

                    {/* Floating Decorative Metadata */}
                    <div className="absolute top-4 sm:top-8 left-4 sm:left-8 space-y-1 sm:space-y-2 pointer-events-none hidden sm:block select-none opacity-40 dark:opacity-60">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                            <p className="text-[8px] sm:text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold tracking-tighter uppercase">Anatomy v2.4-Scan</p>
                        </div>
                        <p className="text-[8px] sm:text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold tracking-tighter uppercase ml-3">X: 142.92 | Y: 84.1</p>
                    </div>

                    <div className="absolute top-4 sm:top-8 right-4 sm:right-8 pointer-events-none hidden sm:block select-none opacity-40 dark:opacity-60 text-right">
                        <p className="text-[8px] sm:text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold tracking-tighter uppercase">Bio-Metric: Active</p>
                        <p className="text-[8px] sm:text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold tracking-tighter uppercase">Sync: 100%</p>
                    </div>

                    <div className="relative z-10 w-full h-full flex items-center justify-center py-4 scale-[1.1] sm:scale-[1.3] transition-transform duration-700 group-hover:scale-110 sm:group-hover:scale-125">
                        <BodyModel onPartClick={handlePartClick} />
                    </div>

                    {/* Bottom Instructions */}
                    {!selectedPart && (
                        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 bg-white dark:bg-blue-500/10 backdrop-blur-xl px-4 sm:px-8 py-2 sm:py-3 rounded-full border border-blue-200 dark:border-blue-500/30 shadow-lg flex items-center gap-2 sm:gap-3 z-20 animate-bounce cursor-default whitespace-nowrap">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 animate-pulse shadow-sm"></div>
                            <span className="text-[9px] sm:text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] sm:tracking-[0.25em]">Initiate Analysis</span>
                        </div>
                    )}

                    {/* Side Panel Overlay */}
                    <div
                        className={`fixed sm:absolute top-0 right-0 w-full sm:w-[420px] h-full bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl border-l border-blue-500/10 dark:border-blue-500/20 shadow-2xl transform transition-transform duration-700 ease-out z-[60] sm:z-40 p-6 sm:p-10 overflow-y-auto ${selectedPart ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="sticky top-0 z-10 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-6 sm:mb-10 px-6 sm:px-10 py-6 sm:py-8 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 flex items-center justify-between shadow-sm dark:shadow-lg dark:shadow-black/20">
                            <div className="min-w-0">
                                <span className="text-[8px] sm:text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 block truncate">Part Sig: 0x{selectedPart?.id || 'F1'}</span>
                                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic truncate">{selectedPart?.name}</h2>
                            </div>
                            <button onClick={closePanel} className="p-2 sm:p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl text-slate-500 dark:text-white/50 hover:text-blue-600 dark:hover:text-white transition-all hover:scale-105 active:scale-95 flex-shrink-0 ml-4">
                                <X size={20} sm:size={24} />
                            </button>
                        </div>

                        {selectedPart && (
                            <div className="space-y-8 pb-12">
                                {/* Biometric Summary Header */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2.5 h-2.5 rounded-full shadow-sm animate-pulse ${records.filter(r => r.bodyPart === selectedPart.name).length > 2 ? 'bg-orange-500 shadow-orange-500/20' :
                                                records.filter(r => r.bodyPart === selectedPart.name).length > 0 ? 'bg-blue-500 shadow-blue-500/20' : 'bg-emerald-500 shadow-emerald-500/20'
                                                }`}></div>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                                                {records.filter(r => r.bodyPart === selectedPart.name).length > 2 ? 'Under Review' :
                                                    records.filter(r => r.bodyPart === selectedPart.name).length > 0 ? 'Recorded' : 'Optimal'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Data Cycles</p>
                                        <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                                            {records.filter(r => r.bodyPart === selectedPart.name).length}
                                        </span>
                                    </div>
                                </div>

                                {/* Part Description */}
                                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-3xl border border-blue-100/50 dark:border-blue-800/30">
                                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Anatomical Context</h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                        {getPartInsights(selectedPart.name).info}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-[0.15em] bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl w-fit">
                                        <Activity size={14} /> Injuries
                                    </h3>
                                    {getRecordsByType(selectedPart.name, 'Injury').length > 0 ? (
                                        getRecordsByType(selectedPart.name, 'Injury').map(r => (
                                            <div key={r.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">{r.description}</p>
                                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{new Date(r.date).toLocaleDateString()}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => handleDelete(e, r.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold pl-1 tracking-widest uppercase">Clearance: Positive</p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-orange-500 uppercase tracking-[0.15em] bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-xl w-fit">
                                        <Thermometer size={14} /> Surgeries
                                    </h3>
                                    {getRecordsByType(selectedPart.name, 'Surgery').length > 0 ? (
                                        getRecordsByType(selectedPart.name, 'Surgery').map(r => (
                                            <div key={r.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-slate-100 tracking-tight">{r.description}</p>
                                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{new Date(r.date).toLocaleDateString()}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => handleDelete(e, r.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold pl-1 tracking-widest uppercase">No surgical history</p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-[0.15em] bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-xl w-fit">
                                        <FileText size={14} /> Medical Artifacts
                                    </h3>
                                    <div className="space-y-3">
                                        {getRecordsByType(selectedPart.name, 'Report').length > 0 ? (
                                            getRecordsByType(selectedPart.name, 'Report').map(r => renderReportItem(r))
                                        ) : (
                                            <p className="text-slate-400 dark:text-slate-500 text-xs font-semibold pl-1 tracking-widest uppercase">Archive Empty</p>
                                        )}
                                    </div>
                                </div>

                                {/* Anatomy Wellness Tips */}
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-5">Wellness Directives</h3>
                                    <div className="space-y-4">
                                        {getPartInsights(selectedPart.name).tips.map((tip, idx) => (
                                            <div key={idx} className="flex items-start gap-4 group">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40 group-hover:scale-150 transition-transform duration-300"></div>
                                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors cursor-default leading-tight">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Record Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-slate-200 dark:border-slate-800">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Add Record</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-500">Document your medical event</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white font-bold"
                                >
                                    <option value="Injury">Injury</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Prescription">Prescription</option>
                                    <option value="Report">Medical Report</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Anatomy</label>
                                <select
                                    name="bodyPart"
                                    value={formData.bodyPart}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white font-bold"
                                    required
                                >
                                    <option value="">Select Region</option>
                                    <option value="Head & Neck">Head & Neck</option>
                                    <option value="Chest">Chest</option>
                                    <option value="Shoulders">Shoulders</option>
                                    <option value="Arms">Arms</option>
                                    <option value="Forearms">Forearms</option>
                                    <option value="Abdominals">Abdominals</option>
                                    <option value="Obliques">Obliques</option>
                                    <option value="Hips">Hips</option>
                                    <option value="Quadriceps">Quadriceps</option>
                                    <option value="Knees">Knees</option>
                                    <option value="Calves">Calves</option>
                                    <option value="Feet">Feet</option>
                                    <option value="Back">Back</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Brief diagnosis"
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white font-bold"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Event Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white font-bold"
                                    required
                                />
                            </div>

                            {formData.type === 'Report' && (
                                <div className="animate-fade-in space-y-1">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Artifact Upload</label>
                                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                        />
                                        <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
                                            <Upload size={32} />
                                            <span className="text-sm font-black uppercase tracking-wider">
                                                {formData.file ? formData.file.name : "Select Document"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/40"
                                >
                                    Finalize Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
