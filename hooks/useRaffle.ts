'use client';

import { useState, useEffect, useCallback } from 'react';
import { RaffleNumber } from '@/types';
import { fetchNumbers, reserveNumber, confirmPayment, releaseNumber } from '@/lib/api';

const POLL_INTERVAL = 30_000; // 30 segundos

export function useRaffle() {
  const [numbers, setNumbers] = useState<RaffleNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchNumbers();
      // Ordenar por número
      setNumbers(data.sort((a, b) => a.numero - b.numero));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial + polling
  useEffect(() => {
    load();
    const interval = setInterval(load, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [load]);

  const reserve = useCallback(
    async (numero: number, nombre: string, telefono: string) => {
      setActionLoading(true);
      try {
        const res = await reserveNumber(numero, nombre, telefono);
        if (!res.success) throw new Error(res.error || 'Error al reservar');
        await load(); // Refrescar
        return res;
      } finally {
        setActionLoading(false);
      }
    },
    [load]
  );

  const confirm = useCallback(
    async (numero: number) => {
      setActionLoading(true);
      try {
        const res = await confirmPayment(numero);
        if (!res.success) throw new Error(res.error || 'Error al confirmar');
        await load();
        return res;
      } finally {
        setActionLoading(false);
      }
    },
    [load]
  );

  const release = useCallback(
    async (numero: number) => {
      setActionLoading(true);
      try {
        const res = await releaseNumber(numero);
        if (!res.success) throw new Error(res.error || 'Error al liberar');
        await load();
        return res;
      } finally {
        setActionLoading(false);
      }
    },
    [load]
  );

  const vendidos = numbers.filter((n) => n.estado === 'Vendido');
  const reservados = numbers.filter((n) => n.estado === 'Reservado');
  const libres = numbers.filter((n) => n.estado === 'Libre');

  return {
    numbers,
    loading,
    error,
    actionLoading,
    vendidos,
    reservados,
    libres,
    refresh: load,
    reserve,
    confirm,
    release,
  };
}
