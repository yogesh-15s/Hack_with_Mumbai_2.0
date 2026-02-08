import React, { useState } from 'react';
import { Bell, User, AlertCircle } from 'lucide-react';
import EmergencyModal from './EmergencyModal';

const TopBar = () => {
    const [emergencyMode, setEmergencyMode] = useState(false);

    return (
        <>
            <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 pl-72 fixed top-0 right-0 left-0 z-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setEmergencyMode(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${emergencyMode
                                ? 'bg-red-50 border-red-200 text-red-600 animate-pulse'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <AlertCircle size={18} />
                        <span className="font-medium">Emergency Mode</span>
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-6 text-slate-500 font-medium text-sm">
                        <a href="#" className="hover:text-primary transition-colors">Home</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
                    </nav>

                    <div className="w-px h-6 bg-slate-200"></div>

                    <button className="relative text-slate-500 hover:text-primary transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                        <User size={20} />
                    </button>
                </div>
            </header>

            <EmergencyModal isOpen={emergencyMode} onClose={() => setEmergencyMode(false)} />
        </>
    );
};

export default TopBar;
