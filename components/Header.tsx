'use client';

import React from 'react';

interface HeaderProps {
  libres: number;
  reservados: number;
  vendidos: number;
}

export default function Header({ libres, reservados, vendidos }: HeaderProps) {
  return (
    <header className="relative overflow-hidden bg-black py-8 md:py-12">
      {/* Textura sutil y gradiente */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ebd9a8]/10 via-black to-black opacity-60" />

      <div className="relative z-10 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge superior */}
        <div className="inline-flex items-center justify-center w-full max-w-[280px] bg-black border-2 border-[#ebd9a8] rounded-full px-4 py-3 mb-8 shadow-[0_0_15px_rgba(235,217,168,0.2)]">
          <span className="text-white text-xs font-bold leading-tight uppercase tracking-wider text-center">
            Se sortea <br /> una vez vendidos <br /> todos los números
          </span>
        </div>

        {/* Título principal */}
        <div className="relative mb-8 transform -rotate-3 scale-110 md:scale-125">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter" style={{ fontFamily: "'Brush Script MT', cursive, Impact" }}>
            SUPER
          </h1>
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ebd9a8] to-[#b39556] leading-none mt-[-10px] tracking-tight" style={{ fontFamily: "'Brush Script MT', cursive, Impact" }}>
            POLLA
          </h1>
        </div>

        <div className="text-white w-full flex flex-col items-center gap-6 mt-4">
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl md:text-2xl tracking-widest uppercase text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Por lotería Entre Ríos
            </p>
            <div className="bg-[#ebd9a8] text-black px-6 py-1.5 rounded-full font-black text-lg md:text-xl tracking-widest uppercase shadow-lg">
              🌙 Nocturna
            </div>
          </div>
          
          {/* Valor del número */}
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-sm md:text-base font-bold uppercase tracking-widest text-white mb-1">Cada número</p>
            <div className="relative">
              <span className="text-[#ebd9a8] text-6xl md:text-7xl font-black tracking-tighter drop-shadow-lg">$3000</span>
            </div>
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-white mt-1 border-t border-b border-[#ebd9a8]/30 py-1 px-4">
              Pesos
            </p>
          </div>

          {/* Premio principal */}
          <div className="bg-white text-black p-5 mt-6 w-full max-w-sm rounded-sm shadow-2xl transform rotate-2 border-4 border-white/90 relative">
            <p className="font-black uppercase tracking-widest text-sm mb-2 text-right">Se sortea</p>
            <p className="font-black text-3xl md:text-4xl uppercase leading-tight text-center" style={{ fontFamily: 'Impact, sans-serif' }}>
              Juego de <br/> cortinas
            </p>
            <p className="font-bold text-gray-800 text-center tracking-widest mt-2 border-t-2 border-black/10 pt-2">COLOR BEIGE</p>
          </div>

          {/* A beneficio */}
          <div className="mt-10 flex flex-col items-center text-[#ebd9a8]">
            <p className="font-bold text-sm tracking-[0.2em] uppercase mb-1">A beneficio de</p>
            <p className="font-black text-3xl md:text-4xl tracking-widest uppercase flex items-center gap-3">
              Mi perrita Lola 🐾
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-3 md:gap-6 flex-wrap mt-10 w-full">
          <StatBadge value={libres} label="Disponibles" color="beige" />
          <StatBadge value={reservados} label="Reservados" color="beige" />
          <StatBadge value={vendidos} label="Vendidos" color="beige" />
        </div>
      </div>
    </header>
  );
}

function StatBadge({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: 'beige' | 'yellow' | 'red';
}) {
  return (
    <div
      className="flex flex-col items-center px-6 py-4 rounded-xl border border-[#ebd9a8]/30 bg-[#ebd9a8]/5 text-[#ebd9a8] backdrop-blur-sm min-w-[120px]"
    >
      <span className="text-3xl font-black">{value}</span>
      <span className="text-xs font-bold uppercase tracking-wider opacity-80 mt-1">{label}</span>
    </div>
  );
}
