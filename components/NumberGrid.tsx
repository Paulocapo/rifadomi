'use client';

import React from 'react';
import { RaffleNumber } from '@/types';
import NumberCell from './NumberCell';

interface NumberGridProps {
  numbers: RaffleNumber[];
  onSelectNumber: (n: RaffleNumber) => void;
}

export default function NumberGrid({ numbers, onSelectNumber }: NumberGridProps) {
  return (
    <section className="px-4 pb-8 max-w-2xl mx-auto w-full">
      {/* Leyenda */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        <LegendItem color="bg-green-500/30 border-green-500/40" label="Libre" />
        <LegendItem color="bg-yellow-500/30 border-yellow-500/40" label="Reservado" />
        <LegendItem color="bg-red-500/30 border-red-500/40" label="Vendido" />
      </div>

      {/* Grilla 10x10 */}
      <div
        className="grid gap-1.5 md:gap-2"
        style={{ gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' }}
        role="grid"
        aria-label="Grilla de números de la rifa"
      >
        {numbers.map((n) => (
          <NumberCell key={n.numero} number={n} onClick={onSelectNumber} />
        ))}
      </div>

      {/* Hint */}
      <p className="text-center text-blue-300/50 text-xs mt-4">
        Tocá un número verde para reservarlo
      </p>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-md border ${color}`} />
      <span className="text-blue-200 text-xs font-medium">{label}</span>
    </div>
  );
}
