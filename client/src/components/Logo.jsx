import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl transition-transform hover:scale-105 duration-500">
                {/* Shield with complex gradient */}
                <path d="M256 40C256 40 100 80 100 220C100 360 256 460 256 460C256 460 412 360 412 220C412 80 256 40 256 40Z"
                    fill="url(#shieldMain)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2" />

                {/* Background "M" Logo */}
                <path d="M150 180L210 180L256 240L302 180L362 180L362 300L332 300L332 210L256 310L180 210L180 300L150 300Z"
                    fill="white"
                    opacity="0.1" />

                {/* Medical Human Figure (Line Art) */}
                <g stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Head - Faceted Look */}
                    <path d="M256 120 C270 120, 285 130, 285 155 C285 180, 270 190, 256 190 C242 190, 227 180, 227 155 C227 130, 242 120, 256 120 Z" fill="none" />

                    {/* Torso & Core */}
                    <path d="M256 190 L256 320" />
                    <path d="M220 205 Q256 195, 292 205" />

                    {/* Arms - Detailed Segments */}
                    <path d="M220 205 L180 260 L160 310" />
                    <path d="M292 205 L332 260 L352 310" />

                    {/* Legs - Detailed Segments */}
                    <path d="M256 320 L220 420" />
                    <path d="M256 320 L292 420" />

                    {/* Internal Structure Lines */}
                    <path d="M240 220 L272 220" opacity="0.3" />
                    <path d="M245 250 L267 250" opacity="0.3" />
                    <path d="M230 350 L250 350" opacity="0.3" />
                    <path d="M262 350 L282 350" opacity="0.3" />
                </g>

                {/* Document Icons around the body */}
                <g fill="white" opacity="0.8">
                    <rect x="135" y="160" width="30" height="40" rx="3" />
                    <rect x="347" y="160" width="30" height="40" rx="3" />
                    <rect x="236" y="240" width="40" height="50" rx="4" />
                    <rect x="360" y="280" width="30" height="40" rx="3" />
                </g>
                <g stroke="#0891b2" strokeWidth="2">
                    <path d="M142 175 H158 M142 185 H158" />
                    <path d="M354 175 H370 M354 185 H370" />
                    <path d="M245 260 H267 M245 275 H267" />
                </g>

                {/* Biometric Glowing Nodes */}
                <circle cx="215" cy="240" r="4" fill="#22d3ee" className="animate-pulse">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="297" cy="240" r="4" fill="#22d3ee">
                    <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="256" cy="380" r="4" fill="#22d3ee">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>

                <defs>
                    <linearGradient id="shieldMain" x1="256" y1="40" x2="256" y2="460" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#99f6e4" />
                        <stop offset="40%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#0d9488" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Logo;
