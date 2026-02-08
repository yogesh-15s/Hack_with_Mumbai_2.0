import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../services/api';
import { Activity, Ruler, Weight, User, Droplet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HealthSetup = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        age: user?.age || '',
        gender: user?.gender || 'Male',
        bloodGroup: user?.bloodGroup || '',
        weight: user?.weight || '',
        height: user?.height || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = await updateProfile(formData);
            updateUser(updatedUser);
            navigate('/dashboard');
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to save health entries. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/50 dark:border-slate-800 relative z-10 animate-slide-up">
                <div className="text-center mb-8">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                        <Activity size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Basic Health Entries</h1>
                    <p className="text-slate-500 dark:text-slate-400">Let's set up your profile for better health tracking.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                                placeholder="e.g. 25"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Height */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Height</label>
                            <div className="relative">
                                <Ruler className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                                    placeholder="e.g. 175 cm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Weight</label>
                            <div className="relative">
                                <Weight className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                                    placeholder="e.g. 70 kg"
                                    required
                                />
                            </div>
                        </div>

                        {/* Blood Group */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Blood Group</label>
                            <div className="relative">
                                <Droplet className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Save & Continue to Dashboard'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HealthSetup;
