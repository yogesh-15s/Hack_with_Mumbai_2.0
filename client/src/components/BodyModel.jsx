import React from 'react';
import { useTheme } from '../context/ThemeContext';

const BodyModel = ({ onPartClick }) => {
    const { theme } = useTheme();

    const handlePartClick = (id, name) => {
        if (onPartClick) {
            onPartClick({ id, name, type: 'muscle' });
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full h-full">
            <div className="relative w-full h-full flex items-center justify-center bg-transparent p-4 overflow-hidden group">
                {/* Ambient Scan Effect */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10 opacity-30 animate-scan pointer-events-none"></div>

                <svg
                    viewBox="0 0 660.46 1206.46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-1000 group-hover:drop-shadow-[0_0_50px_rgba(59,130,246,0.2)]"
                >
                    <defs>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.15" />
                        </linearGradient>

                        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>

                        <filter id="premium-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="10" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    <style>
                        {`
                            .anatomy-path { 
                                fill: ${theme === 'dark' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(37, 99, 235, 0.03)'};
                                stroke: ${theme === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.2)'}; 
                                stroke-width: 1.5;
                                transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); 
                                cursor: pointer;
                                vector-effect: non-scaling-stroke;
                            }
                            .anatomy-path:hover { 
                                fill: rgba(59, 130, 246, 0.2);
                                stroke: #3b82f6;
                                stroke-width: 2.5;
                                filter: url(#premium-glow);
                            }
                            @keyframes scan {
                                0% { top: 0%; opacity: 0; }
                                20% { opacity: 0.5; }
                                80% { opacity: 0.5; }
                                100% { top: 100%; opacity: 0; }
                            }
                            .animate-scan {
                                animation: scan 4s linear infinite;
                            }
                        `}
                    </style>

                    {/* HEAD */}
                    <g className="anatomy-path" onClick={() => handlePartClick('head', 'Head & Neck')}>
                        <path d="M330.2,80 C330.2,80 370,85 375,130 C380,175 365,190 330.2,190 C295,190 280,175 285,130 C290,85 330.2,80 330.2,80 Z" />
                    </g>

                    {/* TORSO / CHEST */}
                    <g className="anatomy-path" onClick={() => handlePartClick('chest', 'Chest')}>
                        <path d="M330.2,225 C330.2,225 380,220 420,240 C420,240 430,280 380,300 C380,300 335,280 330.2,300 C325,280 280,300 280,300 C230,280 240,240 240,240 C280,220 330.2,225 330.2,225 Z" />
                    </g>

                    {/* SHOULDERS */}
                    <g className="anatomy-path" onClick={() => handlePartClick('shoulders', 'Shoulders')}>
                        <path d="M240,240 Q210,250 190,290 Q200,330 220,340 Q245,300 240,240" />
                        <path d="M420,240 Q450,250 470,290 Q460,330 440,340 Q415,300 420,240" />
                    </g>

                    {/* ARMS */}
                    <g className="anatomy-path" onClick={() => handlePartClick('arms', 'Arms')}>
                        <path d="M190,290 Q170,350 160,400 Q190,410 210,400 Q225,350 220,340" />
                        <path d="M470,290 Q490,350 500,400 Q470,410 450,400 Q435,350 440,340" />
                    </g>

                    {/* FOREARMS */}
                    <g className="anatomy-path" onClick={() => handlePartClick('forearms', 'Forearms')}>
                        <path d="M160,400 Q140,450 135,500 L130,520 Q150,530 170,520 L175,500 Q190,450 210,400" />
                        <path d="M500,400 Q520,450 525,500 L530,520 Q510,530 490,520 L485,500 Q470,450 450,400" />
                    </g>

                    {/* ABDOMINALS */}
                    <g className="anatomy-path" onClick={() => handlePartClick('abs', 'Abdominals')}>
                        <path d="M330.2,300 L330.2,480 M290,310 Q290,400 300,460 L330.2,480 L360,460 Q370,400 370,310 L330.2,300" />
                    </g>

                    {/* HIPS */}
                    <g className="anatomy-path" onClick={() => handlePartClick('hips', 'Hips')}>
                        <path d="M260,450 Q280,550 330.2,580 Q380,550 400,450 L360,460 L330.2,480 L300,460 Z" />
                    </g>

                    {/* QUADS */}
                    <g className="anatomy-path" onClick={() => handlePartClick('quads', 'Quadriceps')}>
                        <path d="M260,450 Q240,600 250,700 Q300,720 320,700 Q330,600 330.2,580 Q280,550 260,450" />
                        <path d="M400,450 Q420,600 410,700 Q360,720 340,700 Q330,600 330.2,580 Q380,550 400,450" />
                    </g>

                    {/* KNEES */}
                    <g className="anatomy-path" onClick={() => handlePartClick('knees', 'Knees')}>
                        <path d="M250,700 Q260,750 270,760 Q300,770 310,760 Q315,750 320,700" />
                        <path d="M410,700 Q400,750 390,760 Q360,770 350,760 Q345,750 340,700" />
                    </g>

                    {/* CALVES */}
                    <g className="anatomy-path" onClick={() => handlePartClick('calves', 'Calves')}>
                        <path d="M270,760 Q250,850 260,950 Q290,960 300,950 Q310,850 310,760" />
                        <path d="M390,760 Q410,850 400,950 Q370,960 360,950 Q350,850 350,760" />
                    </g>

                    {/* FEET */}
                    <g className="anatomy-path" onClick={() => handlePartClick('feet', 'Feet')}>
                        <path d="M260,950 Q240,1000 230,1020 L270,1030 Q290,1000 300,950" />
                        <path d="M400,950 Q420,1000 430,1020 L390,1030 Q370,1000 360,950" />
                    </g>
                </svg>

                {/* Decorative UI elements for the scanner */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Anatomy Scanner</span>
                </div>
            </div>
        </div>
    );
};

export default BodyModel;
