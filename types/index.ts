export type Status = 'Libre' | 'Reservado' | 'Vendido';

export interface RaffleNumber {
  numero: number;
  estado: Status;
  nombre: string;
  telefono: string;
  timestamp: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ReservePayload {
  numero: number;
  nombre: string;
  telefono: string;
}

export interface AdminActionPayload {
  numero: number;
  action: 'confirmar' | 'liberar';
}
