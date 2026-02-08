import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Sparkles, Activity, ShieldAlert, HeartPulse } from 'lucide-react';

const AIAgentModal = ({ isOpen, onClose, userName }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: `Hello ${userName}! I'm your MedVault AI Assistant. How can I help you today? I can provide health suggestions, analyze your recent activity, or explain medical terms.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const botResponse = getAIResponse(input);
            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: botResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const getAIResponse = (query) => {
        const q = query.toLowerCase();

        // Comprehensive Medical Logic Base
        const healthKnowledge = [
            { patterns: ['head', 'headache', 'migraine', 'brain'], response: "For persistent headaches, ensure you are well-hydrated and have had enough sleep. If it's severe or accompanied by vision changes, please consult a physician. Have you logged this in your Head section yet?" },
            { patterns: ['diet', 'eat', 'food', 'nutrition', 'sugar', 'meal'], response: "A balanced diet rich in leafy greens, proteins, and healthy fats is essential for recovery. Try to limit processed sugars for better energy stability throughout the day." },
            { patterns: ['exercise', 'workout', 'run', 'walk', 'gym', 'training'], response: "Regular physical activity improves cardiovascular health. Even a 30-minute brisk walk daily has significant long-term benefits. Always consult a doctor before starting a new intense regimen." },
            { patterns: ['sleep', 'tired', 'insomnia', 'fatigue', 'rest'], response: "Adults typically need 7-9 hours of quality sleep. Try maintaining a consistent sleep schedule and avoiding screens 1 hour before bedtime for better melatonin production." },
            { patterns: ['heart', 'pulse', 'cardio', 'chest', 'blood pressure'], response: "Heart health is vital. Aim for low sodium intake and regular cardio. If you experience sudden chest pain or irregular heartbeats, seek immediate medical attention." },
            { patterns: ['water', 'drink', 'hydration', 'thirsty'], response: "Most people need about 2-3 liters of water per day. Proper hydration improves skin health, kidney function, and cognitive performance." },
            { patterns: ['stress', 'anxiety', 'mental', 'feel', 'sad', 'happy'], response: "Mental health is as important as physical health. Practicing mindfulness, deep breathing, or speaking to a professional can help manage stress levels." },
            { patterns: ['back', 'pain', 'spine', 'sit', 'posture'], response: "Back pain is often caused by posture. Ensure you have an ergonomic setup and perform light stretching daily to strengthen your core." },
            { patterns: ['fever', 'cold', 'flu', 'sick', 'cough'], response: "If you have a fever, rest and stay hydrated. Monitor your temperature and see a doctor if it stays high for more than 48 hours." },
            { patterns: ['hello', 'hi', 'hey', 'help'], response: `Hello! I'm your MedVault Smart Assistant. I can help with diet, exercise, symptom explanations, and more. What's on your mind?` }
        ];

        // Find best match based on keyword frequency
        let bestMatch = null;
        let maxScore = 0;

        healthKnowledge.forEach(item => {
            let score = 0;
            item.patterns.forEach(p => {
                if (q.includes(p)) score++;
            });
            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        });

        if (bestMatch && maxScore > 0) {
            return bestMatch.response;
        }

        return "I'm not quite sure about that specific query, but as your medical assistant, I suggest checking if you've added relevant records to your body model. Generally, maintaining a consistent sleep rhythm and hydration is a great starting point for any recovery. Would you like to check your Vitals instead?";
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-[#020617] rounded-[2.5rem] border border-blue-500/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col h-[80vh] overflow-hidden animate-zoom-in">
                {/* Header */}
                <div className="px-8 py-6 bg-blue-600 dark:bg-blue-600 flex items-center justify-between text-white shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                            <Bot size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tight">MedVault AI</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Online Assistant</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* Professional Maintenance State */}
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 dark:bg-[#020617]/50 relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative mb-10 group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse transition-all group-hover:bg-blue-500/30"></div>
                        <div className="relative bg-white dark:bg-[#0f172a] p-10 rounded-[3.5rem] border border-blue-500/10 shadow-2xl transform transition-transform hover:scale-105 duration-700">
                            <Bot size={80} className="text-blue-500 animate-pulse" />
                            <div className="absolute -top-2 -right-2 bg-blue-600 p-3 rounded-2xl shadow-lg border-2 border-white dark:border-[#0f172a]">
                                <Sparkles size={20} className="text-white animate-spin-slow" />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-4 italic leading-tight">
                        Neural Engine <br /> Under Calibration
                    </h3>

                    <div className="max-w-md space-y-8 relative z-10">
                        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-medium">
                            The <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">MedVault Intelligence Suite</span> is undergoing scheduled optimization to ensure maximum diagnostic accuracy.
                        </p>

                        <div className="bg-blue-600/5 dark:bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-6 flex flex-col gap-3 text-left shadow-inner">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">System Status: Optimizing Nodes</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide opacity-80">
                                Global users will receive a secure notification once the synchronization is finalized.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-2 pt-4">
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] font-black">
                                Protocol v4.0.2 Deployment
                            </p>
                            <div className="h-1 w-32 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-blue-600 animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secure Footer */}
                <div className="p-10 bg-white dark:bg-[#020617] border-t border-blue-100 dark:border-white/5 flex justify-center text-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-white/10">MedVault Biometric Security Protocol Enforced</span>
                </div>
            </div>
        </div>
    );
};

export default AIAgentModal;
