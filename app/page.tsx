'use client';

import React, { useState } from 'react';
import { RaffleNumber } from '@/types';
import { useRaffle } from '@/hooks/useRaffle';
import Header from '@/components/Header';
import Instructions from '@/components/Instructions';
import NumberGrid from '@/components/NumberGrid';
import ReservationModal from '@/components/ReservationModal';
import SuccessModal from '@/components/SuccessModal';

export default function Home() {
  const { numbers, loading, error, actionLoading, libres, reservados, vendidos, reserve, refresh } =
    useRaffle();

  const [selectedNumber, setSelectedNumber] = useState<RaffleNumber | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ numero: number; nombre: string } | null>(null);

  const handleSelectNumber = (n: RaffleNumber) => {
    setSelectedNumber(n);
  };

  const handleConfirmReserva = async (nombre: string, telefono: string) => {
    if (!selectedNumber) return;
    await reserve(selectedNumber.numero, nombre, telefono);
    const numero = selectedNumber.numero;
    setSelectedNumber(null);
    setSuccessInfo({ numero, nombre });
  };

  const handleCloseSuccess = () => {
    setSuccessInfo(null);
  };

  return (
    <main className="min-h-screen bg-[#081326] text-white">
      {/* Header con stats en vivo */}
      <Header
        libres={libres.length}
        reservados={reservados.length}
        vendidos={vendidos.length}
      />

      {/* Instrucciones */}
      <Instructions />

      {/* Estado de carga / error */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-blue-400/30 border-t-blue-400 animate-spin" />
          <p className="text-blue-300/60 text-sm">Cargando números...</p>
        </div>
      )}

      {error && !loading && (
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-center">
            <p className="text-red-300 font-medium mb-3">⚠️ No se pudo conectar al servidor</p>
            <p className="text-red-300/60 text-sm mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 text-sm font-medium transition-all"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Grilla de números */}
      {!loading && !error && numbers.length > 0 && (
        <NumberGrid numbers={numbers} onSelectNumber={handleSelectNumber} />
      )}

      {/* Footer */}
      <footer className="text-center py-6 border-t border-white/5 px-4">
        <p className="text-blue-300/40 text-xs">
          Rifa Día del Padre &nbsp;|&nbsp;
          <a href="/admin" className="hover:text-blue-300 transition-colors underline decoration-dotted">
            Admin
          </a>
        </p>
      </footer>

      {/* Modales */}
      <ReservationModal
        number={selectedNumber}
        onClose={() => setSelectedNumber(null)}
        onConfirm={handleConfirmReserva}
        loading={actionLoading}
      />

      <SuccessModal
        numero={successInfo?.numero ?? null}
        nombre={successInfo?.nombre ?? ''}
        onClose={handleCloseSuccess}
      />
    </main>
  );
}
