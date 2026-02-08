import React from 'react';
import { X, Phone, AlertTriangle, Droplet } from 'lucide-react';

const EmergencyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-slate-200 dark:border-slate-800">
                <div className="bg-red-600 p-6 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <AlertTriangle className="animate-pulse" />
                            EMERGENCY ID CARD
                        </h2>
                        <p className="text-red-100 mt-1">Show this to medical personnel</p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            {/* User avatar placeholder */}
                            <svg className="w-full h-full text-slate-400 dark:text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">John Doe</h3>
                            <p className="text-slate-500 dark:text-slate-400">DOB: Jan 1, 1990</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold mb-1">
                                <Droplet size={18} /> Blood Type
                            </div>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">O+</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30">
                            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold mb-1">
                                <AlertTriangle size={18} /> Allergies
                            </div>
                            <p className="font-medium text-slate-800 dark:text-slate-200">Penicillin, Peanuts</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Emergency Contacts</h4>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Jane Doe (Wife)</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">+1 (555) 123-4567</p>
                            </div>
                            <a href="tel:+15551234567" className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
                                <Phone size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    MedVault Emergency Access System
                </div>
            </div>
        </div>
    );
};

export default EmergencyModal;
