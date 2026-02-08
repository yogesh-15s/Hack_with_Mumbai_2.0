import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import { Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login: authLogin } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            let userData;
            if (isLogin) {
                userData = await login(email, password);
            } else {
                userData = await register(email, password, name);
            }

            // Update Auth Context
            authLogin(userData.user, userData.token);

            if (isLogin) {
                navigate('/dashboard');
            } else {
                navigate('/health-setup');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-500/10 dark:bg-emerald-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/50 dark:border-slate-800 relative z-10 animate-slide-up">
                <div className="flex flex-col items-center mb-8">
                    <div className="mb-6 transform hover:scale-110 transition-transform duration-500">
                        <Logo className="w-16 h-16" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">MedVault</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-center">
                        {isLogin ? 'Welcome back! Access your medical history.' : 'Create your secure personal health locker.'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 flex items-center gap-2 animate-fade-in">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 dark:text-white"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group transform active:scale-[0.98]"
                    >
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
