import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Stethoscope, Building2, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

const RoleSelection = () => {
    const navigate = useNavigate();

    const roles = [
        {
            id: 'patient',
            title: 'Patient',
            description: 'Access your secure medical vault, manage records, and track health history.',
            icon: <User size={32} className="text-blue-500" />,
            color: 'blue'
        },
        {
            id: 'doctor',
            title: 'Doctor',
            description: 'Access patient records, manage appointments, and provide digital prescriptions.',
            icon: <Stethoscope size={32} className="text-teal-500" />,
            color: 'teal'
        },
        {
            id: 'hospital',
            title: 'Hospital',
            description: 'Manage facility operations, staff, and comprehensive patient care records.',
            icon: <Building2 size={32} className="text-indigo-500" />,
            color: 'indigo'
        }
    ];

    const handleRoleSelect = (roleId) => {
        localStorage.setItem('selectedRole', roleId);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#030712] flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Ambient HUD Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.07] scanner-grid"></div>
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
                <div className="mb-12 relative animate-fade-in">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                    <div className="relative p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl border border-slate-50 dark:border-white/5">
                        <Logo className="w-16 h-16" />
                    </div>
                </div>

                <div className="text-center mb-16 space-y-4 animate-slide-up">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-px bg-blue-500/30"></div>
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] leading-none">System Access Point</p>
                        <div className="w-12 h-px bg-blue-500/30"></div>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Welcome to MedVault</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold max-w-lg mx-auto leading-relaxed uppercase tracking-wider opacity-60">
                        Select your operational identity to initialize secure repository synchronization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl animate-fade-in-up">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => handleRoleSelect(role.id)}
                            className="group relative flex flex-col items-start p-8 bg-white/70 dark:bg-slate-900/40 backdrop-blur-[40px] rounded-[3rem] border border-slate-100 dark:border-white/5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 text-left overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className={`p-5 rounded-3xl bg-${role.color}-500/10 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                {role.icon}
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic mb-3">
                                {role.title}
                            </h3>
                            
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                                {role.description}
                            </p>

                            <div className="mt-auto flex items-center gap-3 text-blue-500 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
                                <span>Initialize Session</span>
                                <ArrowRight size={14} />
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-8 -right-8 opacity-[0.03] dark:opacity-[0.05] transition-transform duration-700 group-hover:scale-150">
                                {role.icon}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-16 flex justify-center gap-4 opacity-30">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse [animation-delay:0.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse [animation-delay:0.6s]"></div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
