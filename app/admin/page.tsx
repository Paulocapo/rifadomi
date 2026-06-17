'use client';

import React, { useState } from 'react';
import { useRaffle } from '@/hooks/useRaffle';
import PasswordGate from '@/components/PasswordGate';
import AdminGrid from '@/components/AdminGrid';
import LotteryAnimation from '@/components/LotteryAnimation';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [showLottery, setShowLottery] = useState(false);
  const { numbers, loading, error, actionLoading, libres, reservados, vendidos, confirm, release, refresh } =
    useRaffle();

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  const totalVendidos = vendidos.length;
  const totalReservados = reservados.length;
  const totalLibres = libres.length;

  return (
    <main className="min-h-screen bg-[#081326] text-white">
      {/* Lotería Modal */}
      {showLottery && (
        <LotteryAnimation
          vendidos={vendidos}
          onClose={() => setShowLottery(false)}
        />
      )}

      {/* Header Admin */}
      <header className="relative border-b border-white/5">
        <div className="absolute inset-0 bg-[#0c1a2e] opacity-80" />
        <div className="relative z-10 px-4 py-5 max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-[#ebd9a8] text-xs font-semibold uppercase tracking-widest">Panel Admin</span>
            <h1 className="text-white text-xl font-black">Rifa Día del Padre 🧔🏻‍♂️</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              id="btn-refresh"
              title="Actualizar datos"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}>
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </button>
            <a
              href="/"
              className="text-blue-300/60 hover:text-blue-200 text-xs transition-colors border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/5"
            >
              ← Vista pública
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard value={totalLibres} label="Libres" color="green" />
          <StatCard value={totalReservados} label="Reservados" color="yellow" />
          <StatCard value={totalVendidos} label="Vendidos" color="red" />
        </div>

        {/* Botón Sorteo */}
        <div className="text-center">
          <button
            onClick={() => setShowLottery(true)}
            disabled={totalVendidos === 0}
            id="btn-realizar-sorteo"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-lg shadow-xl shadow-yellow-900/30 hover:shadow-yellow-700/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🎰</span>
            REALIZAR SORTEO
            {totalVendidos > 0 && (
              <span className="bg-black/20 rounded-full px-2.5 py-0.5 text-sm font-bold">
                {totalVendidos} en juego
              </span>
            )}
          </button>
          {totalVendidos === 0 && (
            <p className="text-blue-300/40 text-xs mt-2">
              Necesitás al menos un número vendido para sortear
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
            <p className="text-red-300 text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-8 gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
            <p className="text-blue-300/60 text-sm">Cargando...</p>
          </div>
        )}

        {/* Grilla Admin */}
        {!loading && (
          <AdminGrid
            reservados={reservados}
            vendidos={vendidos}
            onConfirm={confirm}
            onRelease={release}
            actionLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
}

function StatCard({ value, label, color }: { value: number; label: string; color: 'green' | 'yellow' | 'red' }) {
  const styles = {
    green: 'bg-green-500/10 border-green-500/20 text-green-300',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    red: 'bg-red-500/10 border-red-500/20 text-red-300',
  };
  return (
    <div className={`rounded-2xl border p-4 text-center ${styles[color]}`}>
      <div className="text-3xl font-black">{value}</div>
      <div className="text-xs font-medium opacity-70 mt-0.5">{label}</div>
    </div>
  );
}
