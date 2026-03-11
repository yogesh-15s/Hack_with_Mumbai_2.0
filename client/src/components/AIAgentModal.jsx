import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Sparkles, Activity, ShieldAlert, HeartPulse } from 'lucide-react';

const AIAgentModal = ({ isOpen, onClose, userName }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: `STATUS: ACTIVE. Hello ${userName}. I am your MedVault Neural Assistant. Biological data synchronization complete. How can I assist your diagnostic journey today?`,
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

        // Simulate Neural Processing
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
            { patterns: ['head', 'headache', 'migraine', 'brain'], response: "ANALYSIS: Significant cranial tension detected. Recommend hydration and 20-minute dark-room isolation. If visual distortions occur, seek immediate neurologic evaluation. Have you recorded this in your Head Archive?" },
            { patterns: ['diet', 'eat', 'food', 'nutrition', 'sugar', 'meal'], response: "SIGNAL: Optimize biological fuel. Recommend increasing omega-3 fatty acids and reducing glucose spikes for enhanced neural performance. Would you like a suggested meal schematic?" },
            { patterns: ['exercise', 'workout', 'run', 'walk', 'gym', 'training'], response: "DIRECTIVE: Cardiovascular activation required. 30-minute metabolic stimulation improves cardiac longevity. Baseline target: 120-140 BPM." },
            { patterns: ['sleep', 'tired', 'insomnia', 'fatigue', 'rest'], response: "PROTOCOL: Circadian rhythm synchronization required. 7.5 hours of REM-heavy rest is optimal for neural plastic recovery. Avoid blue-spectrum light 90 minutes before shutdown." },
            { patterns: ['heart', 'pulse', 'cardio', 'chest', 'blood pressure'], response: "CRITICAL: Cardiac region analysis prioritized. If chest pressure exceeds threshold or rhythm becomes erratic, initiate Emergency Mode immediately." },
            { patterns: ['water', 'drink', 'hydration', 'thirsty'], response: "REFRESH: Cellular hydration levels critical for cognitive output. Recommended intake: 2.8 Liters per diurnal cycle." },
            { patterns: ['stress', 'anxiety', 'mental', 'feel', 'sad', 'happy'], response: "NEURAL BALANCE: Elevated cortisol markers detected. Suggest 5-minute recursive breathing protocol. Mental health is a core biological pillar." },
            { patterns: ['back', 'pain', 'spine', 'sit', 'posture'], response: "STRUCTURAL: Spinal alignment compromised. Perform thoracic extensions every 60 minutes of terminal usage." },
            { patterns: ['fever', 'cold', 'flu', 'sick', 'cough'], response: "THERMAL: Baseline temperature exceedance detected. Restrict physical output and initiate high-fluid protocol. Monitor vitals every 4 hours." },
            { patterns: ['hello', 'hi', 'hey', 'help'], response: `NEURAL HANDSHAKE: Successful. I am MedVault v4.0. I can analyze symptoms, suggest metabolic optimizations, and decode clinical terminology. Awaiting directive.` }
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

        return "UNCERTAINTY: Biological query outside current diagnostic scope. However, maintaining hydration and consistent sleep is always logically sound. Would you like to view your Vitals Dashboard for deeper insights?";
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-[#030712] rounded-[3.5rem] border border-primary/20 shadow-[0_0_80px_rgba(59,130,246,0.15)] flex flex-col h-[85vh] overflow-hidden animate-zoom-in group">
                {/* Header HUD Layer */}
                <div className="px-10 py-8 bg-slate-900 border-b border-white/5 flex items-center justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none scanner-grid"></div>
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="bg-blue-600 p-3.5 rounded-2xl shadow-xl shadow-blue-600/20 animate-pulse">
                            <Bot size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tighter italic leading-none">Neural Interface v4.0</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Status: Optimized</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 bg-white/5 hover:bg-rose-500 hover:text-white rounded-2xl transition-all hover:rotate-90 relative z-10">
                        <X size={24} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary opacity-20"></div>
                </div>

                {/* Chat Interface */}
                <div className="flex-1 flex flex-col bg-slate-50/20 dark:bg-transparent overflow-hidden relative">
                    {/* Background Visual Enhancements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none"></div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-10 custom-scrollbar relative z-10">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                            >
                                <div className={`flex gap-5 max-w-[88%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg transition-transform duration-500 hover:scale-110 ${msg.type === 'user'
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-blue-600 text-white'
                                        }`}>
                                        {msg.type === 'user' ? <User size={20} /> : <Sparkles size={20} />}
                                    </div>
                                    <div className={`space-y-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                                        <div className={`px-8 py-5 rounded-[2.5rem] text-sm font-medium leading-relaxed shadow-sm border ${msg.type === 'user'
                                            ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-100 dark:border-white/5 rounded-tr-none'
                                            : 'bg-slate-900 border-white/5 text-white rounded-tl-none relative overflow-hidden'
                                            }`}>
                                            {msg.type === 'bot' && (
                                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-50"></div>
                                            )}
                                            {msg.text}
                                        </div>
                                        <div className={`flex items-center gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-50">Protocol: {msg.type === 'user' ? 'TX' : 'RX'}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 opacity-50">{msg.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                                        <Bot size={20} />
                                    </div>
                                    <div className="bg-slate-900 border border-white/5 px-8 py-5 rounded-[2rem] rounded-tl-none flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-duration:800ms]"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-duration:800ms] [animation-delay:200ms]"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-duration:800ms] [animation-delay:400ms]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Architecture (HUD Style) */}
                    <div className="p-8 sm:p-12 bg-white dark:bg-slate-900/50 backdrop-blur-3xl border-t border-slate-100 dark:border-white/5">
                        <form onSubmit={handleSend} className="relative group">
                            <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                                <Activity size={18} className="text-primary/50 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="ISSUE DIRECTIVE..."
                                className="w-full pl-16 pr-24 py-6 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 text-sm font-black text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 uppercase tracking-widest"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-30 shadow-2xl"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <div className="mt-6 flex justify-between items-center px-4">
                            <p className="text-[9px] font-black text-slate-300 dark:text-white/10 uppercase tracking-[0.4em]">Neural Encryption Protocol: ACTIVE</p>
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAgentModal;
