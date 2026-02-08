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
            <div className="max-w-5xl mx-auto animate-slide-up">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Appointments</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage and schedule your medical consultations.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                    >
                        <Plus size={20} />
                        Schedule New
                    </button>
                </div>

                {appointments.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
                        <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                            <Calendar size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No appointments scheduled</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">Keep track of your doctor visits and health checkups in one place.</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-6 text-primary dark:text-blue-400 font-semibold hover:underline"
                        >
                            Schedule your first appointment
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {appointments.map((app) => (
                            <div key={app.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group relative">
                                <button
                                    onClick={() => deleteAppointment(app.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{app.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                                            <User size={14} /> {app.doctor}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                        <Clock size={18} className="text-slate-400" />
                                        <span>{new Date(app.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {app.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                        <MapPin size={18} className="text-slate-400" />
                                        <span className="truncate">{app.location}</span>
                                    </div>
                                </div>

                                {app.notes && (
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl mb-6">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 italic line-clamp-2">"{app.notes}"</p>
                                    </div>
                                )}

                                <button
                                    onClick={() => addToGoogleCalendar(app)}
                                    className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    Add to Google Calendar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Schedule Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up border border-slate-200 dark:border-slate-800">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Schedule Appointment</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason / Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Annual Checkup, Dental Cleaning"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Doctor / Clinic</label>
                                    <input
                                        type="text"
                                        name="doctor"
                                        value={formData.doctor}
                                        onChange={handleInputChange}
                                        placeholder="Dr. Smith"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="City Hospital"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes (Optional)</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="Fasting required, bring old reports..."
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                                >
                                    Confirm Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Appointments;
