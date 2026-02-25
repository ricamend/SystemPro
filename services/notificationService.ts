
import { Notification } from '../types';

type NotificationCallback = (n: Notification) => void;

class NotificationService {
  private listeners: NotificationCallback[] = [];

  subscribe(callback: NotificationCallback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  async sendPush(title: string, message: string, type: Notification['type'] = 'info') {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      type,
      read: false,
      created_at: new Date().toISOString()
    };

    console.log(`[PUSH SENT]: ${title} - ${message}`);
    
    this.listeners.forEach(callback => callback(newNotification));
    
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }

    return newNotification;
  }

  // Métodos de conveniência para Gatilhos de Negócio
  notifyNewOS(osNumber: string, customer: string) {
    return this.sendPush(
      "Nova OS Atribuída 📋",
      `Você foi escalado para a OS #${osNumber} (${customer}). Toque para ver detalhes.`,
      "info"
    );
  }

  notifyStatusUpdate(osId: string, newStatus: string) {
    const statusLabels: Record<string, string> = {
      'scheduled': 'Agendada',
      'in_progress': 'Em Execução',
      'completed': 'Concluída',
      'waiting_parts': 'Aguardando Peça'
    };
    return this.sendPush(
      "Atualização de Status ✅",
      `A OS #${osId} agora está como: ${statusLabels[newStatus] || newStatus}.`,
      "success"
    );
  }

  notifyLowStock(productName: string, currentStock: number) {
    return this.sendPush(
      "Estoque Crítico ⚠️",
      `O item "${productName}" está com apenas ${currentStock} unidades. Reposição necessária.`,
      "warning"
    );
  }

  notifyUrgentAlerta(osId: string, message: string) {
    return this.sendPush(
      "ALERTA URGENTE 🚨",
      `OS #${osId}: ${message}`,
      "error"
    );
  }
}

export const notificationService = new NotificationService();
