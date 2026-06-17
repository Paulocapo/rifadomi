'use client';

import React from 'react';
import { WHATSAPP } from './Instructions';

interface SuccessModalProps {
  numero: number | null;
  nombre: string;
  onClose: () => void;
}

export default function SuccessModal({ numero, nombre, onClose }: SuccessModalProps) {
  if (numero === null) return null;

  const numStr = String(numero).padStart(2, '0');

  const whatsappMsg = encodeURIComponent(
    `Hola! Reservé el número ${numStr} a nombre de ${nombre}. Acá te paso el comprobante 🧾`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${whatsappMsg}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-gradient-to-b from-gray-900 to-gray-950 border border-green-500/20 rounded-3xl shadow-2xl shadow-green-900/30 overflow-hidden text-center animate-modal-in">
        {/* Confetti header */}
        <div className="bg-gradient-to-r from-green-800/40 to-emerald-800/40 px-6 pt-8 pb-6 border-b border-white/5">
          {/* Check animado */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 border-2 border-green-400/40 flex items-center justify-center">
            <span className="text-4xl animate-bounce-once">✓</span>
          </div>

          <h2 id="success-title" className="text-2xl font-black text-white mb-1">
            ¡Reserva exitosa!
          </h2>
          <p className="text-green-300 text-sm">Tu número fue reservado correctamente</p>
        </div>

        {/* Info */}
        <div className="px-6 py-5">
          {/* Número */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-2xl px-6 py-3">
              <p className="text-yellow-300/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Número</p>
              <p className="text-5xl font-black text-yellow-300">#{numStr}</p>
            </div>
          </div>

          <p className="text-blue-200 text-sm mb-1">
            Tu reserva fue registrada a nombre de:
          </p>
          <p className="text-white font-bold text-lg mb-5">{nombre}</p>

          <div className="bg-[#ebd9a8]/10 border border-[#ebd9a8]/20 rounded-2xl p-3 mb-5">
            <p className="text-[#ebd9a8] text-xs">
              Tu reserva expira en <span className="font-bold">12 horas</span>. Recordá transferir el monto y enviar el comprobante para confirmar tu participación.
            </p>
          </div>

          {/* Botón WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-whatsapp"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold shadow-lg shadow-blue-900/40 hover:shadow-blue-700/40 transition-all flex items-center justify-center gap-2"
          >
            <WhatsAppIcon />
            Enviar comprobante por WhatsApp
          </a>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all font-medium text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
