import React from 'react';
import { useTheme } from '../context/ThemeContext';

const BodyModel = ({ onPartClick }) => {
    const { theme } = useTheme();
    // Helper to handle clicks
    const handlePartClick = (id, name) => {
        if (onPartClick) {
            onPartClick({ id, name, type: 'muscle' });
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[450px] aspect-[1/2] flex items-center justify-center bg-transparent rounded-3xl p-6 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

                <svg
                    viewBox="0 0 660.46 1206.46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-2xl transition-transform duration-700"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.2))' }}
                >
                    <defs>
                        <linearGradient id="muscle3d" x1="20%" y1="0%" x2="80%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="muscleHover" x1="20%" y1="0%" x2="80%" y2="100%">
                            <stop offset="0%" stopColor="#93c5fd" />
                            <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                        <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feComponentTransfer in="SourceAlpha">
                                <feFuncA type="table" tableValues="1 0" />
                            </feComponentTransfer>
                            <feGaussianBlur stdDeviation="3" />
                            <feOffset dx="2" dy="4" result="offsetblur" />
                            <feFlood floodColor="rgb(59, 130, 246)" floodOpacity="0.3" />
                            <feComposite in2="offsetblur" operator="in" />
                            <feComposite in2="SourceAlpha" operator="in" />
                            <feMerge>
                                <feMergeNode in="SourceGraphic" />
                                <feMergeNode />
                            </feMerge>
                        </filter>
                    </defs>
                    <style>
                        {`
                            .bodymap { 
                                fill: ${theme === 'dark' ? 'url(#muscle3d)' : 'rgba(59, 130, 246, 0.1)'};
                                stroke: ${theme === 'dark' ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.3)'}; 
                                stroke-width: 1.5px;
                                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
                                cursor: pointer;
                                filter: ${theme === 'dark' ? 'url(#inset-shadow)' : 'none'};
                            }
                            .bodymap:hover { 
                                fill: ${theme === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.2)'};
                                stroke: #3b82f6;
                                stroke-width: 2.5px;
                                filter: drop-shadow(0 0 15px rgba(59, 130, 246, ${theme === 'dark' ? '0.6' : '0.2'}));
                            }
                            .bodymap:active { 
                                opacity: 0.8;
                                scale: 0.98;
                            }
                        `}
                    </style>

                    {/* HEAD & NECK */}
                    <g id="head" className="bodymap" onClick={() => handlePartClick('head', 'Head & Neck')}>
                        <path d="M330.2,80 C330.2,80 370,85 375,130 C380,175 365,190 330.2,190 C295,190 280,175 285,130 C290,85 330.2,80 330.2,80 Z" />
                        <path d="M330.2,190 L330.2,215 M310,190 Q305,210 290,225 M350,190 Q355,210 370,225" fill="none" />
                    </g>

                    {/* CHEST */}
                    <g id="chest" className="bodymap" onClick={() => handlePartClick('chest', 'Chest')}>
                        <path d="M330.2,225 C330.2,225 380,220 420,240 C420,240 430,280 380,300 C380,300 335,280 330.2,300 C325,280 280,300 280,300 C230,280 240,240 240,240 C280,220 330.2,225 330.2,225 Z" />
                        <line x1="330.2" y1="225" x2="330.2" y2="300" stroke="#1f2937" strokeWidth="2" />
                    </g>

                    {/* SHOULDERS (Deltoids) */}
                    <g id="shoulders" className="bodymap" onClick={() => handlePartClick('shoulders', 'Shoulders')}>
                        <path d="M240,240 Q210,250 190,290 Q200,330 220,340 Q245,300 240,240" />
                        <path d="M420,240 Q450,250 470,290 Q460,330 440,340 Q415,300 420,240" />
                    </g>

                    {/* ARMS (Biceps/Triceps) */}
                    <g id="arms" className="bodymap" onClick={() => handlePartClick('arms', 'Arms')}>
                        <path d="M190,290 Q170,350 160,400 Q190,410 210,400 Q225,350 220,340" />
                        <path d="M470,290 Q490,350 500,400 Q470,410 450,400 Q435,350 440,340" />
                    </g>

                    {/* FOREARMS */}
                    <g id="forearms" className="bodymap" onClick={() => handlePartClick('forearms', 'Forearms')}>
                        <path d="M160,400 Q140,450 135,500 L130,520 Q150,530 170,520 L175,500 Q190,450 210,400" />
                        <path d="M500,400 Q520,450 525,500 L530,520 Q510,530 490,520 L485,500 Q470,450 450,400" />
                    </g>

                    {/* ABS (Abdominals) */}
                    <g id="abs" className="bodymap" onClick={() => handlePartClick('abs', 'Abdominals')}>
                        <path d="M330.2,300 L330.2,480 M290,310 Q290,400 300,460 L330.2,480 L360,460 Q370,400 370,310 L330.2,300" />
                        <line x1="290" y1="360" x2="370" y2="360" stroke="#1f2937" strokeWidth="2" />
                        <line x1="295" y1="410" x2="365" y2="410" stroke="#1f2937" strokeWidth="2" />
                    </g>

                    {/* OBLIQUES */}
                    <g id="obliques" className="bodymap" onClick={() => handlePartClick('obliques', 'Obliques')}>
                        <path d="M280,300 Q250,350 260,450 Q280,480 300,460 Q290,400 290,310 Z" />
                        <path d="M380,300 Q410,350 400,450 Q380,480 360,460 Q370,400 370,310 Z" />
                    </g>

                    {/* HIPS (Pelvis) */}
                    <g id="hips" className="bodymap" onClick={() => handlePartClick('hips', 'Hips')}>
                        <path d="M260,450 Q280,550 330.2,580 Q380,550 400,450 L360,460 L330.2,480 L300,460 Z" />
                    </g>

                    {/* THIGHS (Quads) */}
                    <g id="quads" className="bodymap" onClick={() => handlePartClick('quads', 'Quadriceps')}>
                        <path d="M260,450 Q240,600 250,700 Q300,720 320,700 Q330,600 330.2,580 Q280,550 260,450" />
                        <path d="M400,450 Q420,600 410,700 Q360,720 340,700 Q330,600 330.2,580 Q380,550 400,450" />
                    </g>

                    {/* KNEES */}
                    <g id="knees" className="bodymap" onClick={() => handlePartClick('knees', 'Knees')}>
                        <path d="M250,700 Q260,750 270,760 Q300,770 310,760 Q315,750 320,700" />
                        <path d="M410,700 Q400,750 390,760 Q360,770 350,760 Q345,750 340,700" />
                    </g>

                    {/* SHINS/CALVES */}
                    <g id="calves" className="bodymap" onClick={() => handlePartClick('calves', 'Calves')}>
                        <path d="M270,760 Q250,850 260,950 Q290,960 300,950 Q310,850 310,760" />
                        <path d="M390,760 Q410,850 400,950 Q370,960 360,950 Q350,850 350,760" />
                    </g>

                    {/* FEET */}
                    <g id="feet" className="bodymap" onClick={() => handlePartClick('feet', 'Feet')}>
                        <path d="M260,950 Q240,1000 230,1020 L270,1030 Q290,1000 300,950" />
                        <path d="M400,950 Q420,1000 430,1020 L390,1030 Q370,1000 360,950" />
                    </g>

                </svg>

                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Anatomy Scanner</span>
                </div>
            </div>
        </div>
    );
};

export default BodyModel;
