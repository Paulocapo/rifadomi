'use client';

import React from 'react';

interface HeaderProps {
  libres: number;
  reservados: number;
  vendidos: number;
}

export default function Header({ libres, reservados, vendidos }: HeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Fondo con gradiente y patrón */}
      <div className="absolute inset-0 bg-[#0c1a2e] opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-[#0a1424] to-slate-900/80 opacity-90" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #ebd9a8 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #4b91cc 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 px-4 py-8 md:py-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-blue-200 text-xs font-semibold tracking-widest uppercase">
            Para el mejor Papá
          </span>
        </div>

        {/* Título principal */}
        <h1 className="text-5xl md:text-7xl font-black text-white mb-2 leading-tight tracking-tight">
          RIFA{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ebd9a8] to-[#d6c28f] text-4xl md:text-6xl mt-1 font-['Brush_Script_MT',cursive] italic">
            Día del Padre
          </span>
        </h1>

        <div className="text-blue-100 text-sm md:text-base mb-8 max-w-lg mx-auto flex flex-col gap-2">
          <p className="font-bold text-white text-xl tracking-wide uppercase mt-4">
            ¡Una picada, una tabla y 2 vinos!
          </p>
          <p className="text-lg">Valor del número: <span className="font-bold text-[#ebd9a8] text-2xl">$3000</span></p>
          <div className="bg-black/40 p-3 rounded-xl border border-[#ebd9a8]/20 mt-2 text-[#ebd9a8]">
            <p className="font-medium text-lg">📅 Se sortea DÍA 20/06</p>
            <p className="text-sm mt-1">🌙 POR LOTERÍA DE ENTRE RÍOS NOCTURNA</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
          <StatBadge value={libres} label="Disponibles" color="green" />
          <StatBadge value={reservados} label="Reservados" color="yellow" />
          <StatBadge value={vendidos} label="Vendidos" color="red" />
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
  color: 'green' | 'yellow' | 'red';
}) {
  const styles = {
    green: 'bg-green-500/20 border-green-400/30 text-green-300',
    yellow: 'bg-yellow-500/20 border-yellow-400/30 text-yellow-300',
    red: 'bg-red-500/20 border-red-400/30 text-red-300',
  };

  return (
    <div
      className={`flex flex-col items-center px-5 py-3 rounded-2xl border backdrop-blur-sm ${styles[color]}`}
    >
      <span className="text-2xl font-black">{value}</span>
      <span className="text-xs font-medium opacity-80 mt-0.5">{label}</span>
    </div>
  );
}
