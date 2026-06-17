'use client';

import React from 'react';
import { RaffleNumber, Status } from '@/types';

interface NumberCellProps {
  number: RaffleNumber;
  onClick: (n: RaffleNumber) => void;
}

const statusConfig: Record<Status, { bg: string; text: string; border: string; glow: string; label: string; disabled: boolean }> = {
  Libre: {
    bg: 'bg-green-500/20 hover:bg-green-400/30 active:bg-green-500/40',
    text: 'text-green-300',
    border: 'border-green-500/30 hover:border-green-400/60',
    glow: 'hover:shadow-green-500/20 hover:shadow-lg',
    label: 'Libre',
    disabled: false,
  },
  Reservado: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-300',
    border: 'border-yellow-500/30',
    glow: '',
    label: 'Reservado',
    disabled: true,
  },
  Vendido: {
    bg: 'bg-red-500/20',
    text: 'text-red-300',
    border: 'border-red-500/30',
    glow: '',
    label: 'Vendido',
    disabled: true,
  },
};

export default function NumberCell({ number, onClick }: NumberCellProps) {
  const config = statusConfig[number.estado];

  const handleClick = () => {
    if (!config.disabled) onClick(number);
  };

  return (
    <button
      onClick={handleClick}
      disabled={config.disabled}
      title={config.disabled ? `${config.label}: ${number.nombre || ''}` : `Número ${number.numero} - Disponible`}
      aria-label={`Número ${String(number.numero).padStart(2, '0')} - ${config.label}`}
      className={`
        relative aspect-square rounded-xl border transition-all duration-200 flex flex-col items-center justify-center
        ${config.bg} ${config.text} ${config.border} ${config.glow}
        ${config.disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:scale-105 active:scale-95'}
        group
      `}
    >
      {/* Número */}
      <span className="font-black text-lg md:text-xl leading-none">
        {String(number.numero).padStart(2, '0')}
      </span>

      {/* Icono de estado */}
      <span className="text-[10px] mt-0.5 opacity-70 font-medium">
        {number.estado === 'Libre' && '●'}
        {number.estado === 'Reservado' && '⏳'}
        {number.estado === 'Vendido' && '✓'}
      </span>

      {/* Tooltip nombre en hover para ocupados */}
      {config.disabled && number.nombre && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block z-20 pointer-events-none">
          <div className="bg-gray-900 border border-white/10 rounded-lg px-2 py-1 text-white text-[10px] whitespace-nowrap shadow-xl">
            {number.nombre}
          </div>
        </div>
      )}
    </button>
  );
}
