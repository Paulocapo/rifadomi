import { RaffleNumber, ApiResponse } from '@/types';

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';

export async function fetchNumbers(): Promise<RaffleNumber[]> {
  const res = await fetch(APPS_SCRIPT_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener los números');
  const json: ApiResponse<RaffleNumber[]> = await res.json();
  if (!json.success || !json.data) throw new Error(json.error || 'Error desconocido');
  // Normalizar estados vacíos a 'Libre' para evitar que crashee la interfaz
  return json.data.map((n) => ({
    ...n,
    estado: (n.estado === '' || !n.estado) ? 'Libre' : n.estado,
  }));
}

export async function reserveNumber(
  numero: number,
  nombre: string,
  telefono: string
): Promise<ApiResponse> {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'reservar', numero, nombre, telefono }),
  });
  return res.json();
}

export async function confirmPayment(numero: number): Promise<ApiResponse> {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'confirmar', numero }),
  });
  return res.json();
}

export async function releaseNumber(numero: number): Promise<ApiResponse> {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'liberar', numero }),
  });
  return res.json();
}
