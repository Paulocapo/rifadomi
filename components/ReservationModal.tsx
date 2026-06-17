'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RaffleNumber } from '@/types';

interface ReservationModalProps {
  number: RaffleNumber | null;
  onClose: () => void;
  onConfirm: (nombre: string, telefono: string) => Promise<void>;
  loading: boolean;
}

export default function ReservationModal({
  number,
  onClose,
  onConfirm,
  loading,
}: ReservationModalProps) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errors, setErrors] = useState<{ nombre?: string; telefono?: string }>({});
  const nombreRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (number) {
      setNombre('');
      setTelefono('');
      setErrors({});
      setTimeout(() => nombreRef.current?.focus(), 100);
    }
  }, [number]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [loading, onClose]);

  if (!number) return null;

  const validate = () => {
    const newErrors: { nombre?: string; telefono?: string } = {};
    if (!nombre.trim() || nombre.trim().length < 3)
      newErrors.nombre = 'Ingresá tu nombre completo (mín. 3 caracteres)';
    if (!telefono.trim() || !/^\d{7,15}$/.test(telefono.replace(/[\s\-()]/g, '')))
      newErrors.telefono = 'Ingresá un teléfono válido (solo números)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onConfirm(nombre.trim(), telefono.trim());
  };

  const numStr = String(number.numero).padStart(2, '0');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-[#081326] border border-blue-500/20 rounded-3xl shadow-2xl shadow-blue-900/50 overflow-hidden animate-modal-in">
        {/* Header decorativo */}
        <div className="bg-gradient-to-r from-[#102440] to-[#0c1a2e] px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">
                Reservar Número
              </p>
              <h3 className="text-3xl font-black text-white">
                #{String(number.numero).padStart(2, '0')}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ebd9a8] to-[#d6c28f]">
                $3000
              </span>
            </div>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              aria-label="Cerrar modal"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all disabled:opacity-50"
            >
              ✕
            </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4" noValidate>
          {/* Nombre */}
          <div>
            <label htmlFor="input-nombre" className="block text-blue-200 text-sm font-medium mb-1.5">
              Nombre y Apellido <span className="text-red-400">*</span>
            </label>
            <input
              ref={nombreRef}
              id="input-nombre"
              type="text"
              value={nombre}
              onChange={(e) => { setNombre(e.target.value); setErrors((p) => ({ ...p, nombre: undefined })); }}
              placeholder="Ej: Juan Pérez"
              disabled={loading}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                errors.nombre
                  ? 'border-red-500/60 focus:ring-red-500/30'
                  : 'border-white/10 focus:border-blue-400/50 focus:ring-blue-500/20'
              }`}
            />
            {errors.nombre && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.nombre}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="input-telefono" className="block text-blue-200 text-sm font-medium mb-1.5">
              Teléfono (WhatsApp) <span className="text-red-400">*</span>
            </label>
            <input
              id="input-telefono"
              type="tel"
              value={telefono}
              onChange={(e) => { setTelefono(e.target.value); setErrors((p) => ({ ...p, telefono: undefined })); }}
              placeholder="Ej: 3816123456"
              disabled={loading}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                errors.telefono
                  ? 'border-red-500/60 focus:ring-red-500/30'
                  : 'border-white/10 focus:border-blue-400/50 focus:ring-blue-500/20'
              }`}
            />
            {errors.telefono && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.telefono}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-blue-200 font-medium transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold shadow-lg shadow-blue-900/50 hover:shadow-blue-700/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner />
                  Reservando...
                </>
              ) : (
                '✓ Confirmar Reserva'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}
