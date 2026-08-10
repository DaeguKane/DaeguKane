import React from 'react';

export const BaseballBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. STADIUM LIGHT BEAMS & FLOODLIGHT TOWERS */}
      <div className="absolute top-0 left-10 w-[500px] h-[700px] bg-gradient-to-b from-blue-400/25 via-cyan-400/10 to-transparent blur-2xl transform -rotate-12 animate-lightBeam" />
      <div className="absolute top-0 right-10 w-[500px] h-[700px] bg-gradient-to-b from-blue-400/25 via-cyan-400/10 to-transparent blur-2xl transform rotate-12 animate-lightBeam" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[140px]" />

      {/* 2. BASEBALL FIELD DIAMOND (야구장 루상 & 내야) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[900px] opacity-35">
        <svg viewBox="0 0 1000 1000" className="w-full h-full text-cyan-300">
          {/* Outfield Wall Arc */}
          <path
            d="M 100 450 A 500 500 0 0 1 900 450"
            fill="none"
            stroke="#0066FF"
            strokeWidth="6"
            strokeDasharray="16 8"
            opacity="0.8"
          />
          {/* Foul Lines */}
          <line x1="500" y1="850" x2="100" y2="450" stroke="#00E5FF" strokeWidth="4" />
          <line x1="500" y1="850" x2="900" y2="450" stroke="#00E5FF" strokeWidth="4" />

          {/* Infield Diamond */}
          <polygon
            points="500,850 750,600 500,350 250,600"
            fill="none"
            stroke="#FFC700"
            strokeWidth="5"
            opacity="0.85"
          />

          {/* Bases (루상) */}
          {/* Home Plate */}
          <polygon points="500,860 480,840 480,820 520,820 520,840" fill="#FFFFFF" stroke="#00E5FF" strokeWidth="2" />
          {/* 1st Base */}
          <polygon points="750,600 770,600 760,580 740,580" fill="#FFC700" className="animate-pulse" />
          {/* 2nd Base */}
          <polygon points="500,350 515,335 500,320 485,335" fill="#FFC700" className="animate-pulse" />
          {/* 3rd Base */}
          <polygon points="250,600 260,580 240,580 230,600" fill="#FFC700" className="animate-pulse" />

          {/* Pitcher's Mound Circle & Rubber */}
          <circle cx="500" cy="600" r="45" fill="none" stroke="#FFC700" strokeWidth="3" opacity="0.6" />
          <rect x="480" y="595" width="40" height="10" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 3. BATTER IN ACTION (타격하는 모습 - Left Side Background) */}
      <div className="absolute top-24 left-2 sm:left-12 w-80 sm:w-96 h-[500px] opacity-40 text-cyan-200">
        <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
          {/* Bat Swing Arc Lines */}
          <path d="M 50 180 C 150 80, 280 100, 360 220" fill="none" stroke="#FFC700" strokeWidth="5" strokeDasharray="10 5" />
          <path d="M 80 220 C 180 120, 290 140, 370 250" fill="none" stroke="#00E5FF" strokeWidth="3" />

          {/* Batter Silhouette */}
          {/* Helmet */}
          <ellipse cx="200" cy="120" rx="25" ry="20" fill="#0066FF" stroke="#00E5FF" strokeWidth="2" />
          <path d="M 215 120 L 240 128 L 220 135 Z" fill="#00E5FF" />
          {/* Body */}
          <path d="M 185 140 L 220 145 L 235 240 L 170 270 L 160 170 Z" fill="#0052A5" stroke="#00E5FF" strokeWidth="2" />
          {/* Arms holding bat */}
          <path d="M 205 155 L 290 140 L 370 70 L 380 82 L 295 160 Z" fill="#FFC700" />
          {/* Legs */}
          <path d="M 175 260 L 220 380 L 190 390 L 155 280 Z" fill="#003B7A" />
          <path d="M 225 245 L 270 360 L 240 370 L 205 260 Z" fill="#003B7A" />
          {/* Label Tag */}
          <text x="120" y="440" fill="#00E5FF" fontSize="18" fontWeight="bold" letterSpacing="2">POWER BATTER</text>
        </svg>
      </div>

      {/* 4. PITCHER IN ACTION (투구하는 모습 - Right Side Background) */}
      <div className="absolute top-20 right-2 sm:right-12 w-80 sm:w-96 h-[500px] opacity-40 text-blue-200">
        <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,102,255,0.4)]">
          {/* Fastball Pitch Trajectory Line */}
          <path d="M 100 220 L 350 180" fill="none" stroke="#FFC700" strokeWidth="4" strokeDasharray="8 4" />
          
          {/* Pitcher Silhouette */}
          {/* Cap */}
          <ellipse cx="120" cy="110" rx="22" ry="18" fill="#0052A5" stroke="#00E5FF" strokeWidth="2" />
          <path d="M 100 110 L 80 112 L 95 120 Z" fill="#00E5FF" />
          {/* Torso & High Leg Kick */}
          <path d="M 110 130 L 140 135 L 130 230 L 90 220 Z" fill="#003B7A" stroke="#00E5FF" strokeWidth="2" />
          {/* Throwing Arm Extended */}
          <path d="M 125 140 L 60 170 L 40 210 L 25 195 L 50 155 Z" fill="#0066FF" />
          {/* Leg Kick */}
          <path d="M 120 220 L 170 170 L 185 185 L 130 245 Z" fill="#002D5E" />
          <path d="M 100 220 L 80 340 L 110 345 L 120 230 Z" fill="#002D5E" />
          {/* Label Tag */}
          <text x="80" y="400" fill="#FFC700" fontSize="18" fontWeight="bold" letterSpacing="2">ACE PITCHER</text>
        </svg>
      </div>

      {/* 5. SLIDING RUNNER & BASE DUST (슬라이딩 모습 - Bottom Left) */}
      <div className="absolute bottom-16 left-4 sm:left-24 w-80 h-64 opacity-35">
        <svg viewBox="0 0 400 250" className="w-full h-full">
          {/* Sliding Dust Cloud */}
          <path d="M 80 180 C 120 140, 220 150, 260 190 C 200 210, 100 200, 80 180 Z" fill="#FFC700" opacity="0.3" />
          {/* Runner Body Sliding Headfirst */}
          <path d="M 50 180 L 180 160 L 280 150 L 300 165 L 190 180 L 60 200 Z" fill="#0066FF" stroke="#00E5FF" strokeWidth="2" />
          {/* Reaching Hand to Base */}
          <line x1="280" y1="150" x2="340" y2="150" stroke="#FFC700" strokeWidth="6" strokeLinecap="round" />
          <rect x="335" y="140" width="30" height="20" fill="#FFFFFF" stroke="#00E5FF" strokeWidth="2" />
          {/* Safe Gesture Lines */}
          <path d="M 280 90 L 360 90 M 280 90 L 250 50 M 360 90 L 390 50" stroke="#00E5FF" strokeWidth="4" fill="none" />
          <text x="270" y="40" fill="#00E5FF" fontSize="16" fontWeight="extrabold">SAFE!</text>
        </svg>
      </div>

      {/* 6. GOLDEN GLOVE TROPHY (골든글러브 - Bottom Right) */}
      <div className="absolute bottom-12 right-4 sm:right-24 w-72 h-72 opacity-40">
        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,199,0,0.5)]">
          {/* Gold Glow Background */}
          <circle cx="150" cy="150" r="100" fill="#FFC700" opacity="0.1" />
          {/* Golden Glove Outline */}
          <path
            d="M 90 220 C 60 160, 70 100, 110 80 C 130 70, 140 100, 150 110 C 160 90, 180 80, 200 95 C 220 110, 210 140, 210 160 C 220 170, 230 200, 190 230 Z"
            fill="#FFC700"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          {/* Glove Pocket & Webbing */}
          <path d="M 120 110 C 150 130, 170 130, 190 120" fill="none" stroke="#0052A5" strokeWidth="3" strokeDasharray="4 2" />
          {/* Baseball inside Glove */}
          <circle cx="155" cy="140" r="28" fill="#FFFFFF" stroke="#FF0000" strokeWidth="2" />
          <path d="M 135 130 C 145 140, 145 150, 135 160" fill="none" stroke="#FF0000" strokeWidth="2" />
          <path d="M 175 130 C 165 140, 165 150, 175 160" fill="none" stroke="#FF0000" strokeWidth="2" />
          {/* Trophy Stand */}
          <rect x="100" y="230" width="100" height="25" rx="5" fill="#003B7A" stroke="#FFC700" strokeWidth="2" />
          <text x="112" y="247" fill="#FFC700" fontSize="11" fontWeight="black" letterSpacing="1">GOLDEN GLOVE</text>
        </svg>
      </div>

      {/* 7. ANIMATED FLOATING BASEBALLS WITH RED SEAMS */}
      <div className="absolute top-1/4 left-1/3 animate-floatBall opacity-50">
        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
          <circle cx="50" cy="50" r="42" fill="#FFFFFF" stroke="#00E5FF" strokeWidth="2" />
          <path d="M 22 25 C 40 40, 40 60, 22 75" fill="none" stroke="#FF2D55" strokeWidth="3" strokeDasharray="4 3" />
          <path d="M 78 25 C 60 40, 60 60, 78 75" fill="none" stroke="#FF2D55" strokeWidth="3" strokeDasharray="4 3" />
        </svg>
      </div>

      <div className="absolute top-1/2 right-1/4 animate-floatBall opacity-40" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]">
          <circle cx="50" cy="50" r="42" fill="#FFFFFF" stroke="#FFC700" strokeWidth="2" />
          <path d="M 22 25 C 40 40, 40 60, 22 75" fill="none" stroke="#FF2D55" strokeWidth="3" strokeDasharray="4 3" />
          <path d="M 78 25 C 60 40, 60 60, 78 75" fill="none" stroke="#FF2D55" strokeWidth="3" strokeDasharray="4 3" />
        </svg>
      </div>

      {/* 8. FASTBALL SPEED MOTION ANIMATION TRAIL */}
      <div className="absolute top-2/3 left-1/4 animate-pitchFastball pointer-events-none">
        <svg viewBox="0 0 120 60" className="w-28 h-14">
          <line x1="0" y1="30" x2="80" y2="30" stroke="#00E5FF" strokeWidth="4" strokeDasharray="10 5" />
          <circle cx="95" cy="30" r="18" fill="#FFFFFF" stroke="#FF2D55" strokeWidth="2" />
          <path d="M 83 20 C 90 26, 90 34, 83 40" fill="none" stroke="#FF2D55" strokeWidth="2" />
          <path d="M 107 20 C 100 26, 100 34, 107 40" fill="none" stroke="#FF2D55" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};
