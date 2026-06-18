'use client';

import React, { useState } from 'react';
import { RaffleNumber } from '@/types';

interface AdminGridProps {
  reservados: RaffleNumber[];
  vendidos: RaffleNumber[];
  onConfirm: (numero: number) => Promise<unknown>;
  onRelease: (numero: number) => Promise<unknown>;
  actionLoading: boolean;
}

export default function AdminGrid({
  reservados,
  vendidos,
  onConfirm,
  onRelease,
  actionLoading,
}: AdminGridProps) {
  const [processingNum, setProcessingNum] = useState<number | null>(null);

  const handleAction = async (numero: number, action: 'confirmar' | 'liberar') => {
    setProcessingNum(numero);
    try {
      if (action === 'confirmar') await onConfirm(numero);
      else await onRelease(numero);
    } finally {
      setProcessingNum(null);
    }
  };

  const isEmpty = reservados.length === 0 && vendidos.length === 0;

  return (
    <div className="space-y-8">
      {isEmpty && (
        <div className="text-center py-12 text-purple-300/40 text-sm">
          No hay números reservados ni vendidos aún.
        </div>
      )}

      {/* Reservados */}
      {reservados.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-yellow-300 font-bold text-sm uppercase tracking-widest mb-3">
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            Reservados ({reservados.length})
          </h3>
          <div className="space-y-2">
            {reservados.map((n) => (
              <AdminCard
                key={n.numero}
                number={n}
                processing={processingNum === n.numero}
                actionLoading={actionLoading}
                onConfirm={() => handleAction(n.numero, 'confirmar')}
                onRelease={() => handleAction(n.numero, 'liberar')}
                showConfirm
              />
            ))}
          </div>
        </section>
      )}

      {/* Vendidos */}
      {vendidos.length > 0 && (
        <section>
          <h3 className="flex items-center gap-2 text-red-300 font-bold text-sm uppercase tracking-widest mb-3">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            Vendidos ({vendidos.length})
          </h3>
          <div className="space-y-2">
            {vendidos.map((n) => (
              <AdminCard
                key={n.numero}
                number={n}
                processing={processingNum === n.numero}
                actionLoading={actionLoading}
                onConfirm={() => handleAction(n.numero, 'confirmar')}
                onRelease={() => handleAction(n.numero, 'liberar')}
                showConfirm={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

interface AdminCardProps {
  number: RaffleNumber;
  processing: boolean;
  actionLoading: boolean;
  onConfirm: () => void;
  onRelease: () => void;
  showConfirm: boolean;
}

function AdminCard({ number, processing, actionLoading, onConfirm, onRelease, showConfirm }: AdminCardProps) {
  const isDisabled = actionLoading;
  const numStr = String(number.numero).padStart(2, '0');

  return (
    <div className={`flex items-center gap-3 bg-white/3 border rounded-2xl px-4 py-3 transition-all ${showConfirm ? 'border-yellow-500/10' : 'border-red-500/10'
      }`}>
      {/* Número */}
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${showConfirm
          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/20'
          : 'bg-red-500/20 text-red-300 border border-red-500/20'
        }`}>
        {numStr}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{number.nombre}</p>
        <p className="text-purple-300/60 text-xs">{number.telefono}</p>
        {number.timestamp && (
          <p className="text-purple-300/40 text-[10px] mt-0.5">{number.timestamp}</p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-2 flex-shrink-0">
        {showConfirm && (
          <button
            onClick={onConfirm}
            disabled={isDisabled}
            id={`btn-confirmar-${number.numero}`}
            title="Confirmar pago → Vendido"
            className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/20 text-green-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold"
          >
            {processing ? <MiniSpinner /> : '✓ Pago'}
          </button>
        )}
        <button
          onClick={onRelease}
          disabled={isDisabled}
          id={`btn-liberar-${number.numero}`}
          title="Liberar número"
          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 text-red-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold"
        >
          {processing ? <MiniSpinner /> : '✕ Liberar'}
        </button>
      </div>
    </div>
  );
}

function MiniSpinner() {
  return (
    <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
