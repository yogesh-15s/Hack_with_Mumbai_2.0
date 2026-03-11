import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Camera, Shield, Save, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { updateProfile, uploadAvatar } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = 'http://localhost:5001';

const avatars = [
    { id: 'av-1', url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200', label: 'Clinical Expert' },
    { id: 'av-2', url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200', label: 'Bio-Ident Tech' },
    { id: 'av-3', url: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c7e5?auto=format&fit=crop&q=80&w=200&h=200', label: 'Genome Analyst' },
    { id: 'av-4', url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200', label: 'Neural Surgeon' },
    { id: 'av-5', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200', label: 'Research Chief' },
    { id: 'av-6', url: 'https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&q=80&w=200&h=200', label: 'Field Medic' },
];

const Profile = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');

    const handleSaveAvatar = async () => {
        setLoading(true);
        try {
            const updated = await updateProfile({ ...user, avatar: selectedAvatar });
            updateUser(updated);
            setMessage({ type: 'success', text: 'Biometric avatar synchronized.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Sync failed: Protocol rejection.' });
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
            setSelectedAvatar(updated.avatar);
            setMessage({ type: 'success', text: 'Bio-shot uploaded successfully.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
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

    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-8">
                {/* Back Command */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all mb-12 group"
                >
                    <div className="p-2 rounded-xl group-hover:bg-slate-100 dark:group-hover:bg-white/5 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Hub</span>
                </button>

                <div className="space-y-12">
                    {/* Header Architectural Layer */}
                    <div className="flex flex-col gap-4 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-px bg-blue-500"></div>
                            <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Identity Modulation v1.0.4</p>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Biological Profile</h1>
                    </div>

                    {message.text && (
                        <div className={`p-6 rounded-[2rem] flex items-center gap-5 animate-slide-up ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/10' : 'bg-rose-500/10 text-rose-600 border border-rose-500/10'}`}>
                            <div className={`p-2 rounded-xl ${message.type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                                <Shield size={20} className="flex-shrink-0" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest">{message.text}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Current Identity Status */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-3xl flex flex-col items-center group">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105">
                                        {selectedAvatar ? (
                                            <img src={getFullImageUrl(selectedAvatar)} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-4xl font-black italic">
                                                {user?.name?.[0].toUpperCase()}
                                            </div>
                                        )}
                                        {uploading && (
                                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-20">
                                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 p-4 bg-blue-600 text-white rounded-2xl shadow-xl z-20 border-4 border-white dark:border-slate-900 group-hover:rotate-12 transition-transform cursor-pointer hover:bg-blue-700 active:scale-95">
                                        <Camera size={20} />
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 italic">{user?.name}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{user?.email}</p>
                                </div>
                            </div>

                            <div className="bg-blue-600 text-white rounded-[3rem] p-8 shadow-2xl shadow-blue-500/20 group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Sparkles size={16} />
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Security Level</span>
                                    </div>
                                    <p className="text-2xl font-black italic leading-none">BIOMETRIC AUTH-04</p>
                                    <p className="text-[10px] opacity-70 font-medium leading-relaxed">Your medical vault is protected by enterprise-grade cryptographic layers.</p>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Modulation Panel */}
                        <div className="lg:col-span-8 flex flex-col gap-10">
                            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] p-10 sm:p-14 border border-slate-100 dark:border-white/5 shadow-3xl">
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-8 mb-10">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Avatar Modulation</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Select your biological visual identifier</p>
                                    </div>
                                    <div className="w-12 h-px bg-slate-100 dark:bg-white/10"></div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                    {/* Upload Custom Card */}
                                    <label className="relative group rounded-[2rem] overflow-hidden border-4 border-dashed border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:bg-blue-500/[0.02] transition-all duration-500 aspect-square flex flex-col items-center justify-center cursor-pointer gap-3">
                                        <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                            <Camera size={24} />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500">Custom Bio-Shot</p>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                    </label>

                                    {avatars.map((avatar) => (
                                        <button
                                            key={avatar.id}
                                            onClick={() => setSelectedAvatar(avatar.url)}
                                            className={`relative group rounded-[2rem] overflow-hidden border-4 transition-all duration-500 aspect-square ${selectedAvatar === avatar.url ? 'border-blue-500 scale-95 shadow-inner' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'}`}
                                        >
                                            <img src={avatar.url} alt={avatar.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className={`absolute inset-0 bg-blue-500/40 flex items-center justify-center transition-opacity duration-500 ${selectedAvatar === avatar.url ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                                                {selectedAvatar === avatar.url && <div className="bg-white text-blue-500 p-3 rounded-2xl shadow-2xl"><Check size={24} strokeWidth={4} /></div>}
                                            </div>
                                            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                                <p className="text-[8px] font-black text-white uppercase tracking-widest text-center">{avatar.label}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-end">
                                    <button
                                        onClick={handleSaveAvatar}
                                        disabled={loading || selectedAvatar === user?.avatar || uploading}
                                        className="flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-3xl disabled:opacity-50 group"
                                    >
                                        <Save size={18} className="group-hover:rotate-12 transition-transform" />
                                        {loading ? 'MODULATING...' : 'SYNC IDENTIFIER'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
