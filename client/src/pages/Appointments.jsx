import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Calendar, Plus, Clock, MapPin, User, X, ExternalLink, Trash2 } from 'lucide-react';

const Appointments = () => {
    const [appointments, setAppointments] = useState(() => {
        const saved = localStorage.getItem('appointments');
        return saved ? JSON.parse(saved) : [];
    });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        doctor: '',
        date: '',
        time: '',
        location: '',
        notes: ''
    });

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAppointment = {
            id: Date.now(),
            ...formData
        };
        setAppointments([newAppointment, ...appointments]);
        setShowModal(false);
        setFormData({ title: '', doctor: '', date: '', time: '', location: '', notes: '' });
    };

    const deleteAppointment = (id) => {
        setAppointments(appointments.filter(app => app.id !== id));
    };

    const addToGoogleCalendar = (app) => {
        const title = encodeURIComponent(app.title);
        const details = encodeURIComponent(`Doctor: ${app.doctor}\nNotes: ${app.notes}`);
        const location = encodeURIComponent(app.location);

        // Format date/time for Google: YYYYMMDDTHHmmss
        const startDateStr = app.date.replace(/-/g, '') + 'T' + app.time.replace(/:/g, '') + '00';

        // Assume 1 hour duration
        const [hours, minutes] = app.time.split(':');
        const endHours = (parseInt(hours) + 1).toString().padStart(2, '0');
        const endDateStr = app.date.replace(/-/g, '') + 'T' + endHours + minutes + '00';

        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateStr}/${endDateStr}&details=${details}&location=${location}`;
        window.open(url, '_blank');
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-in">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-px bg-indigo-500"></div>
                            <p className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.4em]">Clinical Scheduler v2.1</p>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Diagnostic Timeline</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                            Synchronize your medical consultations, diagnostic procedures, and specialist reviews within a secure temporal interface.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="group relative flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-[2.5rem] font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/10 dark:shadow-white/5 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                        <Plus size={18} className="relative z-10" />
                        <span className="relative z-10">Initialize Schedule</span>
                    </button>
                </div>

                {appointments.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-900/50 backdrop-blur-3xl rounded-[4rem] border border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center group">
                        <div className="bg-indigo-500/10 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-8 text-indigo-500 group-hover:scale-110 transition-transform duration-700">
                            <Calendar size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Timeline: Empty State</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 max-w-sm mx-auto font-medium leading-relaxed">
                            No medical synchronization detected. Active your clinical schedule to track future diagnostic milestones.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 animate-slide-up">
                        {appointments.map((app) => (
                            <div key={app.id} className="group bg-white dark:bg-slate-900/60 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-700 relative overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl -mr-24 -mt-24"></div>

                                <button
                                    onClick={() => deleteAppointment(app.id)}
                                    className="absolute top-8 right-8 p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100 z-20"
                                >
                                    <Trash2 size={20} />
                                </button>

                                <div className="flex items-start gap-8 mb-10 relative z-10">
                                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-[2rem] flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-700 shadow-sm border border-indigo-100 dark:border-indigo-500/20">
                                        <Calendar size={36} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">CONFIRMED</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ID: 0x{app.id.toString().slice(-4)}</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-2 truncate italic leading-none">{app.title}</h3>
                                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                            <User size={14} className="text-indigo-500" />
                                            <span>Personnel: {app.doctor}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-10 relative z-10">
                                    <div className="p-6 bg-slate-50 dark:bg-white/[0.03] rounded-[2rem] border border-slate-100 dark:border-white/5 group-hover:border-indigo-500/10 transition-all">
                                        <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Clock size={14} className="text-indigo-500" />
                                            Schedule
                                        </div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">
                                            {new Date(app.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                        </p>
                                        <p className="text-lg font-black text-indigo-600 mt-2">{app.time}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 dark:bg-white/[0.03] rounded-[2rem] border border-slate-100 dark:border-white/5 group-hover:border-indigo-500/10 transition-all">
                                        <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <MapPin size={14} className="text-indigo-500" />
                                            Location
                                        </div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase truncate leading-none">{app.location}</p>
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-widest">PHYSICAL WING</p>
                                    </div>
                                </div>

                                {app.notes && (
                                    <div className="bg-indigo-50/30 dark:bg-indigo-500/5 p-6 rounded-[2rem] border border-indigo-100/20 dark:border-indigo-500/10 mb-10 relative z-10 flex-1">
                                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed">
                                            <span className="text-indigo-500 not-italic font-black text-[10px] uppercase tracking-widest block mb-2 opacity-60">Clinical Directives:</span>
                                            "{app.notes}"
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={() => addToGoogleCalendar(app)}
                                    className="w-full flex items-center justify-center gap-3 py-5 bg-slate-100 dark:bg-white/[0.05] text-slate-900 dark:text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all shadow-sm active:scale-95 group/btn"
                                >
                                    <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                    Synchronize Bio-Calendar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Schedule Modal - Futuristic Glassmorphism */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-3xl w-full max-w-2xl overflow-hidden animate-zoom-in border border-slate-100 dark:border-white/10">
                        <div className="p-12 border-b border-slate-50 dark:border-white/5 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/20">
                            <div>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Protocol Initialization</h3>
                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mt-4 ml-1 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                    Personnel & Temporal Validation Required
                                </p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-4 bg-slate-100 dark:bg-white/5 hover:bg-rose-500 hover:text-white rounded-[1.5rem] text-slate-400 transition-all hover:rotate-90">
                                <X size={28} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 block">Clinical Context / Purpose</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="E.G. NEUROLOGICAL ASSESSMENT"
                                        className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 block">Medical Personnel</label>
                                    <input
                                        type="text"
                                        name="doctor"
                                        value={formData.doctor}
                                        onChange={handleInputChange}
                                        placeholder="DR. NAME"
                                        className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 block">Facility / Area</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="ZONE / WING"
                                        className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 block">Date Specification</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 block">Time Marker</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1 block">Directives / Bio-Notes</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="SPECIFY PROTOCOLS, FASTING, OR ARTIFACTS TO BRING..."
                                        rows="3"
                                        className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none uppercase"
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all shadow-3xl hover:scale-[1.02] active:scale-95 mt-4"
                            >
                                Finalize Timeline Synchronization
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Appointments;
