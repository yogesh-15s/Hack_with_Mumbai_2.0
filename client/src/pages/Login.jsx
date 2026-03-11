import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister } from '../services/api';
import { Activity, ShieldCheck, ArrowRight, User, Stethoscope, Building2 } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login: authLogin } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const selectedRole = localStorage.getItem('selectedRole') || 'patient';
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let userData;
            if (isLogin) {
                userData = await apiLogin(email, password);
            } else {
                userData = await apiRegister(email, password, name, selectedRole);
            }

            // Update Auth Context
            authLogin(userData.user, userData.token);

            if (isLogin) {
                navigate('/dashboard');
            } else {
                navigate('/health-setup');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Security Protocol Failure: Invalid Credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Ambient HUD Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] scanner-grid"></div>
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
            </div>

            {/* Corner Decorative Elements (HUD Style) */}
            <div className="hidden lg:block absolute top-12 left-12 space-y-2 opacity-30">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <div className="w-12 h-px bg-slate-200 dark:bg-white/10"></div>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Node: 0x4f2a7b</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Region: Global-Alpha</p>
            </div>

            <div className="w-full max-w-[520px] bg-white/70 dark:bg-slate-900/40 backdrop-blur-[40px] p-12 sm:p-16 rounded-[4.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-100 dark:border-white/5 relative z-10 animate-zoom-in overflow-hidden group">
                {/* Microscopic details */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <div className="absolute top-10 right-10 flex gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-blue-500/40"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500/40"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                </div>

                <div className="flex flex-col items-center mb-16">
                    <div className="mb-10 relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                        <div className="relative p-7 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-slate-50 dark:border-white/5 group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out">
                            <Logo className="w-12 h-12" />
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-6 h-px bg-blue-500/30"></div>
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] leading-none">Vault Access Protocol</p>
                            <div className="w-6 h-px bg-blue-500/30"></div>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">MedVault</h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                selectedRole === 'doctor' ? 'bg-teal-500/10 text-teal-500' : 
                                selectedRole === 'hospital' ? 'bg-indigo-500/10 text-indigo-500' : 
                                'bg-blue-500/10 text-blue-500'
                            }`}>
                                {selectedRole} portal
                            </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold max-w-[280px] mx-auto leading-relaxed uppercase tracking-wider opacity-60 mt-4">
                            {isLogin ? 'Establish high-bandwidth encrypted connection.' : 'Register biometric keys for repository initialization.'}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-rose-500/5 border border-rose-500/10 text-rose-600 p-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.15em] mb-10 flex items-center gap-4 animate-slide-up">
                        <div className="p-2 bg-rose-500/10 rounded-xl">
                            <ShieldCheck size={18} className="animate-pulse" />
                        </div>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {!isLogin && (
                        <div className="space-y-3 animate-fade-in">
                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Legal Identity</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
                                    <Activity size={16} className="text-blue-500/40" />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-16 pr-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">Secure Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest"
                            placeholder="user@repository.com"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Validation Key</label>
                            {isLogin && (
                                <button type="button" className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline underline-offset-4">Lost Protocol?</button>
                            )}
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-8 py-5 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-black text-sm dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700"
                            placeholder="••••••••••••"
                            required
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-900 py-6 rounded-[2.2rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-none hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
                                    <span className="ml-2 uppercase tracking-[0.5em]">Synchronizing</span>
                                </div>
                            ) : (
                                <>
                                    <span>{isLogin ? 'Establish Connection' : 'Initialize Vault'}</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-14 pt-10 border-t border-slate-50 dark:border-white/[0.03] text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="group relative inline-flex flex-col items-center gap-3"
                    >
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] transition-colors group-hover:text-blue-500">
                            {isLogin ? "Neural Network Disconnected?" : "Identity Validation Ready?"}
                        </span>
                        <span className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-[0.2em] relative overflow-hidden pb-1 px-1">
                            {isLogin ? 'Request Repository Access' : 'Return to Validation Terminal'}
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        </span>
                    </button>
                </div>

                <div className="mt-10 flex justify-center gap-2 opacity-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
