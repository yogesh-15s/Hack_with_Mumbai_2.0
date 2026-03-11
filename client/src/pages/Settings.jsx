import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Bell, Lock, Palette, Shield, Camera, Save, Moon, Sun } from 'lucide-react';
import { updateProfile, changePassword, uploadAvatar } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const SERVER_URL = 'http://localhost:5001';

const Settings = () => {
    const { theme, toggleTheme, primaryColor, setPrimaryColor } = useTheme();
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Profile Form State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        age: user?.age || '',
        gender: user?.gender || 'Male',
        bloodGroup: user?.bloodGroup || '',
        height: user?.height || '',
        weight: user?.weight || '',
        avatar: user?.avatar || '',
        emergencyContactName: user?.emergencyContactName || '',
        emergencyContactPhone: user?.emergencyContactPhone || '',
        emergencyContactRelation: user?.emergencyContactRelation || ''
    });

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const updated = await updateProfile(profileData);
            updateUser(updated);
            setMessage({ type: 'success', text: 'Biometric profile synchronized successfully.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Protocol error: Failed to sync profile.' });
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const updated = await uploadAvatar(formData);
            updateUser({ ...user, avatar: updated.avatar });
            setProfileData(prev => ({ ...prev, avatar: updated.avatar }));
            setMessage({ type: 'success', text: 'Bio-shot synchronized successfully.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Upload failed: Integrity check error.' });
        } finally {
            setUploading(false);
        }
    };

    const getFullImageUrl = (url) => {
        if (!url) return '';
        return url.startsWith('http') ? url : `${SERVER_URL}${url}`;
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Validation Error: Protocols do not match.' });
            return;
        }
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            await changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setMessage({ type: 'success', text: 'Encryption key updated successfully.' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setMessage({ type: '', text: '' }), 5000);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Security Error: Update failed.' });
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Biometrics', icon: <User size={18} /> },
        { id: 'security', label: 'Encryption', icon: <Lock size={18} /> },
        { id: 'preferences', label: 'Interface', icon: <Palette size={18} /> },
        { id: 'notifications', label: 'Signals', icon: <Bell size={18} /> },
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-8">
                {/* Header Architectural Layer */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-fade-in">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-px bg-primary"></div>
                            <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">System Configuration v4.0.2</p>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Control Center</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                            Manage your biological identity parameters, security encryption protocols, and neural interface preferences.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
                    {/* Navigation Sidebar (Glassmorphic) */}
                    <div className="lg:col-span-3 space-y-3">
                        <p className="px-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-6">Security Domains</p>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all w-full relative group overflow-hidden ${activeTab === tab.id
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl shadow-primary/10'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.03] border border-transparent hover:border-slate-200 dark:hover:border-white/5'
                                    }`}
                            >
                                <span className={`transition-transform duration-700 ${activeTab === tab.id ? 'scale-110 rotate-3' : 'group-hover:scale-110'}`}>{tab.icon}</span>
                                <span className="font-black text-[11px] uppercase tracking-[0.2em]">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Main Configuration Surface */}
                    <div className="lg:col-span-9">
                        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] p-10 sm:p-16 border border-slate-100 dark:border-white/5 shadow-3xl min-h-[700px] relative overflow-hidden group/surface">
                            {/* Decorative ambient elements */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-[100px] -mr-48 -mt-48 transition-opacity duration-1000"></div>

                            {message.text && (
                                <div className={`mb-12 p-6 rounded-[2rem] flex items-center gap-5 animate-slide-up ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/10' : 'bg-rose-500/10 text-rose-600 border border-rose-500/10'}`}>
                                    <div className={`p-2 rounded-xl ${message.type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                                        <Shield size={20} className="flex-shrink-0" />
                                    </div>
                                    <span className="text-[11px] font-black uppercase tracking-widest">{message.text}</span>
                                </div>
                            )}

                            {activeTab === 'profile' && (
                                <div className="animate-fade-in space-y-12">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-8">
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Biometric Identity</h2>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Personal biological registry data</p>
                                        </div>
                                        <div className="w-16 h-px bg-slate-100 dark:bg-white/10"></div>
                                    </div>

                                    {/* Avatar Interaction Layer */}
                                    <div className="flex flex-col sm:flex-row items-center gap-10 p-10 bg-slate-50/50 dark:bg-white/[0.02] rounded-[3rem] border border-slate-100 dark:border-white/5">
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                            <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105">
                                                {profileData.avatar ? (
                                                    <img src={getFullImageUrl(profileData.avatar)} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-3xl font-black italic">
                                                        {profileData.name?.[0]?.toUpperCase() || 'U'}
                                                    </div>
                                                )}
                                                {uploading && (
                                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-20">
                                                        <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <label className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-xl shadow-xl z-20 border-4 border-white dark:border-slate-900 group-hover:rotate-12 transition-transform cursor-pointer hover:bg-blue-700 active:scale-95">
                                                <Camera size={16} />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                        <div>
                                            <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight italic">Visual Identifier</h3>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-2 max-w-xs uppercase leading-relaxed tracking-wider">
                                                Modulate your biological profile photo. This asset is used for system identification across the HUD.
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleProfileSubmit} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Legal Designation</label>
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Archive Email (Read-only)</label>
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    disabled
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.01] text-slate-400 cursor-not-allowed outline-none font-bold text-sm"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Gender Specification</label>
                                                <select
                                                    value={profileData.gender}
                                                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white appearance-none cursor-pointer"
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Blood Type Index</label>
                                                <input
                                                    type="text"
                                                    value={profileData.bloodGroup}
                                                    onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Temporal Age</label>
                                                <input
                                                    type="number"
                                                    value={profileData.age}
                                                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Mass Analysis (kg)</label>
                                                <input
                                                    type="text"
                                                    value={profileData.weight}
                                                    onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Vertical Scale (cm)</label>
                                                <input
                                                    type="text"
                                                    value={profileData.height}
                                                    onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Emergency Protocol Name</label>
                                                <input
                                                    type="text"
                                                    value={profileData.emergencyContactName}
                                                    onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                    placeholder="John Doe (Next of Kin)"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Signal Protocol (Phone)</label>
                                                <input
                                                    type="text"
                                                    value={profileData.emergencyContactPhone}
                                                    onChange={(e) => setProfileData({ ...profileData, emergencyContactPhone: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Kinship Relation</label>
                                                <input
                                                    type="text"
                                                    value={profileData.emergencyContactRelation}
                                                    onChange={(e) => setProfileData({ ...profileData, emergencyContactRelation: e.target.value })}
                                                    className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black text-sm dark:text-white"
                                                    placeholder="Spouse / Parent / Sibling"
                                                />
                                            </div>
                                        </div>
                                        <div className="pt-10 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full sm:w-auto flex items-center justify-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-3xl disabled:opacity-50 group"
                                            >
                                                <Save size={18} className="group-hover:rotate-12 transition-transform" />
                                                {loading ? 'SYNCHRONIZING...' : 'INITIALIZE SYNC'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="animate-fade-in space-y-12">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-8">
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Access Encryption</h2>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Security protocols and validation keys</p>
                                        </div>
                                        <div className="w-16 h-px bg-slate-100 dark:bg-white/10"></div>
                                    </div>

                                    <form onSubmit={handlePasswordSubmit} className="space-y-10 max-w-xl">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Current Validation Key</label>
                                            <input
                                                type="password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">New Security Protocol</label>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Re-Verify Key</label>
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                className="w-full px-8 py-5 rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-black dark:text-white"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-3xl disabled:opacity-50"
                                        >
                                            {loading ? 'ENCRYPTING ARCHIVE...' : 'RE-INDEX SECURITY PROTOCOL'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="animate-fade-in space-y-12">
                                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-8">
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">System Interface</h2>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Visual modulation and UX architecture</p>
                                        </div>
                                        <div className="w-16 h-px bg-slate-100 dark:bg-white/10"></div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between p-10 bg-slate-50/50 dark:bg-white/[0.02] rounded-[3rem] border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-all group/opt">
                                            <div className="flex items-center gap-10">
                                                <div className="p-6 bg-white dark:bg-white/5 rounded-3xl shadow-xl text-amber-500 group-hover/opt:scale-110 transition-transform duration-700">
                                                    {theme === 'light' ? <Sun size={32} /> : <Moon size={32} />}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-base text-slate-900 dark:text-white uppercase tracking-widest leading-none">Optical Mode</h3>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-3 tracking-wide">Toggle between High-Illumination and Dark-HUD architectures</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => toggleTheme(e)}
                                                className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors focus:outline-none p-1.5 ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200'}`}
                                            >
                                                <span
                                                    className={`inline-block h-9 w-9 transform rounded-full bg-white shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${theme === 'dark' ? 'translate-x-[48px]' : 'translate-x-0'}`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-10 bg-slate-50/50 dark:bg-white/[0.02] rounded-[3rem] border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-all group/opt">
                                            <div className="flex items-center gap-10">
                                                <div
                                                    className="p-6 bg-white dark:bg-white/5 rounded-3xl shadow-xl group-hover/opt:scale-110 transition-transform duration-700"
                                                    style={{ color: primaryColor }}
                                                >
                                                    <Palette size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-base text-slate-900 dark:text-white uppercase tracking-widest leading-none">Spectral Palette</h3>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-3 tracking-wide">Customize primary interaction wavelength</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                {['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#ec4899'].map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setPrimaryColor(color)}
                                                        className={`w-12 h-12 rounded-full border-[6px] shadow-2xl hover:scale-125 transition-all duration-500 active:scale-90 relative ${primaryColor === color ? 'border-primary/50 scale-110' : 'border-white dark:border-slate-800'}`}
                                                        style={{ backgroundColor: color }}
                                                    >
                                                        {primaryColor === color && (
                                                            <div className="absolute inset-0 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="animate-fade-in flex flex-col items-center justify-center h-[550px] text-center space-y-10 group/null">
                                    <div className="bg-primary/10 p-12 rounded-[3.5rem] text-primary relative transition-transform duration-700 group-hover/null:scale-110">
                                        <Bell size={80} />
                                        <div className="absolute top-0 right-0 w-6 h-6 bg-primary rounded-full animate-ping"></div>
                                        <div className="absolute top-0 right-0 w-6 h-6 bg-primary rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Terminal Signals</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm font-medium leading-relaxed">
                                            Signal processing protocols are currently being established. External diagnostic alerts integration coming in v2.5.5.
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                                        <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
