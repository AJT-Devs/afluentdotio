export function toDate(timestamp: number): Date {
    return new Date(timestamp);
}

export function toTimestamp(date: Date): number {
    return date.getTime();
}

export function now(): number {
    return Date.now();
}

export function formatDate(
    timestamp: number,
    options?:{
        dateOnly?: boolean;
        timeOnly?: boolean;
        short?: boolean;
    }
):string {
    const date = new Date(timestamp);

    // Só data (01/01/2024)
  if (options?.dateOnly) {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Só hora (12:00)
  if (options?.timeOnly) {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Formato curto (01/01 12:00)
  if (options?.short) {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Padrão completo (01/01/2024, 12:00)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return 'agora mesmo';
  }

  if (minutes < 60) {
    return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }

  if (hours < 24) {
    return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  }

  if (days < 30) {
    return `há ${days} dia${days > 1 ? 's' : ''}`;
  }

  if (months < 12) {
    return `há ${months} ${months > 1 ? 'meses' : 'mês'}`;
  }

  return `há ${years} ano${years > 1 ? 's' : ''}`;
}

export function getTimeDifference(timestamp1: number, timestamp2: number) {
  const diff = Math.abs(timestamp1 - timestamp2);

  return {
    milliseconds: diff,
    seconds: Math.floor(diff / 1000),
    minutes: Math.floor(diff / 1000 / 60),
    hours: Math.floor(diff / 1000 / 60 / 60),
    days: Math.floor(diff / 1000 / 60 / 60 / 24),
  };
}

export function isToday(timestamp: number): boolean {
  const date = new Date(timestamp);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isThisWeek(timestamp: number): boolean {
  const date = new Date(timestamp);
  const today = new Date();

  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  return date > weekAgo && date <= today;
}