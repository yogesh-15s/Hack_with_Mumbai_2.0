import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Logo = ({ className = "w-10 h-10" }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Adaptive colors based on theme
    const accentColor = "#2dd4bf"; // Teal - stays same for brand consistency
    const primaryStroke = isDark ? "rgba(255,255,255,0.8)" : "rgba(15,23,42,0.8)"; // Slate 900 in light mode
    const structureFill = isDark ? "rgba(255,255,255,0.05)" : "rgba(37,99,235,0.05)"; // Blue 600 tint in light mode
    const detailStroke = isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.15)";

    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl transition-all duration-700 hover:rotate-[10deg] hover:scale-110">
                {/* Main Hexagonal Container */}
                <path
                    d="M256 40L446.5 150V362L256 472L65.5 362V150L256 40Z"
                    fill="url(#logoGradient)"
                    stroke={primaryStroke}
                    strokeWidth="2"
                    strokeOpacity={isDark ? "0.1" : "0.2"}
                />

                {/* Secondary Inset Hexagon */}
                <path
                    d="M256 80L411.9 170V342L256 432L100.1 342V170L256 80Z"
                    fill={structureFill}
                    stroke={detailStroke}
                    strokeWidth="2"
                />

                {/* Central Shield/V Shape */}
                <path
                    d="M256 160L340 210V300L256 350L172 300V210L256 160Z"
                    fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.05)"}
                    stroke={primaryStroke}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* The "V" highlight */}
                <path
                    d="M210 230L256 280L302 230"
                    stroke={isDark ? "white" : "#1e40af"}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Medical Cross Detail */}
                <path
                    d="M256 120V150M241 135H271"
                    stroke={accentColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                />

                {/* Digital Pulse Nodes */}
                <g>
                    <circle cx="256" cy="40" r="6" fill={accentColor}>
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="446.5" cy="150" r="4" fill={accentColor} opacity="0.6" />
                    <circle cx="446.5" cy="362" r="4" fill={accentColor} opacity="0.6" />
                    <circle cx="256" cy="472" r="6" fill={accentColor}>
                        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="65.5" cy="362" r="4" fill={accentColor} opacity="0.6" />
                    <circle cx="65.5" cy="150" r="4" fill={accentColor} opacity="0.6" />
                </g>

                {/* Inner Glow Lines */}
                <path d="M100 170L256 170" stroke={primaryStroke} strokeWidth="1" strokeOpacity="0.1" />
                <path d="M412 170L256 170" stroke={primaryStroke} strokeWidth="1" strokeOpacity="0.1" />
                <path d="M256 80L256 432" stroke={primaryStroke} strokeWidth="1" strokeOpacity="0.1" />

                <defs>
                    <linearGradient id="logoGradient" x1="65.5" y1="40" x2="446.5" y2="472" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#0ea5e9" />    {/* Sky 500 */}
                        <stop offset="50%" stopColor="#2563eb" />   {/* Blue 600 */}
                        <stop offset="100%" stopColor="#1e40af" />  {/* Blue 800 */}
                    </linearGradient>

                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="15" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Logo;
