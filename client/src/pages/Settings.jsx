import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Bell, Lock, Palette, Shield, CreditCard, ChevronRight, Save, Moon, Sun } from 'lucide-react';
import { updateProfile, changePassword } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    // Profile Form State
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        age: user?.age || '',
        gender: user?.gender || 'Male',
        bloodGroup: user?.bloodGroup || '',
        height: user?.height || '',
        weight: user?.weight || ''
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
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            await changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to change password.' });
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={20} /> },
        { id: 'security', label: 'Security', icon: <Lock size={20} /> },
        { id: 'preferences', label: 'Preferences', icon: <Palette size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    ];

    return (
        <Layout>
            <div className="w-full animate-slide-up pr-6 pb-10">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 sm:mt-2">Manage your account settings and preferences.</p>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-4 gap-6 sm:gap-8">
                    {/* Tabs - Scrollable on mobile */}
                    <div className="md:col-span-1 flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-2 sm:gap-1 no-scrollbar sticky top-[80px] z-20 bg-[#f8fafc]/80 dark:bg-[#020617]/80 backdrop-blur-md -mx-2 px-2 md:mx-0 md:px-0">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-xl transition-all whitespace-nowrap md:w-full ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm'
                                    }`}
                            >
                                <span className="flex-shrink-0">{tab.icon}</span>
                                <span className="font-medium text-sm sm:text-base">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px]">
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                                }`}>
                                <Shield size={18} className="flex-shrink-0" />
                                <span className="text-sm font-medium">{message.text}</span>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Personal Information</h2>
                                <form onSubmit={handleProfileSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                disabled
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Gender</label>
                                            <select
                                                value={profileData.gender}
                                                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Blood Group</label>
                                            <input
                                                type="text"
                                                value={profileData.bloodGroup}
                                                onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Age</label>
                                            <input
                                                type="number"
                                                value={profileData.age}
                                                onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weight (kg)</label>
                                            <input
                                                type="text"
                                                value={profileData.weight}
                                                onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
                                    >
                                        <Save size={20} />
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Security Settings</h2>
                                <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-slate-900 dark:bg-slate-700 text-white py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-600 transition-all shadow-lg disabled:opacity-50"
                                    >
                                        {loading ? 'Updating...' : 'Update Password'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'preferences' && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Visual Preferences</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-amber-500">
                                                {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white">Appearance</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => toggleTheme(e)}
                                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-primary' : 'bg-slate-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-blue-500">
                                                <Palette size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white">Accent Color</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Customize the application primary color</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {['#3b82f6', '#10b981', '#ef4444', '#8b5cf6'].map(color => (
                                                <button
                                                    key={color}
                                                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="animate-fade-in flex flex-col items-center justify-center h-full text-center py-12">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-full text-blue-500 mb-4">
                                    <Bell size={48} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notification Settings</h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">We are currently working on push notifications. Stay tuned for updates!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
