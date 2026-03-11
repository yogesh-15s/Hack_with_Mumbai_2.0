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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Ambient HUD Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] scanner-grid"></div>
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse [animation-delay:2s]"></div>
            </div>

            <div className="w-full max-w-2xl bg-white/70 dark:bg-slate-900/40 backdrop-blur-[40px] p-12 sm:p-20 rounded-[4.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-100 dark:border-white/5 relative z-10 animate-zoom-in group overflow-hidden">
                {/* Microscopic HUD details */}
                <div className="absolute top-12 right-12 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10"></div>
                </div>

                <div className="mb-16 text-center sm:text-left relative">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-px bg-blue-500"></div>
                        <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] leading-none">Initialization Terminal v4.0</p>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Biometric <span className="text-blue-500">Onboarding</span></h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 font-medium max-w-md leading-relaxed">
                        Establishing your primary biological dataset. These parameters synchronize your neural archive with our clinical monitoring protocols.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {/* Name - Full Width */}
                        <div className="md:col-span-2 group/input">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-4 ml-2 group-focus-within/input:text-blue-500 transition-colors">Legal Designation</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                                    <User size={18} className="text-blue-500/30 group-focus-within/input:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest"
                                    placeholder="Verify Full Name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Age */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Temporal Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-8 py-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white uppercase tracking-widest placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                placeholder="Year"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Biological Axis</label>
                            <div className="relative">
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-8 py-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white appearance-none cursor-pointer uppercase tracking-widest"
                                >
                                    <option value="Male">Male Axis</option>
                                    <option value="Female">Female Axis</option>
                                    <option value="Other">Non-Binary</option>
                                </select>
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                    <Activity size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Height */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-3">
                                <Ruler size={14} className="text-blue-500" />
                                Vertical Stature (cm)
                            </label>
                            <input
                                type="text"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full px-8 py-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white uppercase tracking-widest placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                placeholder="175.00"
                                required
                            />
                        </div>

                        {/* Weight */}
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-3">
                                <Weight size={14} className="text-blue-500" />
                                Physical Mass (kg)
                            </label>
                            <input
                                type="text"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full px-8 py-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white uppercase tracking-widest placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                placeholder="70.00"
                                required
                            />
                        </div>

                        {/* Blood Group - Full Width */}
                        <div className="md:col-span-2 space-y-4">
                            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-3">
                                <Droplet size={14} className="text-rose-500" />
                                Hematic Signature
                            </label>
                            <div className="relative">
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="w-full px-8 py-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white appearance-none cursor-pointer uppercase tracking-widest"
                                    required
                                >
                                    <option value="">SCANNING REQUIRED...</option>
                                    <option value="A+">A Positive (+)</option>
                                    <option value="A-">A Negative (-)</option>
                                    <option value="B+">B Positive (+)</option>
                                    <option value="B-">B Negative (-)</option>
                                    <option value="AB+">AB Positive (+)</option>
                                    <option value="AB-">AB Negative (-)</option>
                                    <option value="O+">O Positive (+)</option>
                                    <option value="O-">O Negative (-)</option>
                                </select>
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                    <Activity size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-900 py-7 md:py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-none hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
                                    <span className="ml-2">SYNCHRONIZING REPOSITORY</span>
                                </div>
                            ) : (
                                <span className="group-hover:tracking-[0.5em] transition-all duration-700">Initialize Clinical Dashboard</span>
                            )}
                        </button>
                        <p className="mt-8 text-center text-[9px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.5em]">Encryption Protocol Base: active</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HealthSetup;
