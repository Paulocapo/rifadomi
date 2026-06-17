'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PasswordGateProps {
  onSuccess: () => void;
}

// Contraseña hardcodeada — cambiar antes de producción
const ADMIN_PASSWORD = 'rifa2025';

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setShaking(true);
      setPassword('');
      setTimeout(() => setShaking(false), 600);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <div className="min-h-screen bg-[#081326] flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm bg-gray-900/80 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm transition-all ${
          shaking ? 'animate-shake' : ''
        }`}
      >
        {/* Icono */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-blue-300">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>

        <h1 className="text-white text-2xl font-black text-center mb-1">Acceso Restringido</h1>
        <p className="text-blue-300/60 text-sm text-center mb-6">Ingresá la contraseña para continuar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={inputRef}
              id="input-admin-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Contraseña"
              autoComplete="current-password"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all text-center text-lg tracking-widest ${
                error
                  ? 'border-red-500/60 focus:ring-red-500/30'
                  : 'border-white/10 focus:border-blue-400/50 focus:ring-blue-500/20'
              }`}
            />
            {error && (
              <p className="text-red-400 text-xs text-center mt-2">
                ❌ Contraseña incorrecta
              </p>
            )}
          </div>

          <button
            type="submit"
            id="btn-admin-login"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold shadow-lg shadow-blue-900/40 hover:shadow-blue-700/40 transition-all"
          >
            Ingresar al Panel
          </button>
        </form>

        <p className="text-center mt-4">
          <a href="/" className="text-blue-400/60 hover:text-blue-300 text-xs transition-colors">
            ← Volver a la vista pública
          </a>
        </p>
      </div>
    </div>
  );
}
