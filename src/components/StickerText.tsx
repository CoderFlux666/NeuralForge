
import React from 'react';

export const StickerText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <span className={`relative inline-block px-4 mx-2 ${className}`}>
            {/* Background Scribble */}
            <svg
                className="absolute inset-0 w-full h-full -z-10 text-[#a886ff] transform scale-125 rotate-2"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="currentColor"
            >
                <path d="M5.5,50 C5.5,50 15.5,20.5 45.5,25.5 C75.5,30.5 95.5,10.5 95.5,50.5 C95.5,90.5 75.5,80.5 45.5,85.5 C15.5,90.5 5.5,50 5.5,50 Z"
                    vectorEffect="non-scaling-stroke"
                    stroke="currentColor"
                    strokeWidth="15"
                    strokeLinejoin="round"
                />
                <path d="M5.5,50 C5.5,50 15.5,20.5 45.5,25.5 C75.5,30.5 95.5,10.5 95.5,50.5 C95.5,90.5 75.5,80.5 45.5,85.5 C15.5,90.5 5.5,50 5.5,50 Z"
                    fill="currentColor"
                />
            </svg>
            {/* Text Content */}
            <span className="relative z-10 font-[Permanent Marker] font-normal text-[#d4ff4e] select-none"
                style={{
                    textShadow: "3px 3px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    WebkitTextStroke: "1px black",
                    fontFamily: '"Permanent Marker", cursive'
                }}
            >
                {children}
            </span>
        </span>
    );
};
