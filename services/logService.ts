
import { AuditLog } from '../types';

const STORAGE_KEY = 'servicopro_audit_logs';

export const logService = {
  getLogs(targetId: string): AuditLog[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const allLogs: AuditLog[] = JSON.parse(raw);
      return allLogs
        .filter(log => log.target_id === targetId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (e) {
      return [];
    }
  },

  getAllLogs(): AuditLog[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const allLogs: AuditLog[] = JSON.parse(raw);
      return allLogs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (e) {
      return [];
    }
  },

  addLog(log: Omit<AuditLog, 'id' | 'created_at' | 'user_id' | 'user_name'>): AuditLog {
    const raw = localStorage.getItem(STORAGE_KEY);
    const allLogs: AuditLog[] = raw ? JSON.parse(raw) : [];
    
    const newLog: AuditLog = {
      ...log,
      id: Math.random().toString(36).substring(2, 11),
      user_id: 'current-user-id',
      user_name: 'João Silva (Admin)', 
      created_at: new Date().toISOString(),
    };

    allLogs.push(newLog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allLogs));
    return newLog;
  },

  bulkAddLogs(logs: Omit<AuditLog, 'id' | 'created_at' | 'user_id' | 'user_name'>[]) {
    logs.forEach(log => this.addLog(log));
  },

  clearLogs() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
