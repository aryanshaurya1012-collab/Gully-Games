import { GameReflection, GameActivity } from '../types/game.js';

const STORAGE_KEY_HISTORY = 'gullygames_sessions_history_v1';
const STORAGE_KEY_LAST_GAME = 'gullygames_last_activity_v1';

export function getSessionHistory(): GameReflection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read session history from localStorage:', err);
    return [];
  }
}

export function saveSessionToHistory(reflection: GameReflection): void {
  try {
    const existing = getSessionHistory();
    const updated = [reflection, ...existing.filter(item => item.id !== reflection.id)];
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated.slice(0, 50)));
  } catch (err) {
    console.error('Failed to save session to localStorage:', err);
  }
}

export function deleteSessionFromHistory(id: string): void {
  try {
    const existing = getSessionHistory();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete session from localStorage:', err);
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (err) {
    console.error('Failed to clear session history:', err);
  }
}

export function saveLastActivity(activity: GameActivity): void {
  try {
    localStorage.setItem(STORAGE_KEY_LAST_GAME, JSON.stringify(activity));
  } catch (err) {
    console.error('Failed to cache last activity:', err);
  }
}

export function getLastActivity(): GameActivity | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAST_GAME);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}
